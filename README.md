## HubSpot Project Components

This repository contains the component templates and default files that power the HubSpot CLI's `hs project create` and `hs project add` commands. When a developer creates a new HubSpot project or adds a component feature, the CLI pulls scaffolding from this repo.

---

## Repository structure

```
hubspot-project-components/
├── {platformVersion}/              # One directory per platform version (e.g., 2026.03, 2026.09-beta)
│   ├── config.json                 # Defines available parent components and child components
│   ├── components/                 # One subdirectory per component type
│   ├── defaultFiles/               # Files copied into every new project
│   │   ├── hsproject.json          # Project config template
│   │   ├── HUBSPOT_PROJECTS.md     # Getting-started guide for developers
│   │   ├── CLAUDE.md               # AI workflow guidance for Claude Code
│   │   └── AGENTS.md               # AI workflow guidance for other coding agents
│   └── private-app-get-started-template/   # Full starter project (used by hs project get-started)
├── projects/                       # Legacy project templates (pre-versioned; kept for backwards compat)
└── components/                     # Legacy component templates (pre-versioned; kept for backwards compat)
```

The top-level directories are named after HubSpot platform versions. The CLI resolves which version directory to use based on the `platformVersion` field in the developer's `hsproject.json`.

---

## Key files

### `{version}/config.json`

Drives what the CLI presents when a developer runs `hs project add`. It has two sections:

- **`parentComponents`** — top-level app scaffolds (e.g. "Static Private App", "OAuth Marketplace App"). These are created once per project and live in `src/app/`.
- **`components`** — child features that attach to a parent app (cards, functions, webhooks, etc.). Each entry declares its `type`, the parent it attaches to (`parentType`), and which auth types and distribution models it supports.

```json
{
  "parentComponents": [
    {
      "label": "Static Private App",
      "type": "app",
      "authType": "static",
      "distribution": "private",
      "path": "components/app/static-private"
    }
  ],
  "components": [
    {
      "path": "components/cards",
      "label": "Card",
      "type": "card",
      "parentType": "app",
      "supportedAuthTypes": ["oauth", "static"],
      "supportedDistributions": ["private", "marketplace"]
    }
  ]
}
```

The `path` value is relative to the version directory and points to the template files the CLI copies when adding that component.

### `{version}/defaultFiles/`

These files are written into every new HubSpot project at creation time, regardless of which template the developer chose.

| File | Purpose |
|------|---------|
| `hsproject.json` | Starter project config with `name`, `srcDir`, and `platformVersion` |
| `HUBSPOT_PROJECTS.md` | A getting-started guide that lands in the developer's project |
| `CLAUDE.md` | Guidance for [Claude Code](https://claude.ai/code) — rules for how AI should interact with HubSpot projects, CLI commands, component placement rules, and API constraints |
| `AGENTS.md` | Same guidance as `CLAUDE.md`, but formatted for other AI coding agents (Cursor, Copilot, etc.) |

`CLAUDE.md` and `AGENTS.md` are the primary AI workflow files. They teach AI coding assistants about HubSpot-specific constraints — which directories components must live in, how `hubspot.fetch` works differently from `window.fetch`, which `hs` CLI commands to use, and so on. Edits to these files affect the AI-assisted developer experience for everyone who creates a new HubSpot project using this platform version.

### `{version}/components/{component-type}/`

Each component directory contains a ready-to-copy file tree. The structure mirrors where the files land inside a developer's `src/` directory:

```
components/cards/
└── src/
    └── app/
        └── cards/
            ├── card-hsmeta.json    # Component configuration (type, uid, etc.)
            ├── NewCard.tsx         # React component entry point
            ├── package.json
            ├── tsconfig.json
            └── eslint.config.js
```

The `-hsmeta.json` file is what the HubSpot platform reads to understand the component type and configuration. Its shape is version-specific — refer to the existing examples or the [HubSpot developer docs](https://developers.hubspot.com/docs/apps/developer-platform/build-apps/overview) for the allowed fields.

---

## Making changes

### Adding or modifying a component template

1. Find the right platform version directory (e.g. `2026.03/components/cards/`).
2. Edit the template files. Changes take effect for any developer who adds that component after the CLI picks up the new version of this repo.
3. If you are adding a brand new component type, also add an entry to `{version}/config.json` under `components` or `parentComponents`.

### Adding a new platform version

1. Copy the most recent stable version directory (e.g. `cp -r 2026.03 2026.09`).
2. Update `platformVersion` in `defaultFiles/hsproject.json` to match the new version string.
3. Adjust `components/` and `config.json` to reflect any features added or removed in the new platform version.
4. Use a `-beta` suffix (e.g. `2026.09-beta`) until the version is stable.

### Editing the AI workflow files

`defaultFiles/CLAUDE.md` and `defaultFiles/AGENTS.md` are identical in content — one targets Claude Code, the other targets other AI agents. If you update one, update the other to keep them in sync.

These files document:
- **Component placement rules** — which directories each component type must live in
- **`hubspot.fetch` constraints** — why relative URLs don't work and how the local proxy (`local.json`) works around localhost restrictions during development
- **CLI command reference** — the full `hs project` and `hs account` command list
- **Available hooks and actions** — for card and settings UI extension components

---

## Contribution workflow

1. Branch from `main`.
2. Make changes in the appropriate platform version directory.
3. Open a PR against `main`. The PR template asks for a description, screenshots for visible changes, and a list of people to notify.

There is no build step or test suite in this repository — changes are template files only.
