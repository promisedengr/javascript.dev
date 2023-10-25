import _ from 'lodash';
import * as React from 'react';
import { memo, useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Keyboard } from 'react-native';
import { TextInput } from './../TextInput';
import { Button } from './../Button';
import { LoginPanel } from '~/ui/components/LoginPanel/LoginPanel';
import { createStyle } from './../../../screens/LoginScreen/LoginScreenStyles';
import { useThemeContext } from '~/ui/theme';
import { useTranslation } from 'react-i18next';
import { colors } from './../../theme/default/colors';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '~/logic/user/UserSelectors';
import { showError } from '~/logic/AlertService/AlertService';
import { UserActions } from '~/logic/user/UserRedux';
import CheckCircleIcon from './../TextInput/assets/checkCircle';
import AlertIcon from './../TextInput/assets/alert';
import { validatePhone, validatePassword, validatePasswordOtpCode } from '~/logic/user/ValidationHelper';

type RecoverPasswordFormProps = {}

const RecoverPasswordForm: React.FC<RecoverPasswordFormProps> = props => {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [hideEmpty, setHideEmpty] = useState(true);
  const { 
    passwordRecovery: { 
      fetching: passwordRecoveryFetching,
      error: passwordRecoveryError
     },
    forgotPassword: {
      data: forgotPasswordData
    }
  } = useSelector(userSelector);
  const dispatch = useDispatch();
  
  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  useEffect(
    () => {
      if (!passwordRecoveryError?.fields && !!passwordRecoveryError?.description) {
        showError(passwordRecoveryError.description);
      }
    }, [passwordRecoveryError]
  );

  const handleSave = () => {
    Keyboard.dismiss();
    setHideEmpty(false);
    if (validatePassword(value1) && validatePasswordOtpCode(value3) && passwordsMatch) {
      let pass = value1;
      dispatch(UserActions.passwordRecovery.request({
        userId: forgotPasswordData.userId,
        code: value3,
        passw: {pass}
      }))
    }
  }

  return (
    <View style={s?.containerCenter}>
      <View style={{width: 214, height: 214}}>
        {/* <Image source={require('')}/> */}
      </View>
      <View style={s?.marginX4}>
        <TextInput
          value={value1} inputLabel={t('newPassword')}
          bgColor={colors.white} unactiveColor={colors.lightGray}
          secureTextEntry={true}
          // iconLeftDefault={<MailIcon w={22} h={18} color={colors.orange}/>}
          // iconLeftError={<MailIcon w={22} h={18} color={colors.red}/>}
          iconRightSuccess={<CheckCircleIcon w={24} h={24}/>}
          iconRightError={<AlertIcon w={24} h={24}/>}
          validationOk={(passwordsMatch && validatePassword(value1) || (hideEmpty && !value1))}
          errorMsg={validatePassword(value1)? undefined: t('incorrectPasswordFormat')}
          onChangeText={(text) => {
            setValue1(text);
            setPasswordsMatch(text === value2)
          }}
        />
      </View>
      <View style={s?.marginX4}>
        <TextInput
          value={value2} inputLabel={t('repeatPassword')}
          bgColor={colors.white} unactiveColor={colors.lightGray}
          secureTextEntry={true}
          // iconLeftDefault={<MailIcon w={22} h={18} color={colors.orange}/>}
          // iconLeftError={<MailIcon w={22} h={18} color={colors.red}/>}
          iconRightSuccess={<CheckCircleIcon w={24} h={24}/>}
          iconRightError={<AlertIcon w={24} h={24}/>}
          validationOk={passwordsMatch || (hideEmpty && !value2)}
          errorMsg={!passwordsMatch? t('passwordsDoNotMatch'): undefined}
          onChangeText={(text) => {
            setValue2(text);
            setPasswordsMatch(value1 === text);
          }}
        />
      </View>
      <View style={s?.marginX4}>
        <TextInput
          value={value3} inputLabel={t('smsCode')}
          bgColor={colors.white} unactiveColor={colors.lightGray}
          // iconLeftDefault={<MailIcon w={22} h={18} color={colors.orange}/>}
          // iconLeftError={<MailIcon w={22} h={18} color={colors.red}/>}
          validationOk={validatePasswordOtpCode(value3) || (hideEmpty && !value3)} // ln = last name (backend)
          errorMsg={t('incorrectOtpCodeFormat')}
          onChangeText={(text) => setValue3(text)}
        />
      </View>
      <View style={[s?.largeButtonContainer, s?.marginX4]}>
        <Button
          onPress={() => handleSave()}
          title={t('save')}
          color={colors.orange}
          spinner={passwordRecoveryFetching}
        />
      </View>
      <View style={[s?.horizontalLarge, s?.widthCenter, s?.marginX4]}>
        <Text style={s?.blackText}>
          {t('haveNoAccount')}
        </Text>
        <TouchableOpacity style={s?.textedButtonPadding} onPress={() => dispatch(UserActions.changeStep('register'))}>
          <Text style={s?.orangeText}>
            {' ' + t('registration')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={s?.decorLine}></View>
      <Text style={s?.grayText}>
        {t('signInThrough')}
      </Text>
      <LoginPanel/>

    </View>
  );
};

const MRecoverPasswordForm = memo(RecoverPasswordForm);
export { MRecoverPasswordForm as RecoverPasswordForm };