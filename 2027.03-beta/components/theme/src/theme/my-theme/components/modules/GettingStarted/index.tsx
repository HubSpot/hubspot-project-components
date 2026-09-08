import {
  ModuleFields,
  TextField,
  RichTextField,
  ImageField,
} from '@hubspot/cms-components/fields';
import { RichText } from '@hubspot/cms-components';
import logo from '../../../assets/sprocket.svg';
import styles from '../../../styles/getting-started.module.css';

export function Component({ fieldValues, hublParameters }) {
  const { src, alt, width, height } = fieldValues.logo;
  const { brandColors } = hublParameters;

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: brandColors?.color,
        opacity: brandColors?.opacity,
      }}
    >
      <img src={src} alt={alt} width={width} height={height} />
      <h1>{fieldValues.headline}</h1>
      <RichText fieldPath="gettingStarted" />
      <div className={styles.buttons}>
        <a href="https://github.com/HubSpot/cms-react/tree/main/examples">
          Examples
        </a>
        <a href="https://github.hubspot.com/cms-react/">Read the Docs</a>
      </div>
    </div>
  );
}

const richTextFieldDefaultValue = `
  <div>
    <div>
      <span>
        Deploy to your theme by running <pre>npm run deploy</pre> from the root directory
      </span>
      </div>
  </div>
`;

export const fields = (
  <ModuleFields>
    <ImageField
      name="logo"
      label="Logo"
      default={{ src: logo, height: 100, alt: 'HubSpot logo' }}
      resizable={true}
    />
    <TextField
      name="headline"
      label="Headline"
      default="Getting Started with CMS React"
    />
    <RichTextField
      name="gettingStarted"
      label="Getting Started"
      default={richTextFieldDefaultValue}
    />
  </ModuleFields>
);

export const meta = {
  label: 'Getting Started with CMS React',
};
