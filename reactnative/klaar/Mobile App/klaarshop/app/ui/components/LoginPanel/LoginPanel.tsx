import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from './LoginPanelStyles';
import { LoginButton } from '~/ui/components/LoginButton';
import WhatsappIcon from '~/ui/components/LoginButton/assets/whatsapp';
import GoogleIcon from '~/ui/components/LoginButton/assets/google';
import FacebookIcon from '~/ui/components/LoginButton/assets/facebook';
import { userSelector } from '~/logic/user/UserSelectors';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';
import { showError } from '~/logic/AlertService/AlertService';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { UserActions } from '~/logic/user/UserRedux';

export type LoginPanelProps = {
  marginTop?: number;
  marginBottom?: number;
};

const LoginPanel: React.FC<LoginPanelProps> = React.memo(props => {
  const [firstIn, setFirstIn] = useState(true);
  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { 
    googleLogin: { 
      error: googleLoginError
     }
  } = useSelector(userSelector);

  useEffect(() => {
    if (firstIn === true) {
      GoogleSignin.configure();
      setFirstIn(false);
    }
  });

  useEffect(
    () => {
      if (!!googleLoginError?.description) {
        showError(googleLoginError.description);
      }
    }, [googleLoginError]
  );
  
  const {
    marginBottom,
    marginTop
  } = props;

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log(userInfo, userInfo.idToken);
      if (!!userInfo.idToken) {
        dispatch(UserActions.googleLogin.request({
          googleToken: userInfo.idToken
        }))
      } else {
        showError(t('otherErrorHappened'));
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showError(t('loginCanceledByUser'));
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        showError(t('googleServicesNotAvaible'));
      } else {
        // some other error happened
        showError(t('otherErrorHappened'));
      }
    }
  };

  return (
    <View style={[s?.widthSpaceBetween, s?.horizontalLarge,
      {marginBottom: marginBottom, marginTop: marginTop}
    ]}>
      <View style={s?.loginButtonContainer}>
        <LoginButton
          onPress={() => {}}
          icon={<FacebookIcon w={24} h={24}/>}
        />
      </View>
      <View style={s?.loginButtonContainer}>
        <LoginButton
          onPress={() => {googleSignIn()}}
          icon={<GoogleIcon w={24} h={24}/>}
        />
      </View>
      <View style={s?.loginButtonContainer}>
        <LoginButton
          onPress={()=> console.log('1123123')}
          icon={<WhatsappIcon w={24} h={24}/>}
        />
      </View>
  </View>
  );
});

LoginPanel.defaultProps={
  marginTop: 0,
  marginBottom: 0
}

export { LoginPanel };