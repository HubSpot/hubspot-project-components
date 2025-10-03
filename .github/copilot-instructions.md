# GitHub Copilot Instructions for HubSpot Project Components

## Repository Overview

This repository provides reusable HubSpot CRM components and project templates for building HubSpot apps using the Projects Framework. Components are organized by platform version (`2025.1`, `2025.2`, etc.) and include UI extensions, serverless functions, and configuration templates.

**Key directories:**
- `2025.2/components/` - Individual component examples (cards, functions, pages, settings, etc.)
- `2025.2/defaultFiles/` - Default templates and AI agent instructions (AGENTS.md, CLAUDE.md)
- `projects/` - Full project templates (private-app, public-app, no-template)
- `components/example-app/` - Legacy example app structure
- `config.json` - Repository configuration defining available components and projects

## Architecture & Component Model

### HubSpot Project Structure
Projects are defined by `hsproject.json` files containing:
- `name` - Project display name
- `srcDir` - Source directory (typically `src`)
- `platformVersion` - Determines available features and config schema (e.g., `2025.2`)

### Component Types & Directory Rules
Components MUST be placed in specific directories based on their `type` field in `-hsmeta.json`:

| Component Type | Required Directory | Singleton | Notes |
|---------------|-------------------|-----------|-------|
| `app` | `app/` | Yes | Root app configuration with auth, scopes, and permissions |
| `card` | `app/cards/` | No | UI cards in CRM, no `window` object, use `hubspot.fetch` |
| `app-function` | `app/functions/` | No | Not available for marketplace apps |
| `app-event` | `app/app-events/` | No | Event handlers |
| `app-object` | `app/app-objects/` | No | Custom objects |
| `page` | `app/pages/` | No | Full-page views (2025.2+) |
| `settings` | `app/settings/` | Yes | Settings UI, no `window`, no CRM components |
| `scim` | `app/scim/` | Yes | SCIM integration |
| `webhooks` | `app/webhooks/` | Yes | Only for private apps with static auth |
| `workflow-actions` | `app/workflow-actions/` | No | Custom workflow actions |

**Critical rules:**
- Component config files MUST end with `-hsmeta.json`
- The `uid` field must be unique within the project
- Components cannot be in nested subdirectories beyond the required directory
- Example: `app/cards/MyCard.jsx` is valid, `app/cards/nested/MyCard.jsx` is not

### UI Component Constraints
For `card` and `settings` components:
- **No `window` object** - browser globals are unavailable
- **Use `hubspot.fetch`** instead of `window.fetch` - permitted URLs must be listed in `app` component's `config.permittedUrls.fetch` array
- **Only `@hubspot/ui-extensions` components** - no custom React components or third-party UI libraries
- **No style props** - only component-defined props are valid
- **Settings cannot use CRM components** - components from `@hubspot/ui-extensions/crm` are not available

### App Configuration (`app-hsmeta.json`)
Example structure:
```json
{
  "uid": "my_app",
  "type": "app",
  "config": {
    "name": "My App",
    "distribution": "private",  // "marketplace" requires OAuth
    "auth": {
      "type": "static",  // or "oauth" for marketplace
      "requiredScopes": ["crm.objects.contacts.read"]
    },
    "permittedUrls": {
      "fetch": ["https://api.example.com"],  // Required for hubspot.fetch
      "iframe": [],
      "img": []
    }
  }
}
```

## Development Workflow

### HubSpot CLI Commands
**If the HubSpot MCP server is installed, use MCP tools instead of CLI commands.**

Essential commands:
- `hs init` - Set up HubSpot configuration file (required first step)
- `hs auth` - Authenticate account (opens browser for token)
- `hs project open` - Open current project in browser
- `hs project <subcommand>` - All project-related commands
- `hs account <subcommand>` - Account management
- `hs doctor` - Diagnose CLI installation issues
- `--debug` - Add to any command for verbose output
- `--help` - Available on all commands and subcommands

### Component Development Pattern
1. Create component directory in appropriate location (e.g., `src/app/cards/`)
2. Add `-hsmeta.json` config file with unique `uid` and correct `type`
3. Create component source file (`.jsx` or `.tsx`)
4. Add `package.json` if npm dependencies are needed
5. For cards/settings: update app's `config.permittedUrls.fetch` if using `hubspot.fetch`

### Serverless Functions (app.functions)
Functions use Node.js runtime with preloaded packages. To add dependencies:
```json
{
  "name": "demo.functions",
  "dependencies": {
    "@hubspot/api-client": "^7.0.1",
    "lodash": "^4.17.21"
  }
}
```
All dependencies must be public npm packages.

Example function:
```javascript
exports.main = async (context) => {
  return { message: "Hello from serverless function" };
};
```

## Code Patterns

### React Extension Pattern
Standard pattern for cards and UI extensions:
```javascript
import React from "react";
import { Text, hubspot } from "@hubspot/ui-extensions";

hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension context={context} runServerless={runServerlessFunction} sendAlert={actions.addAlert} />
));

const Extension = ({ context, runServerless, sendAlert }) => {
  // Component implementation
  return <Text>Hello {context.user.firstName}</Text>;
};
```

### Page Components (2025.2+)
Pages use specialized header components:
```typescript
import { HeaderActions, PrimaryHeaderActionButton, SecondaryHeaderActionButton } from "@hubspot/ui-extensions/pages/home";

hubspot.extend<"home">(({ context }) => {
  return (
    <>
      <HeaderActions>
        <PrimaryHeaderActionButton onClick={handleClick}>Primary</PrimaryHeaderActionButton>
        <SecondaryHeaderActionButton onClick={handleClick}>Secondary</SecondaryHeaderActionButton>
      </HeaderActions>
      {/* Page content */}
    </>
  );
});
```

## Project Organization

The repository serves two audiences:
1. **Component library** - Individual reusable components in `2025.2/components/`
2. **Project templates** - Complete starter projects in `projects/`

When adding new components:
- Place in correct platform version directory (`2025.2/`, etc.)
- Update `config.json` if adding a new reusable component
- Follow existing naming conventions (`NewCard.jsx`, `NewCard-hsmeta.json`)
- Include minimal `package.json` with only required dependencies

## Platform Version Differences

Platform version (from `hsproject.json`) determines:
- Available component types (e.g., `page` components in 2025.2+)
- Configuration file schemas
- Available API features

Always check `platformVersion` when working with components to ensure compatibility.

## References

- Example components: https://github.com/HubSpot/hubspot-project-components
- Platform docs: https://developers.hubspot.com/docs/platform/
- UI components: https://developers.hubspot.com/docs/platform/ui-extension-components
- Preloaded packages: https://developers.hubspot.com/docs/cms/data/serverless-functions/reference#preloaded-packages
