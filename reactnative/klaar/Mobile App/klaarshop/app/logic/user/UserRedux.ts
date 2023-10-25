import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import fp from 'lodash/fp';
import { addRestReducers, createRestActions, getDefaultRestState } from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import {
   UserLoginRestActions, UserRegisterRestActions, UserOtpRestActions,
   UserLogoutRestActions, UserPasswordRecoveryRestActions,
   UserResendOtpCodeRestActions, UserForgotPasswordRestActions,
   UserTokenRelevanceCheckRestActions, UserGoogleLoginRestActions,
   UserFacebookLoginRestActions,
   GetByIdUserRestActions,
   StartChattingRestActions,
} from './UserActions';
import { ResendOtpCodeResponse } from '~/types/api';
import { GetSelfProfileResponse } from '../profile/ProfileRedux';
import { RoutesT } from '~/screens/MainScreen/MainScreen';
import { action } from '@storybook/addon-actions';
import { CurrencyT } from '../product/ProductRedux';
import { storeCurrencyToAsyncStorage, storeLanguageToAsyncStorage } from '~/logic/asyncStorage/asyncStorageHelper';

type UserProfile = {
   fio: string;
   phone: string;
   photo: string;
};

type UserCode = {
   code?: string;
   email?: string
}

type UserLoginInfo = {
   userId: string;
   activated: boolean;
   userRole: string;
   access_token: string;
   token_type: string;
}

type UserGoogleLoginInfo = {
   message?: string;
   userId?: string;
   activated?: boolean;
   userRole?: string;
   access_token?: string;
   token_type?: string;
}

type UserFacebookLoginInfo = {
   message?: string;
   userId?: string;
   activated?: boolean;
   userRole?: string;
   access_token?: string;
   token_type?: string;
}

type UserForgotPasswordResponse = {
   message?: string;
   userId?: string;
   roflanCode?: string;
}

type TokenRelevanceCheckResponse = {
   message?: string;
   relevance?: boolean;
   activated?: boolean;
}

export type OtpPayload = { otp: string, email: string }
export type LoginPayload = { email: string; passw: string; storeToken: boolean };
export type GoogleLoginPayload = { googleToken: string };
export type FacebookLoginPayload = { facebookToken: string };
export type PasswordRecoveryPayload = { userId: string; code: string; passw: any };
export type ForgotPasswordPayload = { email: string };
export type TokenRelevanceCheckPayload = { token: string };
export type RegisterPayload = { fn: string, ln: string, email: string, passw: any };

export type GetByIdUserPayload = {
   userId: string
}

export type GetByIdUserResponse = GetSelfProfileResponse

export type StartChattingPayload = {
   userId: string
}

export type StartChattingResponse = {

}

export type TokenCheckResponse = {
   message: `Not authorized` | `OK`
}



const userLoginRestActions = createRestActions<
   typeof UserLoginRestActions,
   UserLoginInfo,
   LoginPayload
>(UserLoginRestActions);

const userGoogleLoginRestActions = createRestActions<
   typeof UserGoogleLoginRestActions,
   UserGoogleLoginInfo,
   GoogleLoginPayload
>(UserGoogleLoginRestActions);

const userFacebookLoginRestActions = createRestActions<
   typeof UserFacebookLoginRestActions,
   UserFacebookLoginInfo,
   FacebookLoginPayload
>(UserFacebookLoginRestActions);

const userLogoutRestActions = createRestActions<
   typeof UserLogoutRestActions,
   void
>(UserLogoutRestActions);

const userPasswordRecoveryRestActions = createRestActions<
   typeof UserPasswordRecoveryRestActions,
   void,
   PasswordRecoveryPayload
>(UserPasswordRecoveryRestActions);

const userTokenRelevanceCheckRestActions = createRestActions<
   typeof UserTokenRelevanceCheckRestActions,
   TokenRelevanceCheckResponse,
   TokenRelevanceCheckPayload
>(UserTokenRelevanceCheckRestActions);

const userForgotPasswordRestActions = createRestActions<
   typeof UserForgotPasswordRestActions,
   UserForgotPasswordResponse,
   ForgotPasswordPayload
>(UserForgotPasswordRestActions);

const userRegisterRestActions = createRestActions<
   typeof UserRegisterRestActions,
   UserCode,
   RegisterPayload
>(UserRegisterRestActions);

const userOtpRestActions = createRestActions<
   typeof UserOtpRestActions,
   void,
   OtpPayload
>(UserOtpRestActions);

const userResendOtpCodeRestActions = createRestActions<
   typeof UserResendOtpCodeRestActions,
   ResendOtpCodeResponse,
   { email: string }
>(UserResendOtpCodeRestActions);

const getByIdUserRestActions = createRestActions<
   typeof GetByIdUserRestActions,
   GetByIdUserResponse,
   GetByIdUserPayload
>(GetByIdUserRestActions);

const startChattingRestActions = createRestActions<
   typeof StartChattingRestActions,
   StartChattingResponse,
   StartChattingPayload
>(StartChattingRestActions);





// const userProfileRestActions = createRestActions<
//   typeof UserProfileRestActions,
//   UserProfile
// >(UserProfileRestActions);

export type CurrentLangT = `en` | `ru`

export type CurrentCurrencyT = CurrencyT

