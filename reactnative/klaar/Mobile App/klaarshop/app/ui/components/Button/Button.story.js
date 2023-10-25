import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import FacebookIcon from './assets/facebook';
import VkIcon from './assets/vk';
import WhatsappIcon from './assets/whatsapp';
import TelegramIcon from './assets/telegram';
import LinkIcon from './assets/link';
import { Button } from './Button';
import ShareIcon from './assets/share';
import styles from './ButtonStoryStyles';

storiesOf('Button', module)
  .add('with text', () => (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Button
          onPress={()=> console.log('1123123')}
          title="Hello World"
          spinner
        />
      </View>
      <View style={styles.componentContainer}>
        <Button
          onPress={()=> console.log('1123123')}
          title="Hello World"
          color={'#c9c9c9'}
        />
      </View>
    </View>
  )).add('with icon', () => (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <Button
          onPress={()=> console.log('1123123')}
          title="Facebook Поделиться"
          color={'#395185'}
          icon={<FacebookIcon w={24} h={24}/>}
        />
      </View>
      <View style={styles.componentContainer}>
        <Button
          onPress={()=> console.log('1123123')}
          title="Вконтакте Поделиться"
          color={'#5181B8'}
          icon={<VkIcon w={24} h={14}/>}
        />
      </View>
      <View style={styles.componentContainer}>
        <Button
          onPress={()=> console.log('1123123')}
          title="Whatsapp Поделиться"
          color={'#3ADF57'}
          icon={<WhatsappIcon w={30} h={30}/>}
        />
      </View>
      <View style={styles.componentContainer}>
        <Button
          onPress={()=> console.log('1123123')}
          title="Telegram Поделиться"
          color={'#1E96C8'}
          icon={<TelegramIcon w={24} h={24}/>}
        />
      </View>
      <View style={styles.componentContainer}>
        <Button
          onPress={()=> console.log('1123123')}
          title="Ссылка Поделиться"
          color={'#FF8500'}
          icon={<LinkIcon w={24} h={24}/>}
        />
      </View>
    </View>
  )).add('small', () => (
    <View style={styles.container}>
      <View style={styles.smallBntsContainer}>
        <View style={styles.mediumWidth}>
          <Button
            onPress={()=> console.log('1123123')}
            title="Подписаться"
            color={'#ff8500'}
          />
        </View>
        <View style={styles.mediumWidth}>
          <Button
            onPress={()=> console.log('1123123')}
            title="Message"
            color={'#000'}
          />
        </View>
        <View style={styles.smallWidth}>
          <Button
            onPress={()=> console.log('1123123')}
            title=""
            color={'#fff'}
            borderWidth={0.5}
            borderColor={'#ccc'}
            icon={<ShareIcon w={22} h={22}/>}
          />
        </View>
      </View>
    </View>
  ))