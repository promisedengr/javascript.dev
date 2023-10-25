import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { Header } from './Header';
import SettingsIcon from './assets/settings';
import styles from './HeaderStoryStyles';

const HeaderStory = () => {

return(
  <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Header
          headerTitle={'Пользователь'}
          headerLeft={'arrow'}
          headerRight={
            <TouchableOpacity style={styles.settingsIconContainer}>
              <SettingsIcon w={30} h={30}/>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
)}


storiesOf('Header', module)
.add('Header_default', () => <HeaderStory />)