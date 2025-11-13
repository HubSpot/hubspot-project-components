# HubSpot Projects

## Overview

HubSpot projects are file-based build-and-deploy frameworks that allow you to develop apps and CMS content locally using the HubSpot CLI. Projects contain your app's configuration, source code, and assets, which are built and deployed to your HubSpot account.

## Project Structure

- **`hsproject.json`**: Defines your project's name, source directory, and platform version
- **`src/`**: Contains your project's source code organized by feature type (apps, cards, functions, etc.)
- **`*-hsmeta.json` files**: Configuration files that define metadata for each component

## Getting Started

1. **Upload your project**: Run `hs project upload` to build and deploy your project in your HubSpot account
2. **Local development**: Run `hs project dev` to start a local development server with hot reloading for app cards

## Next Steps

### Documentation
- [Quickstart Guide](https://developers.hubspot.com/docs/getting-started/quickstart) - Get up and running with a demo app
- [Developer Platform Overview](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/overview) - Learn about building apps on version 2025.2
- [Project Commands Reference](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/project-commands) - Complete CLI command reference

### Adding Features

- **App Cards**: Extend CRM record pages with custom React components
- **Settings Pages**: Create configuration interfaces for your app
- **Webhooks**: Receive real-time notifications from HubSpot
- **Workflow Actions**: Add custom actions to HubSpot workflows
- **Serverless Functions**: Build API endpoints for your app

Use `hs project add` to interactively add features to your project, or check the [feature documentation](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/overview#features) for available options.

### Resources
- [HubSpot Developer Documentation](https://developers.hubspot.com/docs)
- [Developer Community Slack](https://developers.hubspot.com/slack)
- [HubSpot CLI Documentation](https://developers.hubspot.com/docs/developer-tooling/local-development/hubspot-cli/install-the-cli)
