# AGENTS.md

This file provides guidance to AI coding agents when working on HubSpot components

IMPORTANT: IF THE 'HubSpot' MCP SERVER IS INSTALLED USE THE TOOLS BEFORE TRYING TO MANUALLY USE CLI COMMANDS OR BEFORE TRYING TO DO ANYTHING WITH HUBSPOT ASSETS

## HubSpot Project Information
- The project configuration is in the `hsproject.json` file
- A directory is considered a part of the project if it or a directory above it contains a `hsproject.json` file
- The project src directory is defined in the `srcDir` field in the `hsproject.json`
- The project's platform version is defined in `platformVersion` in the `hsproject.json`
- The `platformVersion` determines what features the project has access to as well as the shape of the configuration files

## npm packages
### `@hubspot/ui-extensions`
- In the `@hubspot/ui-extensions` npm package, only the component properties defined by the component are valid.  `style` properties are not valid

## Component Information
### General
- Component configuration files must end with `-hsmeta.json`
- The `uid` field in the `-hsmeta.json` files must be unique with the project
- The `type` field in the `-hsmeta.json` files defines the type of the component
- Components can not be in nested subdirectories, only the specified directories in their corresponding component rules.
- Example components can be found in https://github.com/HubSpot/hubspot-project-components.  The directories are split up by platform version and follow this format `${platformVersion}/components`
- All component subdirectories must be in the project source directory

### app component
- There can only be one `app` component
- `app` component must be in the `app` directory
- If the `config.distribution` field is set to `marketplace`, the only valid `config.auth.type` value is `oauth`

### card
- `card` components must be in the `app/cards` directory
- The global `window` object is not available in the `card` component
- Cannot use `window.fetch`, and instead must use the `hubspot.fetch` function provided by the `@hubspot/ui-extensions` npm package.  Any urls called with the `hubspot.fetch` function must be added to the `config.permittedUrls.fetch` array in the `app` component's hsmeta.json file
- Only components exported from the `@hubspot/ui-extensions` npm package can be used in `card` components
#### Available Hooks for Card Components

Prefer hooks over `hubspot.fetch` — use hooks to access CRM data and extension context before falling back to `hubspot.fetch` for external HTTP requests. Hooks must be called at the component level, not inside conditionals or loops. The list below may not be exhaustive — refer to the [hooks documentation](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/ui-extensions-sdk/hooks.md) as the source of truth for all available hooks and their parameters.

**Universal hooks** (available across all extension points):
- `useExtensionApi` - Access both context and actions from a single hook
- `useExtensionContext` - Access contextual information about the extension environment (portal, user, extension metadata)
- `useExtensionActions` - Access all available actions for the current extension point
- `useCrmSearch` - Search CRM records
- `useDebounce` - Debounce a rapidly-changing value

**CRM-specific hooks** (available in `crm.record.tab`, `crm.record.sidebar`, `crm.preview`, `helpdesk.sidebar` extension points):
- `useCrmProperties` - Fetch properties from the current CRM record
- `useAssociations` - Fetch associated CRM records

#### Available Actions for Card Components

Access actions via the `useExtensionActions` hook or the `actions` parameter from `hubspot.extend()`. The list below may not be exhaustive — refer to the [actions documentation](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/ui-extensions-sdk/actions.md) as the source of truth for all available actions and their parameters.

**Universal actions** (available across all extension points):
- `addAlert` - Display an alert banner
- `reloadPage` - Reload the current page
- `copyTextToClipboard` - Copy text to clipboard; requires explicit user interaction
- `closeOverlay` - Close an open overlay or modal by its id
- `openIframeModal` - Open a URL in an iframe modal

**CRM-specific actions** (available in `crm.record.tab`, `crm.record.sidebar`, `crm.preview`, `helpdesk.sidebar` extension points):
- `fetchCrmObjectProperties` - Fetch property values from the current CRM record
- `refreshObjectProperties` - Refresh CRM record properties in the UI without a full page reload
- `onCrmPropertiesUpdate` - Subscribe to UI-level changes to CRM properties

#### Context Object

Access context via the `useExtensionContext` hook or the `context` parameter from `hubspot.extend()`. The list below may not be exhaustive — refer to the [context documentation](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/ui-extensions-sdk/context.md) as the source of truth for all available context fields.

**Universal fields** (available on all extension points):
- `location` - Extension point identifier
- `portal.id` / `portal.timezone` / `portal.dataHostingLocation` - Account info
- `user.id` / `user.email` / `user.firstName` / `user.lastName` / `user.locale` / `user.language` / `user.teams` / `user.permissions` - User info
- `variables` - Project configuration variables

**CRM-specific fields** (available in `crm.record.tab`, `crm.record.sidebar`, `crm.preview`, `helpdesk.sidebar` extension points):
- `crm.objectId` - Current CRM record's ID
- `crm.objectTypeId` - Record type ID
- `extension.appId` / `extension.appName` / `extension.cardTitle` - Extension metadata

#### Logging

Use the `logger` API to send custom log messages. In local development mode, logs go to the browser console only; in production they are sent to HubSpot and viewable via `hs project logs`. The list below may not be exhaustive — refer to the [logging documentation](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/ui-extensions-sdk/logging.md) as the source of truth for all available logging methods.

- `logger.info` - Informational messages
- `logger.debug` - Debug messages
- `logger.warn` - Warning messages
- `logger.error` - Error messages

### app-event
- `app-event` components must be in the `app/app-events` directory
### app-object
- `app-object` components must be in the `app/app-object` directory

### app-function
- `app-function` components must be in the `app/functions` directory
- `app-function` components are not available when `config.distribution` is set to `marketplace` in the `app` component `-hsmeta.json` file

# settings
- There can only be one `settings` component
- `settings` components must be in the `app/settings` directory
- The global `window` object is not available in the `settings` component
- Cannot use `window.fetch`, and instead must use the `hubspot.fetch` function provided by the `@hubspot/ui-extensions` npm package.  Any urls called with the `hubspot.fetch` function must be added to the `config.permittedUrls.fetch` array in the `app` component's hsmeta.json file
- Only components exported from the `@hubspot/ui-extensions` npm package can be used in `settings` components
- React Components from `@hubspot/ui-extensions/crm` cannot be used in `settings` components

# scim
- There can only be one `scim` component
- `scim` components must be in the `app/scim` directory

# webhooks
- There can only be one `webhooks` component.
- `webhooks` components must be in the `app/webhooks` directory
- `webhooks` components can only be in projects where `config.distribution` is private and `config.auth.type` is `static`

### workflow-actions
- `workflow-action` components must be in the `app/workflow-actions` directory

## HubSpot CLI commands
- All the commands and subcommands have a `--help` argument that provides details on the command and it's arguments
- The help output is standard yargs output
- The commands for working with projects in HubSpot are subcommands of `hs project`
- Debugging flag that can be added to `hs` commands and subcommands: `--debug`
- Debugging problems with CLI installation: `hs doctor`
- `hs project open` will open the current project page in the browser
- `hs init` is required to set up the hubspot configuration file
- `hs auth` will authenticate a new account.  This will require a user to open a browser and paste a token in a CLI prompt.
- All the commands for managing HubSpot accounts in the CLI are subcommands of `hs account`

## General
- Follow existing patterns in the codebase
- Use proper component structure based on component `type` in the `-hsmeta.json` file
- Ensure configuration files follow HubSpot naming conventions
- Always validate that components are placed in correct directories
