# HubSpot Project Components - AI Coding Agent Instructions

## Repository Purpose

This repository provides reusable HubSpot component templates and project scaffolds for building HubSpot apps and integrations. It contains templates for both private and public apps across different platform versions (2025.1, 2025.2).

## Project Architecture

### Directory Structure
- **`2025.2/`** - Latest platform version components and templates
  - `components/` - Individual reusable component examples (cards, functions, app-events, settings, etc.)
  - `defaultFiles/` - Default files for new projects (AGENTS.md, CLAUDE.md, hsproject.json)
  - `private-app-get-started-template/` - Full starter template for private apps
- **`projects/`** - Legacy templates for platform version 2025.1
  - `private-app-getting-started-template/` - Private app starter
  - `public-app-getting-started-template/` - Public app starter  
  - `no-template/` - Empty project scaffold
- **`components/`** - Legacy example components
- **`config.json`** - Repository-level component and project catalog

### Component Types and Strict Directory Rules

**Critical**: Components MUST be placed in their designated directories only. Nested subdirectories are NOT allowed.

- **`app`** (one per project) → `app/` directory
  - Contains `app-hsmeta.json` with `type: "app"`
  - Defines auth (`oauth` or `static`), distribution (`marketplace` or `private`), and permissions
  - Marketplace apps MUST use `oauth` auth type
  
- **`card`** → `app/cards/` directory
  - UI extensions displayed in HubSpot CRM
  - **No `window` object access** - use `hubspot.fetch()` from `@hubspot/ui-extensions`
  - All fetch URLs must be declared in `app` component's `config.permittedUrls.fetch` array
  - Example: `2025.2/components/cards/src/app/cards/NewCard.jsx`

- **`app-function`** → `app/functions/` directory
  - Serverless functions (not available for marketplace apps)
  - Example: `2025.2/components/functions/src/app/functions/NewFunction.js`
  
- **`settings`** (one per project) → `app/settings/` directory
  - Same restrictions as cards (no `window`, use `hubspot.fetch()`)
  - Cannot use `@hubspot/ui-extensions/crm` components

- **`app-event`** → `app/app-events/` directory
- **`app-object`** → `app/app-objects/` directory
- **`webhooks`** (one per project) → `app/webhooks/` directory (private apps with `static` auth only)
- **`workflow-action`** → `app/workflow-actions/` directory
- **`scim`** (one per project) → `app/scim/` directory
- **`pages`** → `app/pages/` directory (for custom app pages like Home.tsx)

### Configuration Files

**`hsproject.json`** (project root):
```json
{
  "name": "project-name",
  "srcDir": "src",
  "platformVersion": "2025.2"
}
```

**`*-hsmeta.json`** (component metadata):
- File must end with `-hsmeta.json` suffix
- `uid` field must be unique within the project
- `type` field defines component type (matches rules above)

## Critical Developer Workflows

### HubSpot CLI Commands
- **`hs project dev`** - Run project locally for testing and iteration
- **`hs project open`** - Open current project in browser
- **`hs init`** - Initialize HubSpot CLI configuration
- **`hs auth`** - Authenticate new account (requires browser token)
- **`hs account`** - Manage HubSpot accounts
- **`hs doctor`** - Debug CLI installation issues
- **All commands support `--debug` flag** for troubleshooting
- **Use `--help`** on any command/subcommand for detailed usage

### MCP Server Integration
**IMPORTANT**: If the 'HubSpot' MCP server is installed, ALWAYS use MCP tools BEFORE attempting manual CLI commands or direct HubSpot asset manipulation.

## Project-Specific Conventions

### React Component Patterns
```javascript
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend(() => <Extension />);

const Extension = () => {
  return <Text>Component content</Text>;
};
```

### UI Extensions Constraints
- Only use components from `@hubspot/ui-extensions` package
- **No `style` properties** - only component-defined properties are valid
- For cards and settings: use `hubspot.fetch()` instead of `window.fetch()`
- CRM-specific components from `@hubspot/ui-extensions/crm` work in cards but NOT in settings

### Platform Version Differences
- **2025.1**: Legacy platform (projects/ directory)
- **2025.2**: Current platform (2025.2/ directory)
  - Platform version in `hsproject.json` determines available features and config file structure
  - Always check platform version when adding components

## Integration & Communication

### Serverless Functions
- Configured in component's `-hsmeta.json`
- Called from React components via `runServerlessFunction()`
- Example interaction:
```javascript
const { response } = await runServerless({ 
  name: "myFunc", 
  parameters: { text: text } 
});
```

### External API Access
- Declare all external URLs in `app` component's `config.permittedUrls.fetch` array
- Use `hubspot.fetch()` from `@hubspot/ui-extensions` in UI components

## Common Pitfalls to Avoid

1. **Don't nest components** - Components must be in their designated directory, not subdirectories
2. **Don't use `window` in UI extensions** - Use `hubspot.fetch()` instead
3. **Don't forget to register fetch URLs** - Add to `config.permittedUrls.fetch` in app-hsmeta.json
4. **Don't mix auth types** - Marketplace apps require `oauth`, not `static`
5. **Don't add app-functions to marketplace apps** - They're only for private apps
6. **Don't reuse UIDs** - Each component's `uid` in `-hsmeta.json` must be unique

## Reference Files

- Architecture examples: `2025.2/components/{cards,functions,app-events}/`
- Full project template: `2025.2/private-app-get-started-template/`
- Component rules: `2025.2/defaultFiles/AGENTS.md` and `CLAUDE.md`
- Getting started guide: `2025.2/private-app-get-started-template/README.md`
