import React from "react";
import { List, Text, Link, Alert } from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend(() => <Extension />);

const Extension = () => {
  return (
    <>
      <Text>
        Congrats! You just deployed your first App card. What's next? Here are
        some pointers to get you started:
      </Text>
      <List variant="unordered-styled">
        <Link href="https://developers.hubspot.com/docs/platform/ui-components">
          📖 Explore our library of UI components
        </Link>
        <Link href="www.developers.hubspot.com">
          📖 Learn more about utilities to help you build better extensions
        </Link>
        <Link href="github.com/hubspot/ui-extensions-examples">
          📖 Get inspired by private app code samples
        </Link>
        <Link href="https://www.youtube.com/watch?v=FDumsLFwyNM&list=PLTGNq2fWP3b0HpN11u4CuM6tNJBacORWs">
          ▶️ Watch video tutorials about building UI extensions for private apps
        </Link>
      </List>
      <Alert
        title="Detailed private beta documentation is shared over e-mail
          and Slack"
        variant="info"
      >
        Access to CRM development tools to build UI extensions for Marketplace
        is strictly limited to participants in private beta. You will receive
        some resources that are only shared with you via e-mail or private beta
        Slack channel. This includes documentation, Loom recordings, and early
        access to Figma design kit.
      </Alert>
    </>
  );
};
