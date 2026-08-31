import {
  BulkActionsContext,
  EmptyState,
  ExtensionPointApiActions,
  List,
  Text,
} from '@hubspot/ui-extensions';
import { hubspot } from '@hubspot/ui-extensions';

interface ActionExtensionProps {
  context: BulkActionsContext;
  actions: ExtensionPointApiActions<'crm.bulkActions'>;
}

hubspot.extend<'crm.bulkActions'>(
  ({ context, actions }: ActionExtensionProps) => (
    <ActionExtension context={context} actions={actions} />
  ),
);

const ActionExtension = ({ context, actions }: ActionExtensionProps) => {
  console.log({ context, actions });

  return (
    <EmptyState
      title="Build your action here!"
      layout="vertical"
      imageName="building"
    >
      <Text>
        Action extensions provide you the context to operate on multiple records
        at once. You have {context.crm.objectIds.length} records selected:
      </Text>

      <List>
        {context.crm.objectIds.map((objectId: string | number) => (
          <Text key={objectId}>{objectId}</Text>
        ))}
      </List>
    </EmptyState>
  );
};
