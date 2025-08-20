import React from "react";
import { EmptyState, Text } from "@hubspot/ui-extensions";
import { hubspot } from "@hubspot/ui-extensions";
import { HeaderActions, PrimaryHeaderActionButton, SecondaryHeaderActionButton } from '@hubspot/ui-extensions/experimental';

hubspot.extend<"home">(({ context }) => {
  return <NewSettingsPage context={context} />;
});

const NewSettingsPage = ({ context }) => {

  return (
    <>
      <HeaderActions>
        <PrimaryHeaderActionButton onClick={() => console.log('P1')}>
          Primary 1
        </PrimaryHeaderActionButton>
        <SecondaryHeaderActionButton onClick={() => console.log('S1')}>
          Secondary 1
        </SecondaryHeaderActionButton>
        <SecondaryHeaderActionButton onClick={() => console.log('S2')}>
          Secondary 2
        </SecondaryHeaderActionButton>
      </HeaderActions>
      <EmptyState
        title="Nothing here yet!"
        layout="vertical"
      >
        <Text>
          Build your application settings page here!
        </Text>
      </EmptyState>
    </>
  );
};