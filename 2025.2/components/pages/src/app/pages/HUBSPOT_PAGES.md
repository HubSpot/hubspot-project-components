# HubSpot App Home Pages

## Overview

App home pages are React-based landing pages that provide a custom experience when users navigate to your app in HubSpot. Built with React and powered by the UI extensions SDK, home pages use the same toolkit available for app cards and settings pages, including HubSpot's UI components and data fetching utilities.

**Note:** This feature requires signing up for the public beta. Sign up [here](https://app.hubspot.com/l/product-updates/new-to-you?rollout=237984).

App home pages are stored in the `src/app/pages/` directory of your HubSpot project.

## Structure

Each app home page consists of three files:

1. **React Component (`.jsx` or `.tsx`)**: Contains the UI logic and rendering code using React and HubSpot's UI extension components from `@hubspot/ui-extensions`
2. **Configuration File (`*-hsmeta.json`)**: Defines the page's metadata, entrypoint, and location
3. **Package File (`package.json`)**: Defines dependencies for the page component

The configuration file defines:
- `entrypoint`: The file path to your React component that renders the home page
- `location`: Set to `"home"` for app home pages

## Using App Home Pages

After uploading your project with `hs project upload`, users can access the home page:

1. In HubSpot, click the **Marketplace** icon
2. In the *Your recently visited apps* section, click the name of your app
3. Alternatively, access directly at: `https://app.hubspot.com/app/{HubID}/{appId}`

The home page will display your React component, providing a custom landing experience for your app.

## Home Page Components

In addition to standard UI components, app home pages have three specialized components for header action buttons:

- `<HeaderActions>`: Wrapper component for header action buttons
- `<PrimaryHeaderActionButton>`: Primary action button (orange, one per page)
- `<SecondaryHeaderActionButton>`: Secondary action buttons (appear in an Actions dropdown)

These components are imported from `@hubspot/ui-extensions/pages/home` and require version `0.10.0` or later of the `@hubspot/ui-extensions` package.

## Resources

- [Create an App Home Page](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/create-an-app-home-page): Complete guide to creating app home pages
- [UI Extension Components](https://developers.hubspot.com/docs/platform/ui-components): Library of available UI components
- [UI Extensions SDK](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/ui-extensions-sdk): Available utilities and methods

