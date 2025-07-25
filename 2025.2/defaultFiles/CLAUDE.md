# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working on HubSpot components

## HubSpot Project Information
- The project configuration is in the `hsproject.json` file
- A directory is considered a part of the project it or a directory above it contains a `hsproject.json` file
- The project src directory is defined in the `srcDir` field in the `hsproject.json`
- The project's platform version is defined in `platformVersion` in the `hs project.json`
- The `platformVersion` determines what features the project has access to as well as the shape of the configuration files

## Component Information
### General
- Component configuration files must end with `-hsmeta.json`
- The `uid` field in the `-hsmeta.json` files must be unique with the project
- The `type` field in the `-hsmeta.json` files defines the type of the component
- Components can not be in nested subdirectories, only the specified directories in their corresponding component rules.
- Example components can be found in https://github.com/HubSpot/hubspot-project-components.  The directories are split up by platform version and follow this format `${platformVersion}/components`
- All component subdirectories must be in the project source directory

### app component
- There can only be one `app` component
- `app` component must be in the `app` directory
- If the `config.distribution` field is set to `marketplace`, the only valid `config.auth.type` value is `oauth` 

### card
- `card` components must be in the `app/cards` directory

### app-function
- `app-function` components must be in the `app/functions` directory
- `app-function` components are not available when `config.distribution` is set to `marketplace` in the `app` component `-hsmeta.son` file 

# settings
- There can only be one `settings` component
- `settings` components must be in the `app/settings` directory

# webhooks
- There can only be one `webhooks` component.
- `webhooks` components must be in the `app/webhooks` directory
- `webhooks` components can only be in projects where `config.distribution` is private and `config.auth.type` is `static`

### workflow-actions
- `workflow-action` components must be in the `app/workflow-actions` directory

## HubSpot CLI commands
- All the commands and subcommands have a `--help` argument that provides details on the command and it's arguments
- The help output is standard yargs output
- The commands for working with projects in HubSpot are subcommands of `hs project`
- Debugging flag that can be added to `hs` commands and subcommands: `--debug`
- Debugging problems with CLI installation: `hs doctor`
- `hs project open` will open the current project page in the browser
- `hs init` is required to set up the hubspot configuration file
- `hs auth` will authenticate a new account.  This will require a user to open a browser and paste a token in a CLI prompt.
- All the commands for managing HubSpot accounts in the CLI are subcommands of `hs account`

## General
- Follow existing patterns in the codebase
- Use proper component structure based on component `type` in the `-hsmeta.json` file
- Ensure configuration files follow HubSpot naming conventions 
- Always validate that components are placed in correct directories