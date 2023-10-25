import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CenterView } from '#/stories/CenterView';
import { TitleDescription } from './TitleDescription';

storiesOf('TitleDescription', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('TitleDescription cases', () => (
    <React.Fragment>
      <TitleDescription
        title={'TitleDescription'}
        description={'description'}
      />
    </React.Fragment>
  ));
