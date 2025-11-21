# HubSpot Settings Component

## Overview

Settings components are React-based pages that allow users who install your app to configure and customize how the app works in their HubSpot account. Settings pages provide a dedicated interface for users to manage app-specific configurations, preferences, and integrations.

Settings components are stored in the `src/app/settings/` directory of your HubSpot project.

## Structure

Each settings component consists of three files:

1. **React Component (`.jsx` or `.tsx`)**: Contains the UI logic and rendering code using React and HubSpot's UI extension components from `@hubspot/ui-extensions`
2. **Configuration File (`*-hsmeta.json`)**: Defines the settings component's metadata and entrypoint
3. **Package File (`package.json`)**: Defines dependencies for the settings component

The configuration file defines:
- `entrypoint`: The file path to your React component that renders the settings page

## Using Settings Components

After uploading your project with `hs project upload`, users can access the settings page:

1. In HubSpot, navigate to **Marketplace** > **Connected apps**
2. Click the **My apps** tab
3. Click the name of your app
4. Click the **Settings** tab

The settings page will display your React component, allowing users to configure app settings, manage integrations, and customize their experience.

## Resources

- [Create a Settings Page](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/create-a-settings-component): Complete guide to creating settings components
- [UI Extension Components](https://developers.hubspot.com/docs/platform/ui-components): Library of available UI components
- [UI Extensions SDK](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/ui-extensions-sdk): Available utilities and methods

