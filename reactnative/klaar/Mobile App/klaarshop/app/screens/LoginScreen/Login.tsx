import React, {memo} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Colors} from '~/styles';
import {LoginForm, LoginFormProps} from '~/components/LoginForm/LoginForm';
import {Button} from '~/components/Button';
import {OTPForm, OTPFormProps} from '~/components/OTPForm/OTPForm';
import {BaseErrorType} from '~/store/restHelper.d';

type LoginStep = 'loginForm' | 'otpForm';

type Props = Pick<
  LoginFormProps,
  | 'phone'
  | 'password'
  | 'showRecoverPassword'
  | 'onPhoneChange'
  | 'onPasswordChange'
  | 'onRecoveryPress'
  | 'error'
> &
  Pick<
    OTPFormProps,
    | 'code'
    | 'showRetryLink'
    | 'onRetryPress'
    | 'onCodeChange'
    | 'showResetPhone'
    | 'onResetPhone'
    | 'error'
  > & {
    error?: BaseErrorType;
    step?: LoginStep;
    fetching: boolean;
    submitDisabled: boolean;
    onSubmit: () => void;
  };

const Login: React.FC<Props> = memo(props => {
  const {t} = useTranslation();
  return (
    <View style={s.container}>
      <View style={s.logoBox}>
        <Image source={require('./assets/dots.png')} style={s.imageDots} />
        <Image source={require('./assets/lines.png')} style={s.imageLines} />
        <Image source={require('./assets/concord.png')} />
      </View>
      <View style={s.whiteBox}>
        {props.step === 'otpForm' ? (
          <OTPForm
            title={t(
              'Пожалуйста, введите 6-значный код, который мы отправили вам на',
            )}
            {...props}
          />
        ) : (
          <View style={s.loginFormBox}>
            <LoginForm
              title={t('Добро пожаловать!')}
              {...props}
              showRecoverPassword
            />
          </View>
        )}
        <Button
          title={t('Отправить')}
          spinner={props.fetching}
          disabled={props.submitDisabled}
          onPress={props.onSubmit}
        />
      </View>
    </View>
  );
});

export {Login};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
    alignItems: 'stretch',
  },
  logoBox: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDots: {
    position: 'absolute',
    right: 17,
  },
  imageLines: {
    position: 'absolute',
    bottom: 20,
    left: 0,
  },
  whiteBox: {
    backgroundColor: 'white',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  loginFormBox: {
    marginTop: 20,
  },
});
