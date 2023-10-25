import { restActionCreatorHelper } from "~/store/restHelper";


const userRestActionsHelper = restActionCreatorHelper(`user`)

export const GetByIdUserRestActions = userRestActionsHelper(`getByIdUser`)

export const StartChattingRestActions = userRestActionsHelper(`startChatting`)

export const UserLoginRestActions = {
  request: 'user/login_request',
  success: 'user/login_success',
  failure: 'user/login_failure',
  needUpdate: 'user/login_needUpdate',
} as const;

export const UserGoogleLoginRestActions = {
  request: 'user/googleLogin_request',
  success: 'user/googleLogin_success',
  failure: 'user/googleLogin_failure',
  needUpdate: 'user/googleLogin_needUpdate',
} as const;

export const UserFacebookLoginRestActions = {
  request: 'user/facebookLogin_request',
  success: 'user/facebookLogin_success',
  failure: 'user/facebookLogin_failure',
  needUpdate: 'user/facebookLogin_needUpdate',
} as const;

export const UserLogoutRestActions = {
  request: 'user/logout_request',
  success: 'user/logout_success',
  failure: 'user/logout_failure',
  needUpdate: 'user/logout_needUpdate',
} as const;

export const UserPasswordRecoveryRestActions = {
  request: 'user/passwordRecovery_request',
  success: 'user/passwordRecovery_success',
  failure: 'user/passwordRecovery_failure',
  needUpdate: 'user/passwordRecovery_needUpdate',
} as const;

export const UserTokenRelevanceCheckRestActions = {
  request: 'user/tokenRelevanceCheck_request',
  success: 'user/tokenRelevanceCheck_success',
  failure: 'user/tokenRelevanceCheck_failure',
  needUpdate: 'user/tokenRelevanceCheck_needUpdate',
} as const;

export const UserForgotPasswordRestActions = {
  request: 'user/forgotPassword_request',
  success: 'user/forgotPassword_success',
  failure: 'user/forgotPassword_failure',
  needUpdate: 'user/forgotPassword_needUpdate',
} as const;

export const UserRegisterRestActions = {
  request: 'user/register_request',
  success: 'user/register_success',
  failure: 'user/register_failure',
  needUpdate: 'user/register_needUpdate',
} as const;

export const UserOtpRestActions = {
  request: 'user/otp_request',
  success: 'user/otp_success',
  failure: 'user/otp_failure',
  needUpdate: 'user/otp_needUpdate',
} as const;

export const UserResendOtpCodeRestActions = {
  request: 'user/resendOtpCode_request',
  success: 'user/resendOtpCode_success',
  failure: 'user/resendOtpCode_failure',
  needUpdate: 'user/resendOtpCode_needUpdate',
} as const;

// export const UserProfileRestActions = {
//   request: 'user/profile_request',
//   success: 'user/profile_success',
//   failure: 'user/profile_failure',
//   needUpdate: 'user/profile_needUpdate',
// } as const;
