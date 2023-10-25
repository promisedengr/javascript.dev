import _ from "lodash";
import * as React from "react";
import { memo, useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  BackHandler
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { TextInput } from "./../TextInput";
import { Button } from "./../Button";
import { createStyle } from "./../../../screens/LoginScreen/LoginScreenStyles";
import { useThemeContext } from "~/ui/theme";
import { useTranslation } from "react-i18next";
import { colors } from "./../../theme/default/colors";
import { UserActions } from "~/logic/user/UserRedux";
import { userSelector } from "~/logic/user/UserSelectors";
import { showError } from "~/logic/AlertService/AlertService";
import {
  validateName,
  validatePassword,
  validateEmail,
} from "~/logic/user/ValidationHelper";
import { fonts } from "~/ui/theme/default/fonts";
import { useInput } from "~/Hooks/useInputs";
import { TextField } from "react-native-material-textfield";
import { Checkbox } from "../Checkbox";
import { navigationService } from "~/screens/NavigationService";
import { Navigation } from "react-native-navigation";
import { Header } from '~/ui/components/Header';
import CheckCircleIcon from "./../TextInput/assets/checkCircle";
import AlertIcon from "./../TextInput/assets/alert";

const RegisterForm: React.FC = () => {
  const email = useInput("");
  const password = useInput("");
  const password1 = useInput("");
  const name = useInput("");
  const surName = useInput("");
  //const phone = useInput('');

  const emailValue = email.value;
  const passwordValue = password.value;
  const password1Value = password1.value;
  const nameValue = name.value;
  const surNameValue = surName.value;
  //const phoneValue = phone.value;

  const [checkbox, setcheckbox] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [hideEmpty, setHideEmpty] = useState(true);

  const {
    register: {
      fetching: registerFetching,
      error: registerError,
      data: registerData,
    },
    step,
  } = useSelector(userSelector);
  const dispatch = useDispatch();

  if (registerData) {
    dispatch(UserActions.changeStep("otp"));
  }

  const registerFirst = step === "register";
  const registerSecond = step === "register1";

  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  useEffect(() => {
    if (registerError?.description) {
      showError(registerError.description);
    }
  }, [registerError]);

  useEffect(() => {
    if (!hideEmpty) {
      setHideEmpty(true);
    }
    if (registerSecond) {
      refName.current?.clear();
      refSurName.current?.clear();
    }
  }, [step]);

  const refEmail = useRef<TextField>(null);
  const refPass = useRef<TextField>(null);
  const refName = useRef<TextField>(null);
  const refSurName = useRef<TextField>(null);

  const handleRegister1 = () => {
    if (
      validateEmail(emailValue) &&
      validatePassword(passwordValue) &&
      passwordsMatch
    ) {
      // console.log('validareSuccess')
      dispatch(UserActions.changeStep("register1"));

      //post email and password and store to redux, if response succes chnage step to register1
      //if response 200 handleClean inputs
      /* dispatch(UserActions.register.request({
           ln: value2, 
           fn: value1,
           phone: value3,
           passw: { pass },
         })) */
    } else {
      setHideEmpty(false);
    }
  };

  const handleRegister2 = () => {
    if (validateName(nameValue) && validateName(surNameValue)) {
      // console.log('validareSuccess')
      //post all register data //get email and password from redux store
      dispatch(
        UserActions.register.request({
          ln: nameValue,
          fn: surNameValue,
          email: emailValue,
          passw: { pass: passwordValue },
        })
      );
    } else {
      setHideEmpty(false);
    }
  };

  const password1Change = (text: string) => {
    if (registerFirst) {
      password1.handleChange(text);
      setPasswordsMatch(text === passwordValue);
    }
  };

  const handleChangeEmail = (text: string) => {
    if (registerFirst) {
      email.handleChange(text);
    }
  };

  const handleChangePass = (text: string) => {
    if (registerFirst) {
      password.handleChange(text);
      setPasswordsMatch(text === password1Value);
    }
  };

  const onTermsPress = useCallback(
    (props?: { headerTitle?: string; uri?: string }) => {
      Navigation.push(navigationService.getCurrentScreenId(), {
        component: {
          passProps: props,
          name: "TermsOfUseScreen",
        },
      });
    },
    []
  );

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePressBack = () => {
    if (registerFirst)
      dispatch(UserActions.changeStep("login"));
    else
      dispatch(UserActions.changeStep("register"));
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

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === `ios` ? `padding` : `height`}
        style={s?.containerCenter}
        keyboardVerticalOffset={100}
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
        <ScrollView>
          <View style={s?.itemBox}>
            <View>
              <Text style={[s?.bigText, fonts.headerBig.medium]}>
                {t("auth.signUpTitle")}
              </Text>
              <Text style={s?.descText}>{t("auth.signUpDescription1")}</Text>
            </View>
            {registerFirst ? (
              <>
                <TextInput
                  textContentType={`emailAddress`}
                  keyboardType={`email-address`}
                  autoCapitalize={"none"}
                  ref={refEmail}
                  value={emailValue}
                  inputLabel={t("inputs.email")}
                  inputLine
                  bottomLine
                  iconRightSuccess={
                    !emailValue ? [] : <CheckCircleIcon w={20} h={20} />
                  }
                  iconRightError={<AlertIcon w={24} h={24} />}
                  validationOk={
                    (validateEmail(emailValue) || !emailValue) && hideEmpty
                  }
                  errorMsg={t("errors.emailFormat")}
                  onChangeText={handleChangeEmail}
                />
                <TextInput
                  textContentType={"oneTimeCode"}
                  ref={refPass}
                  value={passwordValue}
                  secureTextEntry={registerFirst}
                  inputLine
                  bottomLine
                  inputLabel={t("inputs.password")}
                  iconRightSuccess={
                    !passwordValue ? [] : <CheckCircleIcon w={20} h={20} />
                  }
                  iconRightError={<AlertIcon w={24} h={24} />}
                  validationOk={
                    (validatePassword(passwordValue) || !passwordValue) &&
                    hideEmpty
                  }
                  errorMsg={t("errors.passFormat")}
                  onChangeText={handleChangePass}
                />
              </>
            ) : (
              <>
                <TextInput
                  ref={refName}
                  value={name.value}
                  inputLabel={t("inputs.name")}
                  inputLine
                  bottomLine
                  iconRightSuccess={
                    !nameValue ? [] : <CheckCircleIcon w={20} h={20} />
                  }
                  iconRightError={<AlertIcon w={24} h={24} />}
                  validationOk={
                    (validateName(nameValue) || !nameValue) && hideEmpty
                  }
                  errorMsg={t("errors.nameFormat")}
                  onChangeText={(text) =>
                    name.handleChange(capitalizeFirstLetter(text))
                  }
                  autoCapitalize={"words"}
                />
                <TextInput
                  ref={refSurName}
                  value={surName.value}
                  inputLine
                  bottomLine
                  inputLabel={t("inputs.surname")}
                  iconRightSuccess={
                    !surNameValue ? [] : <CheckCircleIcon w={20} h={20} />
                  }
                  iconRightError={<AlertIcon w={24} h={24} />}
                  validationOk={
                    (validateName(surNameValue) || !surNameValue) && hideEmpty
                  }
                  errorMsg={t("errors.surnameFormat")}
                  onChangeText={(text) =>
                    surName.handleChange(capitalizeFirstLetter(text))
                  }
                  autoCapitalize={"words"}
                />
              </>
            )}
            {registerFirst ? (
              <TextInput
                secureTextEntry={registerFirst}
                value={password1Value}
                inputLine
                bottomLine
                inputLabel={t("inputs.repeatPassword")}
                iconRightSuccess={
                  !password1Value ? [] : <CheckCircleIcon w={20} h={20} />
                }
                iconRightError={<AlertIcon w={24} h={24} />}
                validationOk={(passwordsMatch || !password1Value) && hideEmpty}
                errorMsg={t("errors.passwordsDsntMatch")}
                onChangeText={password1Change}
                textContentType={"oneTimeCode"}
              />
            ) : null}
            {registerFirst && (
              <View style={s?.checkboxWrapper}>
                <Checkbox
                  size={20}
                  isChecked={checkbox}
                  onPress={() => setcheckbox(!checkbox)}
                />
                <Text style={[s?.termsText, s?.gray7Text]}>
                  {t(`auth.termsText1`)}
                </Text>
                <Text
                  style={[s?.termsText, s?.mainBueText]}
                  onPress={() =>
                    onTermsPress({ headerTitle: t("buttons.termsNConditions") })
                  }
                >
                  {t("auth.termsText2")}
                </Text>
                <Text style={[s?.termsText, s?.gray7Text]}>
                  {t(`auth.termsText3`)}
                </Text>
                <Text
                  style={[s?.termsText, s?.mainBueText]}
                  onPress={() =>
                    onTermsPress({ headerTitle: t("buttons.privacyPolicy") })
                  }
                >
                  {t(`auth.termsText4`)}
                </Text>
              </View>
            )}
          </View>

          <View style={s?.itemBox}>
            <View style={s?.buttonWrapper}>
              <Button
                onPress={registerFirst ? handleRegister1 : handleRegister2}
                title={t("buttons.next")}
                flatType
                color={colors.mainBlue}
                disabled={
                  !(registerFirst
                    ? passwordsMatch &&
                      validateEmail(emailValue) &&
                      emailValue &&
                      validatePassword(passwordValue) &&
                      passwordValue &&
                      hideEmpty &&
                      checkbox
                    : validateName(nameValue) &&
                      nameValue &&
                      validateName(surNameValue) &&
                      surNameValue &&
                      hideEmpty)
                }
                spinner={registerFetching}
              />
            </View>

            <View style={[s?.horizontalLarge, s?.widthCenter]}>
              <Text style={s?.lightGrayText}>{t("auth.signUpQuestion1")}</Text>
              <TouchableOpacity
                onPress={() => dispatch(UserActions.changeStep("login"))}
                style={s?.textedButtonPadding}
              >
                <Text style={s?.blackText}>{t("auth.signUpQuestion2")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const MRegisterForm = memo(RegisterForm);
export { MRegisterForm as RegisterForm };
