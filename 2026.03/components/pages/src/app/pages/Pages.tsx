import React from "react";
import { hubspot } from "@hubspot/ui-extensions";
import { createPageRouter, PageHeader, PageRoutes } from "@hubspot/ui-extensions/pages";
import { HomePage } from "./HomePage";
import { DocsPage } from "./DocsPage";

const PageLayout = ({ children }) => {
  return (
    <>
      <PageHeader>
        <PageHeader.PrimaryAction>
          <PageHeader.Link href="https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensions/extension-points/app-pages/overview">
            Platform Docs
          </PageHeader.Link>
        </PageHeader.PrimaryAction>
        <PageHeader.SecondaryActions>
          <PageHeader.Link onClick={() => console.log('Secondary Action 1')}>
            Secondary 1
          </PageHeader.Link>
          <PageHeader.Link onClick={() => console.log('Secondary Action 2')}>
            Secondary 2
          </PageHeader.Link>
        </PageHeader.SecondaryActions>
      </PageHeader>
      {children}
    </>
  );
};

const PageRouter = createPageRouter(
  <PageRoutes layoutComponent={PageLayout}>
    <PageRoutes.IndexRoute component={HomePage} />
    <PageRoutes.Route path="/docs" component={DocsPage} />
  </PageRoutes>
);

hubspot.extend<"pages">(() => <PageRouter />);
