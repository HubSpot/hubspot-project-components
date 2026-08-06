---
name: add-platform-version
description: >
  Use this skill when adding a new HubSpot platform version to the hubspot-project-components repo.
  Triggers include "add a new platform version", "create a new version directory", "scaffold 2026.09",
  "add support for a new platform release", or any mention of adding a versioned directory to this repo.
  Prompts the user for the required inputs before making any changes.
---

# Add Platform Version

This skill scaffolds a new platform version directory by copying an existing version and updating version-specific references.

## Step 1: Gather inputs

Ask the user for the following. Ask all questions in a single message and wait for answers before proceeding.

1. **New version string** — the platform version identifier (e.g., `2026.09`). This becomes the directory name.
2. **Is this a beta release?** — if yes, append `-beta` to the directory name (e.g., `2026.09-beta`).
3. **Source version to copy from** — which existing version directory to use as the base. Default to the most recent non-beta version. List the available options by running `ls -d */` in the repo root and showing version directories only.

## Step 2: Determine names

- **Source directory**: the version the user chose to copy from (e.g., `2026.03`)
- **Target directory**: new version string, with `-beta` appended if applicable (e.g., `2026.09-beta`)

Confirm both with the user before making any changes: "I'll copy `{source}` → `{target}`. Proceed?"

## Step 3: Copy the directory

```bash
cp -r {source} {target}
```

## Step 4: Update version references

Update the `platformVersion` field in `{target}/defaultFiles/hsproject.json` to the new version string (without the `-beta` suffix — `platformVersion` is always the base version):

```json
{
  "name": "My Project",
  "srcDir": "src",
  "platformVersion": "{newVersion}"
}
```

Scan `{target}/defaultFiles/HUBSPOT_PROJECTS.md` for any hard-coded version references and update them to the new version.

## Step 5: Report what was created

Tell the user:
- The directory that was created
- Which files they should review and customize before the version is ready (particularly `config.json` if component support changed between versions)
- A reminder to update `defaultFiles/CLAUDE.md` and `defaultFiles/AGENTS.md` if the new version introduces new component types, constraints, or CLI commands
- If this is a beta, a reminder to rename the directory (drop `-beta`) when the version stabilizes
