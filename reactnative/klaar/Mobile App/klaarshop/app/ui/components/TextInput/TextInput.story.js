import React from 'react';
import { Button, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import _ from 'lodash';
import { TextInput } from './TextInput';
import MailIcon from './assets/mail'
import UserIcon from './assets/user';
import CheckCircleIcon from './assets/checkCircle';
import AlertIcon from './assets/alert';
import styles from './TextInputStoryStyles';

const { useState } = React;
const orange = '#ff8500';
const red = '#F20202';

const TextInputStory = () => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');
  
  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        <TextInput value={value1} inputLabel={'Почта'} 
          iconLeftDefault={<MailIcon w={22} h={18} color={orange}/>} 
          iconLeftError={<MailIcon w={22} h={18} color={red}/>} 
          iconRightSuccess={<CheckCircleIcon w={24} h={24}/>}
          iconRightError={<AlertIcon w={24} h={24}/>}
          validationOk={undefined}
          onChangeText={(text) => setValue1(text)}
        />
      </View>
      <View style={styles.componentContainer}>
        <TextInput value={value2} inputLabel={'Имя'} 
          iconLeftDefault={<UserIcon w={17} h={19} color={orange}/>}
          iconLeftError={<UserIcon w={17} h={19} color={red}/>}
          iconRightSuccess={<CheckCircleIcon w={24} h={24}/>}
          iconRightError={<AlertIcon w={24} h={24}/>}
          validationOk={true}
          onChangeText={(text) => setValue2(text)}
          required={true}
        />
      </View>
      <View style={styles.componentContainer}>
        <TextInput value={value6} inputLabel={'Фамилия'} 
          iconLeftDefault={<UserIcon w={17} h={19} color={orange}/>}
          iconLeftError={<UserIcon w={17} h={19} color={red}/>}
          iconRightSuccess={<CheckCircleIcon w={24} h={24}/>}
          iconRightError={<AlertIcon w={24} h={24}/>}
          validationOk={false}
          onChangeText={(text) => setValue6(text)}
          required={true}
        />
      </View>
      <View style={styles.componentContainer}>
        <TextInput value={value3} inputLabel={'Пароль'} 
        iconLeftDefault={<MailIcon w={22} h={18} color={orange}/>} 
        iconLeftError={<MailIcon w={22} h={18} color={red}/>} 
        iconRightError={<AlertIcon w={24} h={24}/>}
        iconRightSuccess={<CheckCircleIcon w={24} h={24}/>}
        validationOk={undefined}
        onChangeText={(text) => setValue3(text)}
        required={true} secureTextEntry={true}/>
      </View>
      <View style={styles.componentContainer}>
        <TextInput value={value4} inputLabel={'Комментарий к заказу'} 
        required={true} onChangeText={(text) => setValue4(text)} multiline={true}
        />
      </View>
    </View>
  );
};

storiesOf('TextInput', module)
  .add('Textinput', () => <TextInputStory />);