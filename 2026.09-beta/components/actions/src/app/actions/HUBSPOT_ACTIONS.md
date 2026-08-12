# HubSpot Bulk Actions

## Overview

HubSpot bulk actions extensions are React-based UI extensions that let users take action on multiple CRM records at once. When a user selects records in a list view, installed bulk actions appear as options they can invoke.

Bulk actions are stored in the `src/app/actions/` directory of your HubSpot project.

## Structure

Each bulk action component consists of two files:

1. **React Component (`.jsx` or `.tsx`)**: Contains the UI logic and rendering code using React and HubSpot's UI extension components from `@hubspot/ui-extensions`.
2. **Configuration File (`*-hsmeta.json`)**: Defines the action's metadata.

Key fields in the configuration file:

| Field | Description |
|-------|-------------|
| `label` | Display name shown to users in the CRM |
| `entrypoint` | Path to the React component |
| `objectTypes` | CRM object types this action applies to (e.g. `["contacts"]`) |
| `displayMode` | How the action UI is rendered (e.g. `"PANEL"` or `"MODAL"`) |
| `icon` | Icon shown alongside the action label, correspdonding to the available [icon names](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/ui-components/standard-components/icon#props) from the Icon component |

## Resources

- [UI Extension Components](https://developers.hubspot.com/docs/platform/ui-components): Library of available UI components
- [UI Extensions SDK](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/ui-extensions-sdk): Available utilities and methods
