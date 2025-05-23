# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working on HubSpot components 
## HubSpot Project Information
- The project configuration is in the `hsproject.json` file
- The project src directory is defined in the `srcDir` field in the `hsproject.json`
- The project's platform version is defined in `platformVersion` in the `hs project.json`
- The `platformVersion` determines what features the project has access to as well as the shape of the configuration files
- Component configuration files must end with `-hsmeta.json`
- The `uid` field in the `-hsmeta.json` files must be unique with the project
- The `type` field in the `-hsmeta.json` files defines the type of the component
- There can only be one `app` component
- `app` component must be in the `app` directory inside the project `srcDir`
- `card` components must be in the `app/cards` directory inside the project `srcDir`
- `app-function` components must be in the `app/functions` directory  inside the project `srcDir`
- `settings` components must be in the `app/settings` directory inside the project `srcDir`
- `webhooks` components must be in the `app/webhooks` directory inside the project `srcDir`
- Example components can be found in https://github.com/HubSpot/hubspot-project-components.  They are split up by platform version like `${platformVersion}/components` 

## HubSpot CLI commands
- Upload: `hs project upload`
- Install the dependencies for the project: `hs project install-deps`
- Local development: `hs project dev`
- Debugging flag that can be added to `hs` commands and subcommands: `--debug`
- Debugging problems with CLI installation: `hs doctor`
- Profiles can be used with a `--profile` flag
- The commands for working with projects in HubSpot are subcommands of `hs project`



## General
- Follow existing patterns in the codebase
- Use proper component structure based on component type
- Ensure configuration files follow HubSpot naming conventions
- Always validate that components are placed in correct directories