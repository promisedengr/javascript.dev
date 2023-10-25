import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import { call, delay, put, select } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { userSelector } from '~/logic/user/UserSelectors';
import { navigationService } from '~/screens/NavigationService';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import { showError } from '../AlertService/AlertService';
import { ChatActions } from '../chats/ChatsRedux';
import { OrdersActions } from '../orders/OrdersRedux';
import { productActions } from '../product/ProductRedux';
import { DeliveryAddressesResponse, GetReviwedProductsResponse, GetSelfProductResponse, GetSelfProfileResponse, GetSelfReviewsResponse, GetUnreviwedProductsResponse, ProfileActions } from './ProfileRedux';
import { profileSelector } from './ProfileSelectors';


function* postAddOrChangeDeliveryAddressRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (ProfileActions.addOrChangeDeliveryAddress.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getClientDataResponse: ApiResponse<any> = yield call(
            api.postAddOrChangeDelAddr,
            token,
            {
               ...action.payload
            }
         )

         if (getClientDataResponse.data && getClientDataResponse.ok) {

            yield put(ProfileActions.addOrChangeDeliveryAddress.success())
            yield put(ProfileActions.deliveryAddresses.request())
            yield call({ context: Navigation, fn: Navigation.popToRoot }, navigationService.getCurrentScreenId(), {
               // component: {
               //    name: 'MainScreen',
               //    passProps: {},
               //    options: {
               //       animations: {
               //          push: {
               //             enabled: true
               //          }
               //       }
               //    }
               // },
            }
            )

         }
         else {
            yield put(OrdersActions.showNotifictaion.saga({ isVisible: true, title: getClientDataResponse.data.message, type: `ok`, time: 2000 }))

         }

      } catch (error) {
         yield put(ProfileActions.addOrChangeDeliveryAddress.failure(extractError(error)));
      }
   }
}

function* postChangeProfileRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (ProfileActions.changeProfile.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<any> = yield call(
            api.postChangeProfile,
            token,
            action.payload

         )



         if (response.data && response.ok) {
            yield put(ProfileActions.changeProfile.success(response.data))
            yield put(ProfileActions.getSelfProfile.request())

            yield call({ context: Navigation, fn: Navigation.popToRoot }, navigationService.getCurrentScreenId(), {
               // component: {
               //    name: 'MainScreen',
               //    passProps: {},
               //    options: {
               //       animations: {
               //          push: {
               //             enabled: true
               //          }
               //       }
               //    }
               // },
            })
         }
         else {

            yield put(OrdersActions.showNotifictaion.saga({ isVisible: true, title: response.data.message, type: `ok`, time: 2000 }))
            yield put(ProfileActions.changeProfile.failure(response.data));
         }

      } catch (error) {
         yield put(ProfileActions.changeProfile.failure(extractError(error)));
      }
   }
}

function* deleteDelAddrRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (ProfileActions.deleteDelAddr.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getClientDataResponse: ApiResponse<any> = yield call(
            api.deleteDelAddr,
            token,
            {
               ...action.payload
            }
         )

         if (getClientDataResponse.data) {

         }

      } catch (error) {
         yield put(ProfileActions.deleteDelAddr.failure(extractError(error)));
      }
   }
}

function* getDeliveryAddressesRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (ProfileActions.deliveryAddresses.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getClientDataResponse: ApiResponse<DeliveryAddressesResponse> = yield call(
            api.getDeliveryAddresses,
            token,
         )

         if (getClientDataResponse.data) {

            yield put(ProfileActions.deliveryAddresses.success(getClientDataResponse.data))
         }

      } catch (error) {
         yield put(ProfileActions.deliveryAddresses.failure(extractError(error)));
      }
   }
}

function* getSelfProductsRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId
   if (ProfileActions.getSelfProducts.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getClientDataResponse: ApiResponse<GetSelfProductResponse> = yield call(
            api.getSelfProducts,
            token,
            action.payload
         )

         if (getClientDataResponse.data && getClientDataResponse.ok) {

            yield put(productActions.currentState({ stateName: `getSelfProducts` }))
            yield put(ProfileActions.getSelfProducts.success(getClientDataResponse.data))
         }

      } catch (error) {
         yield put(ProfileActions.getSelfProducts.failure(extractError(error)));
      }
   }
}

function* getSelfProfileRequest(action: Action) {
   const state = yield select(userSelector);

   let token = state.userToken;
   //let id = state.userId
   if (ProfileActions.getSelfProfile.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<GetSelfProfileResponse> = yield call(
            api.getSelfProfile,
            token
         )

         if (response.data && response.ok) {
            const responseData = response.data
            if (responseData.bday && responseData.photo && responseData.phone && (responseData.role === `buyer`)) {
               yield put(ProfileActions.activSellPerm.request())
            }
            yield put(ProfileActions.getSelfProfile.success(responseData))
            yield put(ChatActions.myUserId(responseData._id))
         }
         else {
            yield put(ProfileActions.getSelfProfile.failure(response.data.message))
            yield call(showError, response.data.message)
         }

      } catch (error) {
         yield put(ProfileActions.getSelfProfile.failure(extractError(error)));
      }
   }
}

function* getSelfReviewsRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId
   if (ProfileActions.getSelfReviews.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getClientDataResponse: ApiResponse<GetSelfReviewsResponse> = yield call(
            api.getSelfReviews,
            token,
            action.payload
         )

         if (getClientDataResponse.data) {
            yield put(ProfileActions.getSelfReviews.success(getClientDataResponse.data))
         }

      } catch (error) {
         yield put(ProfileActions.getSelfReviews.failure(extractError(error)));
      }
   }
}


function* setProfilePhotoRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId
   if (ProfileActions.setProfilePhoto.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getClientDataResponse: ApiResponse<any> = yield call(
            api.setProfilePhoto,
            token,
            {
               ...action.payload
            }
         )

         if (getClientDataResponse.data) {
            yield put(ProfileActions.setProfilePhoto.success(getClientDataResponse.data))
         }

      } catch (error) {
         yield put(ProfileActions.setProfilePhoto.failure(extractError(error)));
      }
   }
}


function* activSellPermRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId
   if (ProfileActions.activSellPerm.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getClientDataResponse: ApiResponse<any> = yield call(
            api.activSellPerm,
            token
         )

         if (getClientDataResponse.data && getClientDataResponse.ok) {
            yield put(ProfileActions.activSellPerm.success(getClientDataResponse.data))

            yield put(OrdersActions.showNotifictaion.saga({ isVisible: true, title: `Now you can create ads!`, type: `ok`, time: 2000 }))

            yield put(ProfileActions.getSelfProfile.request())
         }
         else {

         }

      } catch (error) {
         yield put(ProfileActions.activSellPerm.failure(extractError(error)));
      }
   }
}


function* getSelfOrdersRequest(action: Action) {
   const state = yield select(userSelector);


   const {
      getSelfOrders: {
         data: selfOrdersData
      }
   } = yield select(profileSelector)

   let token = state.userToken;
   //let id = state.userId
   if (ProfileActions.getSelfOrders.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<any> = yield call(
            api.getSelfOrders,
            token,
            action.payload
         )

         if (response.data && response.ok) {


            yield put(ProfileActions.getSelfOrders.success(response.data))


            if (+action.payload.index) {
               yield put(ProfileActions.getSelfOrders.success({ orders: [...selfOrdersData.orders, ...response.data.orders,] }))
            }
            else {
               yield put(ProfileActions.getSelfOrders.success(response.data))
            }
         }

      } catch (error) {
         yield put(ProfileActions.getSelfOrders.failure(extractError(error)));
      }
   }
}


function* getUnreviwedProductsRequest(action: Action) {
   const state = yield select(userSelector);

   let token = state.userToken;
   if (ProfileActions.getUnreviwedProducts.request.match(action)) {
      try {

         const response: ApiResponse<GetUnreviwedProductsResponse> = yield call(
            api.getUnreviwedProducts,
            token,
            action.payload
         )
         if (response.data && response.ok) {

            yield put(ProfileActions.getUnreviwedProducts.success(response.data))
         }
      }
      catch (e) {
         console.log(e)
         yield put(ProfileActions.getUnreviwedProducts.failure(extractError(e)));

      }
   }
}


function* getReviwedProductsRequest(action: Action) {
   const state = yield select(userSelector);

   let token = state.userToken;
   if (ProfileActions.getReviwedProducts.request.match(action)) {
      try {

         const response: ApiResponse<GetReviwedProductsResponse> = yield call(
            api.getReviwedProducts,
            token,
            action.payload
         )
         if (response.data && response.ok) {

            yield put(ProfileActions.getReviwedProducts.success(response.data))
         }
         else {
            yield put(ProfileActions.getReviwedProducts.failure());
         }
      }
      catch (e) {
         console.log(e)
         yield put(ProfileActions.getReviwedProducts.failure(extractError(e)));

      }
   }
}






export function* ProfileSaga() {
   yield* [
      takeLeading(ProfileActions.addOrChangeDeliveryAddress.request.type, postAddOrChangeDeliveryAddressRequest),
      takeLeading(ProfileActions.changeProfile.request.type, postChangeProfileRequest),
      takeLeading(ProfileActions.deleteDelAddr.request.type, deleteDelAddrRequest),
      takeLeading(ProfileActions.deliveryAddresses.request.type, getDeliveryAddressesRequest),
      takeLeading(ProfileActions.getSelfProducts.request.type, getSelfProductsRequest),
      takeLeading(ProfileActions.getSelfProfile.request.type, getSelfProfileRequest),
      takeLeading(ProfileActions.getSelfReviews.request.type, getSelfReviewsRequest),
      takeLeading(ProfileActions.setProfilePhoto.request.type, setProfilePhotoRequest),
      takeLeading(ProfileActions.activSellPerm.request.type, activSellPermRequest),
      takeLeading(ProfileActions.getSelfOrders.request.type, getSelfOrdersRequest),
      takeLeading(ProfileActions.getUnreviwedProducts.request.type, getUnreviwedProductsRequest),
      takeLeading(ProfileActions.getReviwedProducts.request.type, getReviwedProductsRequest)
   ]
}
