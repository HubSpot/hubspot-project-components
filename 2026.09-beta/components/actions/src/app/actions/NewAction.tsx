import { EmptyState, Text } from '@hubspot/ui-extensions';
import { hubspot } from '@hubspot/ui-extensions';

hubspot.extend<'crm.bulkAction'>(() => <ActionExtension />);

const ActionExtension = () => (
  <EmptyState
    title="Build your action here!"
    layout="vertical"
    imageName="building"
  >
    <Text>Action extensions can operate on multiple records at once.</Text>
  </EmptyState>
);
