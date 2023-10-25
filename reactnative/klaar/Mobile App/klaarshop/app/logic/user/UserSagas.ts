import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import i18n from 'i18next';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import { call, delay, put, select, takeLatest, take } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { showError, showSuccess } from '~/logic/AlertService/AlertService';
import { GetByIdUserResponse, StartChattingResponse, TokenCheckResponse, UserActions } from '~/logic/user/UserRedux';
import { navigationService } from '~/screens/NavigationService';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import {
   LoginResponse, RegisterResponse, OtpVerifyResponse,
   ForgotPasswordResponse, PasswordRecoveryResponse,
   ResendOtpCodeResponse, TokenRelevanceCheckResponse,
   GoogleLoginResponse, FacebookLoginResponse
} from '~/types/api';
import { ChatActions } from '../chats/ChatsRedux';
import { store } from './../../store/store';
import { deleteTokenFromAsyncStorage, deleteUserIdFromAsyncStorage, storeTokenToAsyncStorage, storeUserIdToAsyncStorage } from './../asyncStorage/asyncStorageHelper';
import { userSelector } from './UserSelectors';

function* loginRequest(action: Action) {
   if (UserActions.login.request.match(action)) {
      try {
         let { email, storeToken, passw: pass } = action.payload;
         //let pass = action.payload.password
         //phone = '+' + phone.replace(/[^0-9]/g, '');
         const error = {};

         const loginResponse: ApiResponse<LoginResponse> = yield call(
            api.loginPost,
            {
               email,
               passw: { pass }
            }
         );
         //http://31.131.28.49:5000/api/auth/register
         if (loginResponse.data?.access_token) {
            const responseData = loginResponse.data
            yield put(
               UserActions.login.success({
                  userId: responseData.userId,
                  activated: responseData.activated,
                  userRole: responseData.userRole,
                  access_token: responseData.access_token,
                  token_type: responseData.token_type
               })
            );
            if (storeToken === true && responseData.activated) {
               storeTokenToAsyncStorage(responseData.access_token);
               //storeUserIdToAsyncStorage(responseData.userId);
            }
            store.dispatch(UserActions.storeTokenToRedux(responseData.access_token));
            store.dispatch(UserActions.storeEmailToRedux(email));
            store.dispatch(UserActions.storeUserRoleToRedux(responseData.userRole));
            if (loginResponse.ok) {
               if (loginResponse.data?.activated) {
                  yield call({ context: Navigation, fn: Navigation.setStackRoot }, navigationService.getCurrentScreenId(), {
                     component: {
                        name: 'MainScreen',
                        passProps: {},
                        options: {
                           animations: {
                              push: {
                                 enabled: true
                              }
                           }
                        }
                     },
                  })
               }
               else {
                  console.log('User not activated, initiating Otp')
                  yield put(UserActions.changeStep('otp'));
               }
            }
         } else {
            _.set(error, 'description', loginResponse?.data?.message);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         showError(error.description);
         yield put(UserActions.login.failure(extractError(error)));
      }
   }
}

// function* googleLoginRequest(action: Action) {
//    if (UserActions.googleLogin.request.match(action)) {
//       try {
//          const error = {};
//          let { googleToken } = action.payload;
//          const googleLoginResponse: ApiResponse<GoogleLoginResponse> = yield call(
//             api.googleLoginPost,
//             {
//                access_token: googleToken
//             }
//          );
//          if (googleLoginResponse.ok) {
//             const responseData = googleLoginResponse.data;
//             yield put(
//                UserActions.googleLogin.success({
//                   userId: responseData?.userId,
//                   activated: responseData?.activated,
//                   userRole: responseData?.userRole,
//                   access_token: responseData?.access_token,
//                   token_type: responseData?.token_type
//                })
//             );
//             if (!!responseData?.access_token && !!responseData?.userId) {
//                storeTokenToAsyncStorage(responseData.access_token);
//                storeUserIdToAsyncStorage(responseData.userId);
//                store.dispatch(UserActions.storeTokenToRedux(responseData.access_token));
//                //store.dispatch(UserActions.storeUserIdToRedux(responseData.userId));
//                store.dispatch(UserActions.storeUserRoleToRedux(responseData.userRole));
//             }
//          } else {
//             _.set(error, 'description', googleLoginResponse.data?.message);
//             _.set(error, 'code', googleLoginResponse.status);
//             throw new RequestError(error as BaseErrorType);
//          }
//       } catch (error) {
//          yield put(UserActions.googleLogin.failure(extractError(error)));
//       }
//    }
// }

// function* facebookLoginRequest(action: Action) {
//    if (UserActions.facebookLogin.request.match(action)) {
//       try {
//          const error = {};
//          let { facebookToken } = action.payload;
//          const facebookLoginResponse: ApiResponse<FacebookLoginResponse> = yield call(
//             api.facebookLoginPost,
//             {
//                access_token: facebookToken
//             }
//          );
//          if (facebookLoginResponse.ok) {
//             const responseData = facebookLoginResponse.data;
//             yield put(
//                UserActions.facebookLogin.success({
//                   userId: responseData?.userId,
//                   activated: responseData?.activated,
//                   userRole: responseData?.userRole,
//                   access_token: responseData?.access_token,
//                   token_type: responseData?.token_type
//                })
//             );
//             if (!!responseData?.access_token && !!responseData?.userId) {
//                storeTokenToAsyncStorage(responseData.access_token);
//                storeUserIdToAsyncStorage(responseData.userId);
//                store.dispatch(UserActions.storeTokenToRedux(responseData.access_token));
//                //store.dispatch(UserActions.storeUserIdToRedux(responseData.userId));
//                store.dispatch(UserActions.storeUserRoleToRedux(responseData.userRole));
//             }
//          } else {
//             _.set(error, 'description', facebookLoginResponse.data?.message);
//             _.set(error, 'code', facebookLoginResponse.status);
//             throw new RequestError(error as BaseErrorType);
//          }
//       } catch (error) {
//          yield put(UserActions.facebookLogin.failure(extractError(error)));
//       }
//    }
// }

function* registerRequest(action: Action) {

   if (UserActions.register.request.match(action)) {
      try {
         let { fn, ln, email, passw } = action.payload;
         //phone = '+' + phone.replace(/[^0-9]/g, '');
         const error = {};

         const registerResponse: ApiResponse<RegisterResponse> = yield call(
            api.registerPost,
            {
               fn, ln, email, passw
            }
         );

         if (registerResponse.ok) {
            yield put(UserActions.storeEmailToRedux(email))
            yield put(
               UserActions.register.success({
                  email
               }),
            );
         } else {
            let additionalErrorText = '';
            if (registerResponse.status === 400) {
               let firstError = registerResponse?.data?.errors ? registerResponse?.data?.errors[0] : null;
               additionalErrorText = firstError?.msg + ' (' + firstError?.param + ')';
            }
            _.set(error, 'description', !!additionalErrorText ? additionalErrorText : registerResponse.data?.message);
            _.set(error, 'code', registerResponse.status);
            throw new RequestError(error as BaseErrorType);
         }

         yield put(
            UserActions.login.request({
               email,
               passw: passw.pass,
               storeToken: false
            })
         )
      } catch (error) {
         console.log('Register saga puts error (failure)')
         yield put(UserActions.register.failure(extractError(error)));
      }
   }
}

function* resendOtpCode(action: Action) {

   if (UserActions.resendOtpCode.request.match(action)) {
      try {
         const error = {};
         const resendOtpCodeResponse: ApiResponse<ResendOtpCodeResponse> = yield call(
            api.resendOtpCodePost, {
            email: action.payload.email
         }
         );
         if (resendOtpCodeResponse.ok) {
            yield put(UserActions.resendOtpCode.success({ message: 'OK' }));

            // yield put(UserActions.otp.success({ code: 'OK' }));

         } else {
            _.set(error, 'description', resendOtpCodeResponse?.data?.message);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserActions.resendOtpCode.failure(extractError(error)));
      }
   }
}

function* otpStartAuth(action: Action) {


   const { userToken } = yield select(userSelector)


   if (UserActions.otp.request.match(action)) {
      try {
         const error = {};
         // const otpRequestAction: ReturnType<typeof UserActions.otp.request> = yield take(
         //     UserActions.otp.request.type
         // );
         const otpVerifyResponse: ApiResponse<OtpVerifyResponse> = yield call(
            api.OtpVerifyPost,
            {
               email: action.payload.email,
               code: action.payload.otp
            }
         );
         if (otpVerifyResponse.ok) {
            // yield put(UserActions.profile.request());
            yield put(UserActions.logout.request());
            yield put(UserActions.otp.success());
            // storeTokenToAsyncStorage(userToken)
            // yield put(UserActions.storeTokenToRedux(userToken));
            // yield call({ context: Navigation, fn: Navigation.setStackRoot }, navigationService.getCurrentScreenId(), {
            //    component: {
            //       name: 'MainScreen',
            //       passProps: {},
            //       options: {
            //          animations: {
            //             push: {
            //                enabled: true
            //             }
            //          }
            //       }
            //    },
            // })
         } else {
            _.set(error, 'description', otpVerifyResponse.data?.message);
            _.set(error, 'code', otpVerifyResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserActions.otp.failure(extractError(error)));
         yield put(UserActions.otpStopAuth());
      }
   }
}

function* logout(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (UserActions.logout.request.match(action)) {
      try {
         const logoutResponse: ApiResponse<LoginResponse> = yield call(
            api.logoutGet,
            token
         );
       
         yield put(UserActions.logout.success());
         yield call(deleteTokenFromAsyncStorage);
         //deleteUserIdFromAsyncStorage();
         store.dispatch(UserActions.storeTokenToRedux(undefined));
         store.dispatch(UserActions.storeEmailToRedux(undefined));

         yield call({ context: Navigation, fn: Navigation.setStackRoot }, navigationService.getCurrentScreenId(), {
            component: {
               name: 'LoginScreen',
               passProps: { isLogout: true },
               options: {
                  animations: {
                     push: {
                        enabled: true
                     }
                  }
               }
            },
         })
         yield put(UserActions.mainScreenRoute(`home`))
         yield put(UserActions.changeStep('login'));

      } catch (error) {
         yield put(UserActions.logout.failure(extractError(error)));
      }
   }
}

function* forgotPassword(action: Action) {
   if (UserActions.forgotPassword.request.match(action)) {
      try {
         let { email } = action.payload;
         // phone = '+' + phone.replace(/[^0-9]/g, '');
         const error = {};

         const forgotPasswordResponse: ApiResponse<ForgotPasswordResponse> = yield call(
            api.forgotPasswordPost,
            {
               email
            }
         );

         if (forgotPasswordResponse.ok) {
            //const roflanCode = forgotPasswordResponse.data?.roflanCode;
            const userId = forgotPasswordResponse.data?.userId;
            yield put(
               UserActions.forgotPassword.success({
                  userId: userId,
                  //roflanCode: roflanCode
               }),
            );
            yield put(UserActions.storeEmailToRedux(email))
            yield put(UserActions.changeStep('passwordRecovery'));
         } else {
            _.set(error, 'description', forgotPasswordResponse.data?.message);
            _.set(error, 'code', forgotPasswordResponse.status);
            throw new RequestError(error as BaseErrorType);
         }

      } catch (error) {
         // showError(error.description);
         yield put(UserActions.forgotPassword.failure(extractError(error)))
      }
   }
}

function* passwordRecovery(action: Action) {
   if (UserActions.passwordRecovery.request.match(action)) {
      try {
         let { userId, code, passw } = action.payload;
         const error = {};

         const passwordRecoveryResponse: ApiResponse<PasswordRecoveryResponse> = yield call(
            api.passwordRecoveryPost,
            {
               userId, code, passw
            }
         );
         if (passwordRecoveryResponse.ok) {
            yield put(UserActions.passwordRecovery.success())
            yield put(UserActions.changeStep('login'));

            yield call(() => showError(`You succesfully changed your password!`, `Password recover`));
         } else {
            _.set(error, 'description', passwordRecoveryResponse.data?.message);
            _.set(error, 'code', passwordRecoveryResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserActions.passwordRecovery.failure(extractError(error)))
      }
   }
}

function* tokenRelevanceCheck(action: Action) {
   if (UserActions.tokenRelevanceCheck.request.match(action)) {
      try {
         let { token } = action.payload;
         const error = {};
         const tokenCheckResponse: ApiResponse<TokenRelevanceCheckResponse> = yield call(
            api.tokenRelevanceCheckGet,
            token
         );

         if (tokenCheckResponse.ok) {
            const relevance = tokenCheckResponse.data?.relevance;
            const activated = tokenCheckResponse.data?.activated;
            yield put(UserActions.tokenRelevanceCheck.success({
               relevance: relevance,
               activated: activated
            }))
         } else {
            _.set(error, 'description', tokenCheckResponse.data?.message);
            _.set(error, 'code', tokenCheckResponse.status);
            throw new RequestError(error as BaseErrorType);
         }

      } catch (error) {
         yield put(UserActions.logout.request());
         yield put(UserActions.tokenRelevanceCheck.failure(extractError(error)))
      }
   }
}


function* getByIdUserRequest(action: Action) {
   if (UserActions.getByIdUser.request.match(action)) {
      try {
         // phone = '+' + phone.replace(/[^0-9]/g, '');
         const error = {};

         const response: ApiResponse<GetByIdUserResponse | { message: string }> = yield call(
            api.getByIdUser,
            action.payload
         );

         if (response.ok) {
            UserActions.getByIdUser.success(response.data)

         } else {
            _.set(error, 'description', response.data?.message);
            _.set(error, 'code', response.status);
            throw new RequestError(error as BaseErrorType);
         }

      } catch (error) {
         yield put(UserActions.getByIdUser.failure(extractError(error)))
      }
   }
}


function* startChattingRequest(action: Action) {
   if (UserActions.startChatting.request.match(action)) {
      try {
         // phone = '+' + phone.replace(/[^0-9]/g, '');
         const error = {};

         const state = yield select(userSelector);
         let token = state.userToken;

         const response: ApiResponse<StartChattingResponse> = yield call(
            api.startChatting,
            token,
            {
               ...action.payload
            }
         );

         if (response.data) {
            yield put(UserActions.startChatting.success(response.data))
            yield put(ChatActions.getChatList.request({ index: 0 }))
         } else {
            _.set(error, 'description', response.data?.message);
            _.set(error, 'code', response.status);
            throw new RequestError(error as BaseErrorType);
         }

      } catch (error) {
         yield put(UserActions.startChatting.failure(extractError(error)))
      }
   }
}

// function* watchJwtErrors() {
//   const jwtChannel = eventChannel(emitter => {
//     const handler = (error: any) => {
//       emitter([TOKEN_ERROR, error]);
//     };
//     jwtLogic.emitter.on(TOKEN_ERROR, handler);
//     return () => jwtLogic.emitter.off(TOKEN_ERROR, handler);
//   });

//   yield take(jwtChannel);
//   yield call(jwtChannel.close);
//   yield put(UserActions.logout());
// }

// function* profileRequest(action: Action) {
//   if (UserActions.profile.request.match(action)) {
//     try {
//       const profileResponse: ApiResponse<ManagerInfoResponse> = yield call(
//         api.getManagerInfo,
//       );
//       if (profileResponse.data) {
//         const {
//           managerFio: fio,
//           managerPhone: phone,
//           managerPhoto: photo,
//         } = profileResponse.data;
//         yield put(
//           UserActions.profile.success({
//             fio,
//             phone,
//             photo,
//           }),
//         );
//       }
//     } catch (error) {
//       yield put(
//         UserActions.profile.failure(
//           extractError(error, 'Profile request error'),
//         ),
//       );
//     }
//   }
// }

export function* UserSaga() {
   yield* [
      takeLeading(UserActions.login.request.type, loginRequest),
      // takeLeading(UserActions.googleLogin.request.type, googleLoginRequest),
      // takeLeading(UserActions.facebookLogin.request.type, facebookLoginRequest),
      takeLeading(UserActions.register.request.type, registerRequest),
      takeLeading(UserActions.resendOtpCode.request.type, resendOtpCode),
      takeLeading(UserActions.otp.request.type, otpStartAuth),
      // takeLeading(UserActions.profile.request.type, profileRequest),
      takeLeading(UserActions.logout.request.type, logout),
      takeLeading(UserActions.passwordRecovery.request.type, passwordRecovery),
      takeLeading(UserActions.forgotPassword.request.type, forgotPassword),
      takeLeading(UserActions.tokenRelevanceCheck.request.type, tokenRelevanceCheck),
      takeLeading(UserActions.getByIdUser.request.type, getByIdUserRequest),
      takeLeading(UserActions.startChatting.request.type, startChattingRequest),
   ];
}
