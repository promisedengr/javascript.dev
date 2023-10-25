import _ from 'lodash';
import * as React from 'react';
import { memo } from 'react';
import { Header } from './../../ui/components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '~/logic/user/UserRedux';
import { userSelector } from '~/logic/user/UserSelectors';
import { createStyle } from './LoginScreenStyles';
import { useThemeContext } from '~/ui/theme';
import { LoginForm } from './../../ui/components/LoginForm/LoginForm';
import { RegisterForm } from './../../ui/components/RegisterForm/RegisterForm';
import { ForgotPasswordForm } from './../../ui/components/ForgotPasswordForm/ForgotPasswordForm';
import { OtpForm } from './../../ui/components/OtpForm/OtpForm';
import { previousStep } from './../../logic/user/NavigationHelper';
import { SafeAreaView } from 'react-native';

type LoginScreenProps = {
   isLogout: boolean
}

const LoginScreen: React.FC<LoginScreenProps> = () => {
   const { step } = useSelector(userSelector);
   const dispatch = useDispatch();
   //const step = `register` 

   const { s } = useThemeContext(createStyle);

   //const [loadingToken, setLoadingToken] = useState(true)

   const handlePressBack = () => {
      //let prevStep = previousStep(step);
      dispatch(UserActions.login.success(undefined as any))
      dispatch(UserActions.changeStep(`login`));
   }

   // useEffect(() => {
   //    getTokenFromAsyncStorage().then(token => {
   //       try {
   //          if (token && !isLogout) {
   //             // console.log(`token:`,token)
   //             dispatch(UserActions.storeTokenToRedux(token))
   //             Navigation.setStackRoot(navigationService.getCurrentScreenId(), {
   //                component: {
   //                   name: 'MainScreen',
   //                },
   //             });
   //             setLoadingToken(false)
   //          } else {
   //             setLoadingToken(false)
   //          }
   //       }
   //       catch (e) {
   //          console.error(`token`, e)
   //       }
   //    })
   // }, [])

   // if (loadingToken) {
   //    return <Preloader />
   // }

   return (
      <SafeAreaView style={s?.container}>
         {step === `otp` && <Header
            headerLeft={'arrow'}
            onPressBack={handlePressBack}
            headerTitleFontSize={17}
            //headerTitle={currentHeaderTitle(step)}
            borderBottomWidth={0}
         />}
         {step === 'login' && <LoginForm />}
         {(step === 'register' || step === 'register1') && <RegisterForm />}
         {(step === 'forgotPassword' || step === 'passwordRecovery') && <ForgotPasswordForm />}
         {/* {step === 'passwordRecovery' && <RecoverPasswordForm />} */}
         {step === 'otp' && <OtpForm />}
      </SafeAreaView>
   );
};

const MLoginScreen = memo(LoginScreen);
export { MLoginScreen as LoginScreen };

