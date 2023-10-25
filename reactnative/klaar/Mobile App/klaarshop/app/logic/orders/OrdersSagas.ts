import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import { call, delay, put, select } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { navigationService } from '~/screens/NavigationService';
import { takeLeading } from '~/store/sagaHelper';
import { showError } from '../AlertService/AlertService';
import { CartActions } from '../cart/CartRedux';
import { productActions } from '../product/ProductRedux';
import { ProfileActions } from '../profile/ProfileRedux';
import { profileSelector } from '../profile/ProfileSelectors';
import { userSelector } from '../user/UserSelectors';
import { BaseErrorType } from '~/store/restHelper.d';
import { CreateFromCartResponse, GetByIdResponse, OrdersActions, SetStatusResponse, SetOrderStatusResponse } from './OrdersRedux';
import { ordersSelector } from './OrdersSelectors';


function* setOrderStatusRequest(action: Action) {
  const state = yield select(userSelector);
  const token = state.userToken;
  if (OrdersActions.setOrderStatus.request.match(action)) {
    try {
      const error = {};
      const setOrderStatusResponse: ApiResponse<SetOrderStatusResponse> = yield call(
        api.setOrderStatusPost,
        token,
        action.payload
      );
      if (setOrderStatusResponse.ok && setOrderStatusResponse.data) {
        const responseData = setOrderStatusResponse.data;
        yield put(ProfileActions.getSelfOrders.request({ index: `0` }))
        yield put(OrdersActions.setOrderStatus.success({
          message: responseData.message
        }));
      } else {
        _.set(error, 'description', setOrderStatusResponse.data?.message);
        _.set(error, 'code', setOrderStatusResponse.status);
        throw new RequestError(error as BaseErrorType);
      }
    } catch (error) {
      yield put(OrdersActions.setOrderStatus.failure(extractError(error)));
    }
  }
}

function* createFromCartRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (OrdersActions.createFromCart.request.match(action)) {
      try {
         const response: ApiResponse<CreateFromCartResponse> = yield call(
            api.createFromCart,
            token,
            action.payload
         )
         if (response.data && response.ok) {

            yield put(OrdersActions.createFromCart.success(response.data))
         }
      }
      catch (e) {
         console.log(e)
         yield put(OrdersActions.createFromCart.failure(extractError(e)));

      }
   }
}

function* getByIdRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (OrdersActions.getById.request.match(action)) {
      try {
         const response: ApiResponse<GetByIdResponse> = yield call(
            api.getByIdOrder,
            token,
            action.payload
         )
         if (response.data && response.ok) {

            yield put(OrdersActions.getById.success({}))
            yield put(OrdersActions.arrayOrdersById({ idx: action.payload.idx, order: response.data.order }))

         }
         else {
            yield put(OrdersActions.getById.failure(response.data.message))
         }
      }
      catch (e) {
         console.log(e)
         yield put(OrdersActions.getById.failure(extractError(e)));

      }
   }
}

function* setStatusRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (OrdersActions.setStatus.request.match(action)) {
      try {
         const response: ApiResponse<SetStatusResponse> = yield call(
            api.setStatusOrder,
            token,
            action.payload
         )
         if (response.data && response.ok) {

            yield put(OrdersActions.setStatus.success(response.data))
            yield put(ProfileActions.localStatusChange({ orderId: action.payload.orderId, status: action.payload.newStatus }))
         }
         else {
            yield put(OrdersActions.setStatus.failure(response.data))
            yield call(showError, response.data!.message)
         }
      }
      catch (e) {
         console.log(e)
         yield put(OrdersActions.setStatus.failure(extractError(e)));

      }
   }
}


function* payOrderRequest(action: Action) {
   const state = yield select(userSelector);
   const { getSelfOrders: {
      data: selfOrdersData
   } } = yield select(profileSelector)
   let token = state.userToken;
   if (OrdersActions.payOrder.request.match(action)) {
      try {
         const response: ApiResponse<{ message: string }> = yield call(
            api.payOrder,
            token,
            action.payload
         )
         if (response.data && response.ok) {
            yield put(OrdersActions.payOrder.success(response.data))
            yield put(productActions.productsSearch.request({ index: 0 }))
            yield call({ context: Navigation, fn: Navigation.popToRoot }, navigationService.getCurrentScreenId(),
               // {
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
               // }
            )
            yield put(OrdersActions.lastOrder({ waiting: false, lastOrderId: `` }))
            yield put(CartActions.getCartList.request())
            if (selfOrdersData) {
               yield put(ProfileActions.localStatusChange({ orderId: action.payload.orderId, status: `waitShipment` }))
            }
         }
         else {
            yield call(showError, response.data?.description, response.data?.message)
            yield put(OrdersActions.payOrder.failure(response.data))
         }
      }
      catch (e) {
         console.log(e)
         yield put(OrdersActions.payOrder.failure(extractError(e)));
         yield put(OrdersActions.lastOrder({ waiting: false, lastOrderId: `` }))
      }
   }
}



function* showNotifictaion(action: Action) {
   const { notification } = yield select(ordersSelector)

   const {
      type = undefined,
      title = ``,
      isVisible = false,
      time = 3000
   } = action.payload

   yield put(OrdersActions.showNotifictaion.redux({ type, time, title, isVisible }))

   yield delay(4000)

   yield put(OrdersActions.showNotifictaion.redux({ isVisible: false }))


}


export function* OrdersSaga() {
   yield* [
      takeLeading(OrdersActions.createFromCart.request.type, createFromCartRequest),
      takeLeading(OrdersActions.getById.request.type, getByIdRequest),
      takeLeading(OrdersActions.setStatus.request.type, setStatusRequest),
      takeLeading(OrdersActions.payOrder.request.type, payOrderRequest),
      takeLeading(OrdersActions.showNotifictaion.saga, showNotifictaion),
      takeLeading(OrdersActions.setOrderStatus.request.type, setOrderStatusRequest)
   ];
}