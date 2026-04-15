import React from "react";
import { Text } from "@hubspot/ui-extensions";
import { PageBreadcrumbs, PageLink, PageTitle } from "@hubspot/ui-extensions/pages";

export const HomePage = () => {
  return (
    <>
      <PageBreadcrumbs>
        <PageBreadcrumbs.Current>Home</PageBreadcrumbs.Current>
      </PageBreadcrumbs>
      <PageTitle>Home</PageTitle>

      <Text>
        Build your application home page here! Check out the <PageLink to="/docs">Documentation</PageLink> page for an example of multi-page navigation.
      </Text>
    </>
  );
};
