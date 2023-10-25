import React from 'react';
import {storiesOf} from '@storybook/react-native';
//import {ResizeView} from '#/stories/ResizeView';

import {Login} from './Login';

storiesOf('LoginScreen', module)
  // .addDecorator(getStory => <CenterView useKeyboard>{getStory()}</CenterView>)
  //.addDecorator(getStory => <ResizeView>{getStory()}</ResizeView>)
  .add('with LoginForm', () => <Login step="loginForm" />)
  .add('with OTPForm', () => <Login step="otpForm" phone="+380979666777" />);
