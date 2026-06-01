# Settings Component

This directory contains the `settings` component for a HubSpot UI extension.

- There can only be one `settings` component
- The global `window` object is not available in the `settings` component
- Cannot use `window.fetch`, and instead must use the `hubspot.fetch` function provided by the `@hubspot/ui-extensions` npm package. Any URLs called with the `hubspot.fetch` function must be added to the `config.permittedUrls.fetch` array in the `app` component's `hsmeta.json` file
- `hubspot.fetch` requires fully qualified HTTPS URLs - relative paths are NOT supported
- Only components exported from the `@hubspot/ui-extensions` npm package can be used in `settings` components
- React Components from `@hubspot/ui-extensions/crm` cannot be used in `settings` components
