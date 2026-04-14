# HubSpot App Pages

## Overview

App pages are React-based multi-page experiences for your app in HubSpot. Built with a client-side router, they support multiple routes, in-app navigation, breadcrumbs, and header actions — all using HubSpot's UI extension components.

App pages are stored in the `src/app/pages/` directory of your HubSpot project.

## File Structure

```
src/app/pages/
├── Pages.tsx            # Router entry point and layout
├── HomePage.tsx         # Home (index) route
├── DocsPage.tsx         # Documentation route
├── pages-hsmeta.json    # Extension configuration
├── package.json         # Dependencies
└── HUBSPOT_PAGES.md     # This file
```

## Router Setup

The router is created with `createPageRouter` and `PageRoutes` from `@hubspot/ui-extensions/pages`:

```tsx
import { createPageRouter, PageRoutes } from "@hubspot/ui-extensions/pages";

const PageRouter = createPageRouter(
  <PageRoutes layoutComponent={PageLayout}>
    <PageRoutes.IndexRoute component={HomePage} />
    <PageRoutes.Route path="/docs" component={DocsPage} />
  </PageRoutes>
);

hubspot.extend<"pages">(() => <PageRouter />);
```

- `PageRoutes.IndexRoute` renders at the root path
- `PageRoutes.Route` renders at the specified `path`
- `layoutComponent` wraps all routes with shared UI (like the header)

## Layout and PageHeader

The `PageHeader` component adds action buttons to the app's header area. It supports a primary action and multiple secondary actions:

```tsx
import { PageHeader } from "@hubspot/ui-extensions/pages";

<PageHeader>
  <PageHeader.PrimaryAction>
    <PageHeader.Link href="https://example.com">External Link</PageHeader.Link>
  </PageHeader.PrimaryAction>
  <PageHeader.SecondaryActions>
    <PageHeader.Link onClick={() => console.log('clicked')}>Action</PageHeader.Link>
  </PageHeader.SecondaryActions>
</PageHeader>
```

## In-App Navigation with PageLink

Use `PageLink` to navigate between routes within your app:

```tsx
import { PageLink } from "@hubspot/ui-extensions/pages";

<PageLink to="/docs">Go to Documentation</PageLink>
```

## Breadcrumbs

`PageBreadcrumbs` provides navigation context. Use `PageBreadcrumbs.PageLink` for clickable breadcrumb links and `PageBreadcrumbs.Current` for the active page:

```tsx
import { PageBreadcrumbs } from "@hubspot/ui-extensions/pages";

<PageBreadcrumbs>
  <PageBreadcrumbs.PageLink to="/">Home</PageBreadcrumbs.PageLink>
  <PageBreadcrumbs.Current>Documentation</PageBreadcrumbs.Current>
</PageBreadcrumbs>
```

## Page Titles

Use `PageTitle` to set the heading for each page:

```tsx
import { PageTitle } from "@hubspot/ui-extensions/pages";

<PageTitle>Documentation</PageTitle>
```

## Resources

- [App Pages Overview](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/extension-points/app-pages/overview): Guide to creating app pages
- [UI Extension Components](https://developers.hubspot.com/docs/platform/ui-components): Library of available UI components
- [UI Extensions SDK](https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/ui-extensions-sdk): Available utilities and methods
