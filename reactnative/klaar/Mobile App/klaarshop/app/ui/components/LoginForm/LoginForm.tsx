import _ from "lodash";
import * as React from "react";
import { memo, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "~/logic/user/UserSelectors";
import { TextInput } from "./../TextInput";
import { Button } from "./../Button";
import { createStyle } from "./../../../screens/LoginScreen/LoginScreenStyles";
import { useThemeContext } from "~/ui/theme";
import { useTranslation } from "react-i18next";
import { colors } from "./../../theme/default/colors";
import { UserActions } from "~/logic/user/UserRedux";
import { showError } from "~/logic/AlertService/AlertService";
import {
  validatePhone,
  validatePassword,
  validateEmail,
} from "~/logic/user/ValidationHelper";
import { fonts } from "~/ui/theme/default/fonts";
import { useInput } from "~/Hooks/useInputs";
import { Navigation } from "react-native-navigation";
import { navigationService } from "~/screens/NavigationService";

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const dispatch = useDispatch();

  const [hideErrors, setHideErrors] = useState(true); // Errors wont be visible until first click "signIn"
  const {
    login: { fetching: loginFetching, error: loginError, data },

    email: emailRedux,
  } = useSelector(userSelector);

  if (data && !data.activated && emailRedux) {
    dispatch(UserActions.changeStep(`otp`));
    dispatch(UserActions.resendOtpCode.request({ email: emailRedux }));
  }

  const email = useInput("");
  const password = useInput("");

  const emailValue = email.value;
  const passwordValue = password.value;

  const [checked1, setChecked1] = useState(true);

  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  // useEffect(
  //    () => {
  //       if (!loginError?.fields && !!loginError?.description) {
  //          showError(loginError.description);
  //       }
  //    }, [loginError]
  // );

  const handleSignIn = () => {
    Keyboard.dismiss();
    if (validateEmail(emailValue) && validatePassword(passwordValue)) {
      dispatch(
        UserActions.login.request({
          email: emailValue,
          passw: passwordValue,
          storeToken: checked1,
        })
      );
    } else {
      setHideErrors(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === `ios` ? `padding` : `height`}
        style={s?.containerCenter}
      >
        <View style={s?.itemBox}>
          <Text style={[s?.bigText, fonts.headerBig.medium]}>
            {t("auth.loginTitle")}
          </Text>
          <Text style={[s?.descText]}>{t("auth.loginDescription")}</Text>
          <TextInput
            textContentType={`emailAddress`}
            keyboardType={`email-address`}
            value={emailValue}
            inputLabel={t("inputs.email")}
            bgColor={colors.white} //unactiveColor={colors.lightGray}
            validationOk={
              (validateEmail(emailValue) || !emailValue) && hideErrors
            }
            errorMsg={t("errors.emailFormat")}
            inputLine
            bottomLine
            autoCapitalize={"none"}
            onChangeText={email.handleChange}
          />

          <TextInput
            textContentType={`password`}
            value={passwordValue}
            inputLabel={t("inputs.password")}
            bgColor={colors.white} //unactiveColor={colors.lightGray}
            secureTextEntry
            inputLine
            bottomLine
            validationOk={
              (validatePassword(passwordValue) || !passwordValue) && hideErrors
            }
            errorMsg={t("errors.passFormat")}
            onChangeText={password.handleChange}
            iconRightSuccess={
              <TouchableOpacity
                style={{ zIndex: 1 }}
                onPress={() =>
                  dispatch(UserActions.changeStep("forgotPassword"))
                }
              >
                <Text style={s?.forgotPassword}>
                  {t("auth.forgotPassButton")}
                </Text>
              </TouchableOpacity>
            }
          />
        </View>
        {/*
         */}
        <View style={s?.itemBox}>
          <View style={s?.buttonWrapper}>
            <Button
              disabled={
                !(
                  passwordValue &&
                  emailValue &&
                  validatePassword(passwordValue) &&
                  validateEmail(emailValue)
                )
              }
              onPress={() => handleSignIn()}
              title={t("buttons.login")}
              flatType
              color={colors.mainBlue}
              spinner={loginFetching}
            />
          </View>
          <View style={[s?.horizontalLarge, s?.widthCenter]}>
            <Text style={s?.lightGrayText}>{t("auth.loginQuestion1")}</Text>
            <TouchableOpacity
              onPress={() => dispatch(UserActions.changeStep("register"))}
              style={s?.textedButtonPadding}
            >
              <Text style={s?.blackText}>{t("auth.loginQuestion2")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const MLoginForm = memo(LoginForm);
export { MLoginForm as LoginForm };
