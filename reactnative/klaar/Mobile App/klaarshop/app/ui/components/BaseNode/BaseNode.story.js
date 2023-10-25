/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { CenterView } from '#/stories/CenterView';
import { View, Text } from 'react-native';
import { BaseNode } from './BaseNode';

storiesOf('BaseNode', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('BaseNode cases', () => (
    <React.Fragment>
      <BaseNode
        style={{
          padding: 20,
          margin: 10,
          fontSize: 16,
          backgroundColor: 'red',
          color: 'white',
          borderColor: 'silver',
          borderWidth: 1,
        }}>
        text node
      </BaseNode>
      <BaseNode
        style={{
          padding: 20,
          margin: 10,
          backgroundColor: 'yellow',
          borderColor: 'silver',
          borderWidth: 1,
        }}>
        {() => <Text>Render Callback</Text>}
      </BaseNode>
      <BaseNode
        style={{
          padding: 20,
          margin: 10,
          borderColor: 'silver',
          borderWidth: 1,
        }}>
        <View>
          <Text>Children Composition</Text>
        </View>
      </BaseNode>
    </React.Fragment>
  ));
