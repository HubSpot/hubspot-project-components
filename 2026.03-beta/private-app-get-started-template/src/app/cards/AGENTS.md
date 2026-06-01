# Card Components

This directory contains `card` components for a HubSpot UI extension. Only components exported from `@hubspot/ui-extensions` can be used here.

## Hooks

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

## Actions

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

## Context Object

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

## Logging

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