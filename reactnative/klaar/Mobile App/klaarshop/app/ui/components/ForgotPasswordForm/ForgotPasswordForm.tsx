import _ from "lodash";
import * as React from "react";
import { memo, useState, useEffect, useRef } from "react";
import {
  View,
  BackHandler,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "./../TextInput";
import { Button } from "./../Button";
import { createStyle } from "./../../../screens/LoginScreen/LoginScreenStyles";
import { useThemeContext } from "~/ui/theme";
import { useTranslation } from "react-i18next";
import { colors } from "./../../theme/default/colors";
import { UserActions } from "~/logic/user/UserRedux";
import { showError } from "~/logic/AlertService/AlertService";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "~/logic/user/UserSelectors";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "~/logic/user/ValidationHelper";
import { fonts } from "~/ui/theme/default/fonts";
import CheckCircleIcon from "../TextInput/assets/checkCircle";
import { useInput } from "~/Hooks/useInputs";
import AlertIcon from "../TextInput/assets/alert";
import { OtpCodeEntry } from "../OtpCodeEntry";
import { Navigation } from "react-native-navigation";
import { navigationService } from "~/screens/NavigationService";
import { TextField } from "react-native-material-textfield";
import { Header } from '~/ui/components/Header';

type ForgotPasswordFormProps = {};

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (props) => {
  //const [value1, setValue1] = useState('');
  const email = useInput("");
  const password = useInput("");
  const password1 = useInput("");

  const emailValue = email.value;
  const passwordValue = password.value;
  const password1Value = password1.value;

  const {
    forgotPassword: {
      fetching: forgotPasswordFetching,
      error: forgotPasswordError,
      data: forgotPasswordData,
    },
    passwordRecovery: { 
      data: passwordRecoveryData,
      error: passwordRecoveryError
    },
    step,
  } = useSelector(userSelector);

  // if (passwordRecoveryData) {
  //    if (passwordRecoveryData.message === `OK`) {
  //       Navigation.push(navigationService.getCurrentScreenId(), {
  //          component: {
  //             name: 'MainScreen',
  //          },
  //       });
  //    }
  // }

  const emptyValues = ["", "", "", ""];

  const [values, setValues] = useState(emptyValues);
  const [isOtp, setIsOtp] = useState(false);

  let emailPassRef = useRef<TextField>(null);

  const updateState = (index: number, digit: string) => {
    let newValues = values.map((item: any, itemIndex: number) => {
      if (itemIndex !== index) 
        return item;
      return digit;
    });
    setValues(newValues);
  };

  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [hideErrors, setHideErrors] = useState(true); // Errors wont be visible until first click "send"

  //console.log(`Step`, step)
  const forgotPassword = step === "forgotPassword";

  useEffect(() => {
    if (!forgotPassword) {
      emailPassRef.current?.clear();
      emailPassRef.current?.forceUpdate();
    }
  }, [step]);

  const dispatch = useDispatch();

  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  useEffect(() => {
    if (forgotPasswordError) {
      setHideErrors(false);
    }
  }, [forgotPasswordError]);

  useEffect(() => {
    if (passwordRecoveryError?.description) {
      showError(passwordRecoveryError.description);
      setValues(emptyValues);
    }
  }, [passwordRecoveryError]);

  const handleSend = () => {
    if (step === `passwordRecovery`) {
      if (validatePassword(passwordValue) && passwordValue === password1Value) {
        if (isOtp) {
          dispatch(
            UserActions.passwordRecovery.request({
              userId: forgotPasswordData.userId,
              code: values.join(``),
              passw: { pass: passwordValue },
            })
          );
        } else {
          setIsOtp(true);
        }
      } else {
        setHideErrors(false);
      }
    } else {
      // if (validateEmail(emailValue)) {

      dispatch(
        UserActions.forgotPassword.request({
          email: emailValue,
        })
      );
      // } else {
      //    setHideErrors(false);
      // }
    }
  };

  const onBottomTextPress = () => {
    if (isOtp) {
      dispatch(
        UserActions.forgotPassword.request({
          email: emailValue,
        })
      );
    } else {
      dispatch(UserActions.changeStep("login"));
    }
  };

  const handlePressBack = () => {
    if (isOtp)
      setIsOtp(false);
    else
      dispatch(UserActions.changeStep("login"));
  }

  useEffect(() => {
    const backAction = () => {
      handlePressBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onEmailChange = (text: string) => {
    if (!hideErrors) {
      setHideErrors(true);
    }
    email.handleChange(text);
  };

  const onPasswordChange = (text: string) => {
    if (!hideErrors) {
      setHideErrors(true);
    }
    setPasswordsMatch(text === password1Value);
    password.handleChange(text);
  };

  const onPassword1Change = (text: string) => {
    if (!hideErrors) {
      setHideErrors(true);
    }
    setPasswordsMatch(text === passwordValue);
    password1.handleChange(text);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === `ios` ? `padding` : `height`}
        style={s?.containerCenter}
      >
        <View style={s?.headerAbsolute}>
          <Header
            onPressBack={handlePressBack}
            bgColor={colors.white}
            headerTitle={''}
            headerLeft={"arrow"}
            borderBottomWidth={0}
          />
        </View>
        <View style={[s?.itemBox]}>
          <Text style={[s?.bigText, fonts.headerBig.medium]}>
            {!isOtp ? t("auth.resetPassTitle1") : t("auth.resetPassTitle1")}
          </Text>
          <Text
            style={[s?.descText, { marginBottom: forgotPassword ? 100 : 28 }]}
          >
            {!isOtp
              ? t(
                  forgotPassword
                    ? t(`auth.resetPassDescription1`)
                    : t("auth.resetPassDescription2")
                )
              : t("auth.resetPassDescription3")}
          </Text>
          {!isOtp ? (
            <>
              <TextInput
                ref={emailPassRef}
                textContentType={forgotPassword ? `emailAddress` : `password`}
                //keyboardType={forgotPassword ? `email-address` : `default`}
                value={forgotPassword ? emailValue : passwordValue}
                secureTextEntry={!forgotPassword}
                inputLabel={
                  forgotPassword ? t("inputs.email") : t("inputs.password")
                }
                bottomLine
                inputLine
                autoCapitalize={forgotPassword ? "none" : `words`}
                iconRightSuccess={
                  forgotPassword ? (
                    !!emailValue && hideErrors ? (
                      <CheckCircleIcon w={24} h={24} />
                    ) : (
                      []
                    )
                  ) : validatePassword(passwordValue) &&
                    !!passwordValue &&
                    hideErrors ? (
                    <CheckCircleIcon w={24} h={24} />
                  ) : (
                    []
                  )
                }
                iconRightError={
                  forgotPassword ? (
                    !emailValue || !hideErrors ? (
                      <AlertIcon w={24} h={24} />
                    ) : (
                      []
                    )
                  ) : !validatePassword(passwordValue) ||
                    !!passwordValue ||
                    !hideErrors ? (
                    <AlertIcon w={24} h={24} />
                  ) : (
                    []
                  )
                }
                validationOk={
                  (forgotPassword
                    ? true
                    : validatePassword(passwordValue) || !passwordValue) &&
                  hideErrors
                }
                errorMsg={
                  forgotPassword
                    ? hideErrors
                      ? t("errors.emailFormat")
                      : forgotPasswordError?.description
                    : t("errors.passFormat")
                }
                onChangeText={forgotPassword ? onEmailChange : onPasswordChange}
              />
              {!forgotPassword && (
                <TextInput
                  textContentType={`password`}
                  value={password1Value}
                  inputLine
                  bottomLine
                  secureTextEntry={true}
                  inputLabel={t("inputs.repeatPassword")}
                  iconRightSuccess={
                    !!password1Value && passwordsMatch && hideErrors ? (
                      <CheckCircleIcon w={24} h={24} />
                    ) : (
                      []
                    )
                  }
                  iconRightError={
                    passwordsMatch && hideErrors ? (
                      []
                    ) : (
                      <AlertIcon w={24} h={24} />
                    )
                  }
                  validationOk={
                    (passwordsMatch || !password1Value) && hideErrors
                  }
                  errorMsg={
                    hideErrors
                      ? t("errors.passwordsDsntMatch")
                      : forgotPasswordError?.description
                  }
                  onChangeText={onPassword1Change}
                />
              )}
            </>
          ) : (
            <OtpCodeEntry values={values} onChangeInput={updateState} keyboardType={'default'}/>
          )}
        </View>

        <View style={s?.itemBox}>
          <View style={s?.buttonWrapper}>
            <Button
              disabled={
                !(forgotPassword
                  ? emailValue
                  : (validatePassword(passwordValue) || !passwordValue) &&
                    passwordsMatch &&
                    hideErrors)
              }
              onPress={handleSend}
              title={t("buttons.send")}
              flatType
              color={colors.mainBlue}
              spinner={forgotPasswordFetching}
            />
          </View>
          <View style={[s?.horizontalLarge, s?.widthCenter]}>
            <Text style={s?.lightGrayText}>
              {isOtp ? t(`auth.resetPassQuestion1`) : t("auth.signUpQuestion1")}
            </Text>
            <TouchableOpacity
              style={s?.textedButtonPadding}
              onPress={onBottomTextPress}
            >
              <Text style={s?.blackText}>
                {isOtp
                  ? t(`auth.resetPassQuestion2`)
                  : t("auth.signUpQuestion2")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const MForgotPasswordForm = memo(ForgotPasswordForm);
export { MForgotPasswordForm as ForgotPasswordForm };
