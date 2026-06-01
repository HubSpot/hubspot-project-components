# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working on HubSpot components

IMPORTANT: IF THE 'HubSpot' MCP SERVER IS INSTALLED USE THE TOOLS BEFORE TRYING TO MANUALLY USE CLI COMMANDS OR BEFORE TRYING TO DO ANYTHING WITH HUBSPOT ASSETS

## HubSpot Project Information
- The project configuration is in the `hsproject.json` file
- A directory is considered a part of the project it or a directory above it contains a `hsproject.json` file
- The project src directory is defined in the `srcDir` field in the `hsproject.json`
- The project's platform version is defined in `platformVersion` in the `hs project.json`
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

Prefer hooks over `hubspot.fetch` — use hooks to access CRM data and extension context before falling back to `hubspot.fetch` for external HTTP requests. Hooks must be called at the component level, not inside conditionals or loops.

**Universal hooks** (available across all extension points):
- `useExtensionApi` - Access both context and actions from a single hook; returns `{ context, actions }`
- `useExtensionContext` - Access contextual information about the extension environment (portal, user, extension metadata)
- `useExtensionActions` - Access all available actions for the current extension point
- `useCrmSearch(options)` - Search CRM records; parameters: `objectType` (required), `properties`, `query`, `filterGroups`, `sorts`, `pageLength` (default: 10, max: 200); returns results with pagination, loading states, and a `refetch` function
- `useDebounce(value, delay?)` - Debounce a rapidly-changing value; delay defaults to 300ms; returns the debounced value

**CRM-specific hooks** (available in `crm.record.tab`, `crm.record.sidebar`, `crm.preview`, `helpdesk.sidebar` extension points):
- `useCrmProperties(properties, options?)` - Fetch properties from the current CRM record; accepts an array of property names and optional formatting options (`date`, `datetime`, `currency`)
- `useAssociations(options)` - Fetch associated CRM records; parameters: `toObjectType` (required), `properties` (optional), `pageLength` (optional)

#### Available Actions for Card Components

Access actions via the `useExtensionActions` hook or the `actions` parameter from `hubspot.extend()`.

**Universal actions** (available across all extension points):
- `addAlert({ title, message, type })` - Display an alert banner; `type` must be one of `'info'`, `'tip'`, `'success'`, `'warning'`, or `'danger'`
- `reloadPage()` - Reload the current page
- `copyTextToClipboard(text)` - Copy text to clipboard (async, returns a Promise); requires explicit user interaction — do not call inside `useEffect` without a user-triggered event
- `closeOverlay(id)` - Close an open overlay or modal by its id
- `openIframeModal({ uri, height, width, title?, flush? })` - Open a URL in an iframe modal; `uri` and dimensions are required; pass an optional callback that fires when the modal closes

**CRM-specific actions** (available in `crm.record.tab`, `crm.record.sidebar`, `crm.preview`, `helpdesk.sidebar` extension points):
- `fetchCrmObjectProperties(properties)` - Fetch property values from the current CRM record; pass an array of property names or `"*"` for all; properties must be declared in the card's `-hsmeta.json` `objectTypes` array; returns a Promise
- `refreshObjectProperties()` - Refresh CRM record properties displayed in the UI without a full page reload; does not refresh properties fetched via HubSpot's APIs
- `onCrmPropertiesUpdate(properties, callback)` - Subscribe to UI-level changes to CRM properties; `properties` is an array of property names or `"*"`; callback receives the updated properties object; only fires on UI changes, not external API modifications

#### Context Object

Access context via the `useExtensionContext` hook or the `context` parameter from `hubspot.extend()`.

**Universal fields** (available on all extension points):
- `location` - Extension point identifier (e.g., `'crm.record.tab'`, `'settings'`, `'home'`)
- `portal.id` - HubSpot account ID
- `portal.timezone` - Account timezone
- `portal.dataHostingLocation` - Server region (`'na1'`, `'na2'`, `'na3'`, `'ap1'`, `'eu1'`)
- `user.id` - User ID
- `user.email` - User's primary email address
- `user.emails` - All associated email addresses
- `user.firstName` / `user.lastName` - User's name
- `user.locale` - Locale preference (affects date/number formatting)
- `user.language` - UI display language as set in the user's HubSpot profile
- `user.teams` - Team assignments with member IDs
- `user.permissions` - Permission string identifiers
- `variables` - Project configuration variables

**CRM-specific fields** (available in `crm.record.tab`, `crm.record.sidebar`, `crm.preview`, `helpdesk.sidebar` extension points):
- `crm.objectId` - Current CRM record's ID
- `crm.objectTypeId` - Record type ID (e.g., `'0-1'` for contacts)
- `extension.appId` - Extension's application ID
- `extension.appName` - Extension application name
- `extension.cardTitle` - Extension display title

#### Logging

Use the `logger` API to send custom log messages. In local development mode, logs go to the browser console only; in production they are sent to HubSpot and viewable via `hs project logs`.

- `logger.info(message)` - Informational messages
- `logger.debug(message)` - Debug messages
- `logger.warn(message)` - Warning messages
- `logger.error(message)` - Error messages

**Constraints:**
- Logs are batched and sent every 5 seconds; max 100 logs per batch
- Rate limited to 1,000 logs per minute per account
- Queue holds max 10,000 pending messages; logs are dropped if the queue is full
- Queued logs are discarded on page refresh or close
- When an extension fails to load, the error message includes a trace ID; use it to locate the corresponding logs

### app-event
- `app-event` components must be in the `app/app-events` directory
-
### app-object
- `app-object` components must be in the `app/app-object` directory

### app-function
- `app-function` components must be in the `app/functions` directory
- `app-function` components are not available when `config.distribution` is set to `marketplace` in the `app` component `-hsmeta.son` file

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
