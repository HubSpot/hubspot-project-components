import React from "react";
import { Text, Link, List, EmptyState } from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend<'crm.record.tab'>(() => <Extension />);

const Extension = () => {

  const appCardDocsLink = 'https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/app-cards/overview';

  return (
    <>
      <EmptyState
        title="Build your app card here!"
        layout="vertical"
        imageName='building'
      >
        <Text>
          Add a layer of UI customization to your app by including app cards that can display data, allow users to perform actions, and more.
          Visit the <Link href={appCardDocsLink}>app card documentation</Link> for more info, or check out the following links to get inspired:
        </Text>
        <List variant="unordered-styled">
          <Link href="https://developers.hubspot.com/docs/platform/ui-components">
            📖 Explore our library of UI components
          </Link>
          <Link href="https://ecosystem.hubspot.com/marketplace/apps/app-cards">
            📖 Look at the Marketplace collection of apps that contain app cards
          </Link>
          <Link href="https://developers.hubspot.com/slack">
            ▶️ Connect with developers on #ui-extensions channel on developer
            Slack community
          </Link>
        </List>
      </EmptyState>
    </>
  );
};
