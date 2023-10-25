import React, {useState} from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { NavigationBar } from './NavigationBar';
import styles from './NavigationBarStoryStyles';

const NavigationBarStory = () => {
const [currentNavigationRoute, setCurrentNavigationRoute] = useState('home');
const changeState = (text) => {
  setCurrentNavigationRoute(text)
}

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <NavigationBar
          route={currentNavigationRoute}
          onSelect={changeState}
        />
      </View>
    </View>
)}


storiesOf('NavigationBar', module)
.add('Default_bar', () => <NavigationBarStory />)