import React from "react";
import { Text, Link, List } from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend(() => <Extension />);

const Extension = () => {
  return (
    <>
      <Text>
        Congrats! You just deployed your first app card! Here are some pointers to get you inspired:
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
    </>
  );
};
