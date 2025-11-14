# HubSpot Card Component

## Overview

HubSpot card components are React-based UI extensions that display custom content within CRM record pages (contacts, companies, deals, etc.). Cards allow you to extend the HubSpot CRM interface with custom functionality, data visualization, and interactive elements.

## Structure

Each card component consists of two files:

1. **React Component (`.jsx` or `.tsx`)**: Contains the UI logic and rendering code using React and HubSpot's UI extension components from `@hubspot/ui-extensions`.
2. **Configuration File (`*-hsmeta.json`)**: Defines the card's metadata

## Usage in Projects

Cards are stored in the `src/app/cards/` directory of your HubSpot project. To add a new card run `hs project add` and select **Card** when prompted

## Viewing in HubSpot

After uploading your project with `hs project upload`, cards must be manually added to record views:

1. Navigate to a CRM record (e.g., a contact)
2. Click **Customize** in the record view
3. Select the tab where you want the card to appear
4. Click the **+** button to add a card
5. In the **Card library**, filter by **App** and select your card
6. Save the view

Cards will then appear on all records of the specified object types in that view.

## Development

Use `hs project dev` to start local development. The development server will automatically reload when you make changes to your React component files, allowing for rapid iteration without re-uploading the project.

## Resources

- [UI Extension Components](https://developers.hubspot.com/docs/platform/ui-components): Library of available UI components
- [App Card Reference](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/app-cards/reference): Complete configuration options
- [UI Extensions SDK](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/ui-extensions-sdk): Available utilities and methods
