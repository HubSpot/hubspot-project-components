import { EmptyState, Link, Text } from '@hubspot/ui-extensions';
import {
  hubspot,
  ExtensionPointApiActions,
  SettingsContext,
} from '@hubspot/ui-extensions';

interface SettingsExtensionProps {
  context: SettingsContext;
  actions: ExtensionPointApiActions<'settings'>;
}

hubspot.extend<'settings'>(({ context, actions }: SettingsExtensionProps) => (
  <SettingsPage context={context} actions={actions} />
));

const SettingsPage = ({ context, actions }: SettingsExtensionProps) => {
  console.log({ context });

  const appSettingsDocsLink =
    'https://developers.hubspot.com/docs/apps/developer-platform/add-features/ui-extensibility/create-a-settings-component';

  return (
    <>
      <EmptyState
        title="Build your Settings page here!"
        layout="horizontal"
        imageName="building"
      >
        <Text>
          Add configuration and customization settings for your app, linked to
          directly from your app cards. Check out the{' '}
          <Link href={appSettingsDocsLink}>app settings documentation</Link> for
          more info.
        </Text>
      </EmptyState>
    </>
  );
};
