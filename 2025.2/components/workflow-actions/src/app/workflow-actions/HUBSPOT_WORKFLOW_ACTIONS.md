# HubSpot Custom Workflow Actions

## Overview

Custom workflow actions allow you to extend HubSpot workflows with your own business logic. When a workflow executes your custom action, it sends an HTTPS request to your specified endpoint, enabling you to integrate external services, perform custom data processing, or trigger actions in other systems.

Custom workflow actions are stored in the `src/app/workflow-actions/` directory of your HubSpot project.

## Structure

Each custom workflow action consists of a configuration file:

1. **Configuration File (`*-hsmeta.json`)**: Defines the action's metadata, input fields, output fields, execution URL, and labels (e.g., `my-workflow-action-hsmeta.json`)

The configuration file defines:
- Action URL where workflow execution requests are sent
- Input fields that users configure when adding the action to a workflow
- Output fields that can be used by subsequent workflow actions
- Labels and descriptions displayed in the workflow editor
- Supported object types (contacts, companies, deals, etc.)

## Using Custom Workflow Actions

After uploading your project with `hs project upload` and setting `isPublished` to `true`, custom workflow actions become available in the workflow editor:

1. Navigate to **Automation** > **Workflows** in HubSpot
2. Create or edit a workflow
3. Click the **+** button to add an action
4. Search for your custom action by name
5. Configure the input fields as needed
6. Save and activate the workflow

When the workflow executes, HubSpot sends an HTTPS POST request to your `actionUrl` with the configured input values and workflow context.

## Resources

- [Define a Custom Workflow Action](https://developers.hubspot.com/docs/apps/developer-platform/add-features/custom-workflow-actions): Complete guide to creating workflow actions
- [Custom Action Builder](https://developers.hubspot.com/docs/api-reference/automation-actions-v4-v4/custom-action-builder): Visual tool for building workflow actions (BETA)
