import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ResizeView } from '#/stories/ResizeView';
import { ClientProfileScreen } from './ClientProfileScreen';

storiesOf('ClientProfileScreen', module)
  .addDecorator(getStory => <ResizeView>{getStory()}</ResizeView>)
  .add('ClientProfileScreen', () => <ClientProfileScreen />);
