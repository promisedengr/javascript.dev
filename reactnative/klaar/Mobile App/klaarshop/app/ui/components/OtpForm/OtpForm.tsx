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
import { Button } from "./../Button";
import { createStyle } from "./../../../screens/LoginScreen/LoginScreenStyles";
import { useThemeContext } from "~/ui/theme";
import { useTranslation } from "react-i18next";
import { colors } from "./../../theme/default/colors";
import { OtpCodeEntry } from "./../OtpCodeEntry/OtpCodeEntry";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "~/logic/user/UserSelectors";
import { UserActions } from "~/logic/user/UserRedux";
import { showError, showSuccess } from "~/logic/AlertService/AlertService";
import { fonts } from "~/ui/theme/default/fonts";

type OtpFormProps = {};

const OtpForm: React.FC<OtpFormProps> = (props) => {
  const {
    otp: { fetching: otpFetching, error: otpError, data: otpData },
    resendOtpCode: { data: resendOtpCodeData, error: resendOtpCodeError },
    register: { data: registerData },
    email: emailRedux,
  } = useSelector(userSelector);

  // if (otpData) {
  //    if (otpData.message === `OK`) {
  //       Navigation.push(navigationService.getCurrentScreenId(), {
  //          component: {
  //             name: 'MainScreen',
  //          },
  //       });
  //    }
  // }

  const registercode = [``, ``, ``, ``];

  const email = emailRedux || (registerData ? registerData.phone : null);

  const [values, setValues] = useState(registercode);

  const dispatch = useDispatch();

  const { s } = useThemeContext(createStyle);
  const { t } = useTranslation();

  const updateState = (index: number, digit: string) => {
    let newValues = values.map((item, itemIndex) => {
      if (itemIndex !== index) return item;
      return digit;
    });
    setValues(newValues);
  };

  useEffect(() => {
    if (!!otpError?.description) {
      showError(otpError.description);
    }
  }, [otpError]);

  useEffect(() => {
    if (!!resendOtpCodeData?.message) {
      showSuccess(t("auth.resendCodeAlert"));
    }
  }, [resendOtpCodeData]);

  useEffect(() => {
    if (!!resendOtpCodeError?.description) {
      showError(resendOtpCodeError.description);
    }
  }, [resendOtpCodeError]);

  const code = values.join("");
  const codeLength = code.length === 4;
  // console.log(code)
  // console.log('code', code.length)
  const handleSendOtp = () => {
    dispatch(UserActions.otpStartAuth());
    dispatch(
      UserActions.otp.request({
        otp: code,
        email,
      })
    );
  };

  const handleResendCode = () => {
    dispatch(UserActions.resendOtpCode.request({ email }));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={s?.containerCenter}
        behavior={Platform.OS === `ios` ? `padding` : `height`}
      >
        <View style={s?.itemBox}>
          <Text style={[s?.bigText, fonts.headerBig.medium]}>
            {t("auth.loginQuestion2")}
          </Text>
          <Text style={s?.descText}>
            {`${t("auth.otpDescription")}\n ${email}.`}
          </Text>
        </View>
        <OtpCodeEntry values={values} onChangeInput={updateState} />
        <View style={s?.itemBox}>
          <View style={s?.buttonWrapper}>
            <Button
              onPress={() => handleSendOtp()}
              title={t("buttons.send")}
              flatType
              disabled={!codeLength}
              color={colors.mainBlue}
              spinner={otpFetching}
            />
          </View>
          <View style={[s?.horizontalLarge, s?.widthCenter]}>
            <Text style={s?.lightGrayText}>
              {t(`auth.signUpNoCodeQuestion1`)}
            </Text>
            <TouchableOpacity
              onPress={handleResendCode}
              style={s?.textedButtonPadding}
            >
              <Text style={s?.blackText}>
                {t("auth.signUpNoCodeQuestion2")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const MOtpForm = memo(OtpForm);
export { MOtpForm as OtpForm };
