# HubSpot App Objects

## Overview

App objects are custom CRM objects that provide the same flexibility as custom objects (unique name and customized schema) while allowing you to standardize and manage the schema definition across all accounts that install your app. App objects enable you to create custom data structures that integrate seamlessly with HubSpot's CRM.

**Note:** This feature requires approval from HubSpot. Submit [this form](https://app.hubspot.com/l/developer-overview/appObjectsEventsRequest) to request access.

App objects are stored in the `src/app/app-objects/` directory of your HubSpot project.

## Structure

Each app object consists of a configuration file:

1. **Configuration File (`*-hsmeta.json`)**: Defines the app object's schema, properties, display labels, and settings (e.g., `my-app-object-hsmeta.json`)

The configuration file defines:
- Object name, description, and display forms (singular/plural)
- Properties and their types
- Primary and secondary display label properties
- Settings (record pages, user-created records, engagements)

## Using App Objects

After uploading your project with `hs project upload`, app objects become available in the HubSpot account. Users can:

- View and manage app object records in the CRM
- Create associations between app objects and other CRM objects (contacts, companies, deals, etc.)
- Use app objects in workflows, reports, and other HubSpot tools

For detailed usage instructions, see the [Knowledge Base article](https://knowledge.hubspot.com/integrations/use-app-objects-from-connected-apps).

## Resources

- [App Objects Overview](https://developers.hubspot.com/docs/apps/developer-platform/add-features/app-objects/overview): Introduction to app objects
- [App Objects Reference](https://developers.hubspot.com/docs/apps/developer-platform/add-features/app-objects/reference): Complete configuration options and schema definitions
- [Quickstart Guide](https://developers.hubspot.com/docs/apps/developer-platform/add-features/app-objects/quickstart-guide-to-app-objects): Step-by-step guide to creating your first app object
