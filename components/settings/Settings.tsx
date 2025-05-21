import React from "react";
import { EmptyState, Text } from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend(({ context }) => {
  return <Settings context={context} />;
});

const Settings = ({ context }) => {

  return (
    <EmptyState
      title="Nothing here yet!"
      layout="vertical"
    >
      <Text>
      Contact '{context.extension.appName}' for upcoming development plans
      </Text>
    </EmptyState>
  );
};