const UserActions = {
   login: userLoginRestActions,
   googleLogin: userGoogleLoginRestActions,
   facebookLogin: userFacebookLoginRestActions,
   register: userRegisterRestActions,
   otp: userOtpRestActions,
   resendOtpCode: userResendOtpCodeRestActions,
   // profile: userProfileRestActions,
   storeTokenToRedux: createAction<UserStringInfo>('user/storeTokenToRedux'),
   storeEmailToRedux: createAction<UserStringInfo>('user/storeEmailToRedux'),
   storeUserRoleToRedux: createAction<UserStringInfo>('user/storeUserRoleRedux'),
   changeStep: createAction<UserStep>('user/changeStep'),
   otpStartAuth: createAction('user/otpStartAuth'),
   otpStopAuth: createAction('user/otpStopAuth'),
   logout: userLogoutRestActions,
   forgotPassword: userForgotPasswordRestActions,
   passwordRecovery: userPasswordRecoveryRestActions,
   tokenRelevanceCheck: userTokenRelevanceCheckRestActions,
   getByIdUser: getByIdUserRestActions,
   startChatting: startChattingRestActions,
   mainScreenRoute: createAction<MainScreenRouteT>(`user/mainScreenRoute`),
   currentLang: createAction<CurrentLangT>(`user/currentLang`),
   currentCurrency: createAction<CurrentCurrencyT>(`user/currentCurrency`),
};

type MainScreenRouteT = RoutesT

type Otp = 'otp' | 'resendOtpCode';
type UserStep = 'login' | Otp | 'register' | `register1` | 'forgotPassword' | 'passwordRecovery';
type UserStringInfo = undefined | string;
type UserRestNodes = UserStep | 'profile' | 'logout' | 'tokenRelevanceCheck'
   | 'googleLogin' | 'facebookLogin' | `getByIdUser` | `startChatting` | `tokenCheck`;
type UserStore = {
   step: UserStep;
   userToken: UserStringInfo;
   email: UserStringInfo;
   userRole: UserStringInfo;
   otpAuthEnable: boolean;
   mainScreenRoute: MainScreenRouteT
   currentLang: CurrentLangT,
   currentCurrency: CurrentCurrencyT
};
type UserState = NodeRestStateType<UserRestNodes, UserStore>;

const initialRestState: UserState = {
   step: 'login',
   userToken: undefined,
   email: undefined,
   userRole: undefined,
   profile: getDefaultRestState<UserProfile>(),
   login: getDefaultRestState<UserLoginInfo>(),
   googleLogin: getDefaultRestState(),
   facebookLogin: getDefaultRestState(),
   register: getDefaultRestState<UserCode>(),
   otp: getDefaultRestState<OtpPayload>(),
   resendOtpCode: getDefaultRestState(),
   forgotPassword: getDefaultRestState(),
   passwordRecovery: getDefaultRestState(),
   tokenRelevanceCheck: getDefaultRestState(),
   otpAuthEnable: false,
   logout: getDefaultRestState(),
   getByIdUser: getDefaultRestState<GetSelfProfileResponse>(),
   startChatting: getDefaultRestState<StartChattingResponse>(),
   mainScreenRoute: `home`,
   currentLang: `en`,
   currentCurrency: `rub`,
   tokenCheck: getDefaultRestState<TokenCheckResponse>(),
};

type Builder = ActionReducerMapBuilder<UserState>;

const userReducer = createReducer(initialRestState, builder =>
   (fp.flow([
      addRestReducers(userLoginRestActions, 'login'),
      addRestReducers(userGoogleLoginRestActions, 'googleLogin'),
      addRestReducers(userFacebookLoginRestActions, 'facebookLogin'),
      addRestReducers(userRegisterRestActions, 'register'),
      addRestReducers(userOtpRestActions, 'otp'),
      addRestReducers(userLogoutRestActions, 'logout'),
      addRestReducers(userResendOtpCodeRestActions, 'resendOtpCode'),
      addRestReducers(userForgotPasswordRestActions, 'forgotPassword'),
      addRestReducers(userPasswordRecoveryRestActions, 'passwordRecovery'),
      addRestReducers(userTokenRelevanceCheckRestActions, 'tokenRelevanceCheck'),
      addRestReducers(getByIdUserRestActions, 'getByIdUser'),
      addRestReducers(startChattingRestActions, 'startChatting'),
      // addRestReducers(userProfileRestActions, 'profile'),
   ])(builder) as Builder)
      .addCase(UserActions.changeStep, (state, action) => {
         state.step = action.payload;
      })
      .addCase(UserActions.storeTokenToRedux, (state, action) => {
         state.userToken = action.payload;
      })
      .addCase(UserActions.storeEmailToRedux, (state, action) => {
         state.email = action.payload;
      })
      .addCase(UserActions.storeUserRoleToRedux, (state, action) => {
         state.userRole = action.payload;
      })
      .addCase(UserActions.otpStartAuth, state => {
         state.otpAuthEnable = true;
         state.otp.error = undefined;
      })
      .addCase(UserActions.otpStopAuth, state => {
         state.otpAuthEnable = false;
      })
      .addCase(UserActions.mainScreenRoute, (state, action) => {
         state.mainScreenRoute = action.payload
      })
      .addCase(UserActions.currentLang, (state, action) => {
         state.currentLang = action.payload;
         storeLanguageToAsyncStorage(action.payload);
      })
      .addCase(UserActions.currentCurrency, (state, action) => {
         state.currentCurrency = action.payload;
         storeCurrencyToAsyncStorage(action.payload);
      })

);

export { userReducer, UserActions };

