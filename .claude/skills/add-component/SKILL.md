---
name: add-component
description: >
  Use this skill when adding a new component type to the hubspot-project-components repo.
  Triggers include "add a new component", "add a component type", "scaffold a new component",
  "create a template for a new feature type", or any mention of adding a component to a platform
  version directory. Prompts the user for required inputs before creating any files.
---

# Add Component

This skill adds a new component type template to one or more platform version directories and registers it in the corresponding `config.json`.

## Step 1: Gather inputs

Ask all questions in a single message and wait for answers before proceeding.

1. **Platform version(s)** — which version directory (or directories) to add this component to (e.g., `2026.03`, `2026.09-beta`). List available versions by running `ls -d */` in the repo root.
2. **Component label** — the human-readable name shown in the CLI (e.g., `"Custom Webhook Handler"`).
3. **Component type** — the `type` value used in `config.json` and `-hsmeta.json` (e.g., `webhooks`, `card`, `app-function`). Look at existing `config.json` entries for examples.
4. **Directory name** — the subdirectory name under `components/` (e.g., `my-webhooks`). Defaults to the component type with a plural if appropriate.
5. **Parent type** — which parent component this attaches to. Almost always `app`.
6. **Supported auth types** — one or both of `oauth`, `static`.
7. **Supported distributions** — one or both of `private`, `marketplace`.
8. **CLI selector override** — an optional `cliSelector` value if the CLI command name differs from the `type` (check existing entries in `config.json` for examples — most components don't need this).
9. **Closest existing component to base the template on** — which existing component's file structure to copy as a starting point. Show the list from `{version}/components/` for the user to choose from.

## Step 2: Confirm the plan

Before making any changes, show the user a summary:

```
Adding component:
  Label:         {label}
  Type:          {type}
  Directory:     {version}/components/{dirName}/
  Parent type:   {parentType}
  Auth types:    {authTypes}
  Distributions: {distributions}
  Based on:      {sourceComponent}

config.json entry:
{previewJsonEntry}

Proceed?
```

## Step 3: Copy template files

For each target platform version:

```bash
cp -r {version}/components/{sourceComponent} {version}/components/{dirName}
```

Then update the `-hsmeta.json` file inside the copied directory:
- Set `"type"` to the new component type
- Generate a new `"uid"` value (use the format `{dirName}-{randomSuffix}` where the suffix is a short alphanumeric string)
- Remove or update any label/name fields that reflect the source component

## Step 4: Update config.json

Add a new entry to the `"components"` array in `{version}/config.json`:

```json
{
  "path": "components/{dirName}",
  "label": "{label}",
  "type": "{type}",
  "parentType": "{parentType}",
  "supportedAuthTypes": [{authTypes}],
  "supportedDistributions": [{distributions}]
}
```

Include `"cliSelector": "{cliSelector}"` only if the user provided one.

## Step 5: Report what was created

Tell the user:
- The directories and files created
- The `config.json` entry added
- What they should customize in the new component directory (the `-hsmeta.json` fields, the UI entry point if it's a card/settings component, or the function handler if it's an app-function)
- If the component type is new to HubSpot (not just new to this repo), remind them to document it in `defaultFiles/CLAUDE.md` and `defaultFiles/AGENTS.md`
