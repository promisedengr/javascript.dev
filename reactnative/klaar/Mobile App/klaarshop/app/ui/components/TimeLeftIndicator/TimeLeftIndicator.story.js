import React, {useState} from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {TimeLeftIndicator} from './TimeLeftIndicator';
import styles from './TimeLeftIndicatorStoryStyles';

const TimeLeftIndicatorStory = () => {

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <TimeLeftIndicator
          timeLeft={123}
        />
      </View>
  </View>
)}

storiesOf('TimeLeftIndicator', module)
.add('Default timer', () => <TimeLeftIndicatorStory />);