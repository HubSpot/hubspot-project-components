
import React from 'react';
import { Text } from '@hubspot/ui-extensions';
import { hubspot } from '@hubspot/ui-extensions';

hubspot.extend(({context}) => (<Hello context={context}/>));

const Hello = ({ context }) => {
  return (
    <Text>Hello world</Text>
  );
};
