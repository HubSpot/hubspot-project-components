# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working on HubSpot components 

## HubSpot CLI commands
- Upload: `hs project upload`
- Install the dependencies for the project: `hs project install-deps`
- Local development: `hs project dev`
- Debugging flag that can be added to `hs` commands and subcommands: `--debug`
- Debugging problems with CLI installation: `hs doctor`
- Profiles can be used with a `--profile` flag
- The commands for working with projects in HubSpot are subcommands of `hs project`

## HubSpot Project Guidelines
- The project configuration is in the `hsproject.json` file
- Component configuration files must end with `-hsmeta.json`
- The `uid` field in the `-hsmeta.json` files must be unique with the project
- The `type` field in the `-hsmeta.json` files defines the type of the component
- There can only be one `app` component
- `app` component must be in the `src/app` directory
- `card` components must be in the `src/app/cards` directory
- `app-function` components must be in the `src/app/functions` directory
- `settings` components must be in the `src/app/settings` directory
- `webhooks` components must be in the `src/app/webhooks` directory

## General
- Follow existing patterns in the codebase
- Use proper component structure based on component type
- Ensure configuration files follow HubSpot naming conventions
- Always validate that components are placed in correct directories