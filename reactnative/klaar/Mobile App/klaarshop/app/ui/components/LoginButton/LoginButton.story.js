import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import WhatsappIcon from './assets/whatsapp';
import GoogleIcon from './assets/google';
import FacebookIcon from './assets/facebook';
import { LoginButton } from './LoginButton';
import styles from './LoginButtonStoryStyles';

storiesOf('LoginButton', module)
  .add('With icons', () => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.componentContainer}>
          <LoginButton
            onPress={()=> console.log('1123123')}
            icon={<FacebookIcon w={24} h={24}/>}
          />
        </View>
        <View style={styles.componentContainer}>
          <LoginButton
            onPress={()=> console.log('1123123')}
            icon={<GoogleIcon w={24} h={24}/>}
          />
        </View>
        <View style={styles.componentContainer}>
          <LoginButton
            onPress={()=> console.log('1123123')}
            icon={<WhatsappIcon w={24} h={24}/>}
          />
        </View>
      </View>
    </View>
  ))