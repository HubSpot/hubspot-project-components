import { Text } from '@hubspot/ui-extensions';
import { PageBreadcrumbs, PageTitle } from '@hubspot/ui-extensions/pages';

export const DocsPage = () => {
  return (
    <>
      <PageBreadcrumbs>
        <PageBreadcrumbs.PageLink to="/">Home</PageBreadcrumbs.PageLink>
        <PageBreadcrumbs.Current>Documentation</PageBreadcrumbs.Current>
      </PageBreadcrumbs>
      <PageTitle>Documentation</PageTitle>

      <Text>Build your documentation page here!</Text>
    </>
  );
};
