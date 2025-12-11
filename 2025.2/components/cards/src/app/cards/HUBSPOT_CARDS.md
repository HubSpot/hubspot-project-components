# HubSpot App Cards

## Overview

HubSpot cards are React-based UI extensions that display custom content within CRM record pages (contacts, companies, deals, etc.). Cards allow you to extend the HubSpot CRM interface with custom functionality, data visualization, and interactive elements.

Cards are stored in the `src/app/cards/` directory of your HubSpot project.

## Structure

Each card component consists of two files:

1. **React Component (`.jsx` or `.tsx`)**: Contains the UI logic and rendering code using React and HubSpot's UI extension components from `@hubspot/ui-extensions`.
2. **Configuration File (`*-hsmeta.json`)**: Defines the card's metadata

## Using App Cards

After uploading your project with `hs project upload`, cards must be manually added to record views:

1. Navigate to a CRM record (e.g., a contact)
2. Click **Customize** in the record view
3. Select the tab where you want the card to appear
4. Click the **+** button to add a card
5. In the **Card library**, filter by **App** and select your card
6. Save the view

Cards will then appear on all records of the specified object types in that view.

## Resources

- [UI Extension Components](https://developers.hubspot.com/docs/platform/ui-components): Library of available UI components
- [App Card Reference](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/app-cards/reference): Complete configuration options
- [UI Extensions SDK](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/ui-extensions-sdk): Available utilities and methods
