import React from 'react';

import {storiesOf} from '@storybook/react-native';

// import { ResizeView } from '~/storybook/stories/ResizeView';
import {MainScreen} from './MainScreen';

storiesOf('MainScreen', module)
  // .addDecorator(getStory => <ResizeView>{getStory()}</ResizeView>)
  .add('MainScreen', () => (
    <MainScreen
      title="552"
      onSubmitPress={value => {
        console.log(value);
      }}
    />
  ));
