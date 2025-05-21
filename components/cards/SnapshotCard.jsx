import React from "react";
import { Text } from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";

hubspot.extend(() => <Extension />);

const Extension = () => {
  return (
    <>
      <Text>
        Congrats! Here's your Snapshot Card. Welcome to Projects V2!
      </Text>
    </>
  );
};
