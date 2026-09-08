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
3. **Source version to copy from** — which existing version directory to use as the base. Default to the version the new one supersedes: for a new GA version that is its own beta directory, and for a new beta it is the current GA. List the available options by running `ls -d */` in the repo root and showing version directories only.

## Step 2: Determine names

- **Source directory**: the version the user chose to copy from (e.g., `2026.03`)
- **Target directory**: new version string, with `-beta` appended if applicable (e.g., `2026.09-beta`)

Confirm both with the user before making any changes: "I'll copy `{source}` → `{target}`. Proceed?"

## Step 3: Copy the directory

```bash
cp -r {source} {target}
```

## Step 4: Update version references

Replace EVERY occurrence of the source version string with the target version string across the whole target directory. Do not work from a list of known files. The version turns up in `hsproject.json`, in `defaultFiles/*.md` prose, and inside documentation links, and new files get added over time, so any fixed list goes stale.

```bash
grep -rn '{source}' {target}
```

Update every hit, then re-run the same grep and confirm it returns nothing. That check is the actual acceptance criterion for this step.

Note the value is the FULL directory name, keeping the `-beta` suffix when there is one. Every existing version directory follows this convention: `2026.09-beta/defaultFiles/hsproject.json` sets `"platformVersion": "2026.09-beta"`, not `"2026.09"`.

## Step 5: Report what was created

Tell the user:
- The directory that was created
- Which files they should review and customize before the version is ready (particularly `config.json` if component support changed between versions)
- A reminder to update `defaultFiles/CLAUDE.md` and `defaultFiles/AGENTS.md` if the new version introduces new component types, constraints, or CLI commands
- If this is a beta, note that when the version stabilizes the GA directory is added as a copy and the beta directory stays where it is. Both `2026.03-beta` and `2026.03` exist for this reason. Renaming a beta directory breaks every project still pinned to the beta.
