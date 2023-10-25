import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import { call, delay, put, select, take, takeEvery } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { navigationService } from '~/screens/NavigationService';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import { userSelector } from '../user/UserSelectors';
import { CartActions, GetCartListResponse } from './CartRedux';
import { cartSelector } from './CartSelectors';
import stripe from 'tipsi-stripe'
import { OrdersActions } from '../orders/OrdersRedux';
import { PaymentActions } from '../payment/PaymentRedux';
import { showError } from '../AlertService/AlertService';
import { productSelector } from '../product/ProductSelectors';

stripe.setOptions({
   publishableKey: "pk_test_51IBkY9JD6WXzzJcIWEUX5Z5646UznQzLIVwB0hWtM1aj6K4CpSaf5PIv5iu7yEvqt3BuqyTDQk2GUf4zPIGQV2dE004ntqgD7I",
   androidPayMode: `test`
})


function* addProductRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (CartActions.addProduct.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<{ message: string }> = yield call(
            api.addProduct,
            token,
            action.payload
         );

         if (response.data) {

            if (response.ok) {
               yield put(CartActions.addProduct.success(response.data));
               yield call({ context: Navigation, fn: Navigation.push }, navigationService.getCurrentScreenId(), {
                  component: {
                     name: 'CartScreen',
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
               showError(response.data.message)
               throw new RequestError(response.data.message);
            }
         }

      } catch (error) {
         yield put(CartActions.addProduct.failure(extractError(error)));
      }
   }
}

function* changeProductsAmountRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (CartActions.changeProductsAmount.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<{ message: string }> = yield call(
            api.changeProductsAmount,
            token,
            action.payload
         );

         if (response.data && response.ok) {

            yield put(CartActions.changeProductsAmount.success(response.data));
            const key = Object.keys(action.payload.data)[0]
            yield put(CartActions.localAmountChange({ key: +key, amount: +action.payload.data[key] }))
         }

      } catch (error) {
         yield put(CartActions.changeProductsAmount.failure(extractError(error)));
      }
   }
}

function* getCartRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (CartActions.getCartList.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<GetCartListResponse> = yield call(
            api.getCartList,
            token
         );

         if (response.data && response.ok) {

            yield put(CartActions.getCartList.success(response.data));
         }
         else {

            yield put(CartActions.getCartList.failure(response.data.message));
         }

      } catch (error) {
         yield put(CartActions.getCartList.failure(extractError(error)));
      }
   }
}

function* removeAllProductsRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (CartActions.removeAllProducts.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<{ message: string }> = yield call(
            api.removeAllProducts,
            token
         );

         if (response.data) {

            yield put(CartActions.removeAllProducts.success(response.data));
            yield put(CartActions.localRemoveAllProducts())
         }

      } catch (error) {
         yield put(CartActions.removeAllProducts.failure(extractError(error)));
      }
   }
}


function* removeProductRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (CartActions.removeProduct.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const response: ApiResponse<{ message: string }> = yield call(
            api.removeProduct,
            token,
            action.payload
         );

         if (response.data && response.ok) {
            yield put(CartActions.localRemoveProduct({ index: +action.payload.index }))
            yield put(CartActions.removeProduct.success(response.data));
         }

      } catch (error) {
         yield put(CartActions.removeProduct.failure(extractError(error)));
      }
   }
}

function* payment(action: Action) {
   const {
      cartScreenName
   } = yield select(cartSelector);

   if (cartScreenName) {
      const demoCardFormParameters = {
         // Only iOS support this options
         smsAutofillDisabled: true,
         requiredBillingAddressFields: 'zip'
      }


      try {
         const { tokenId } = yield call(stripe.paymentRequestWithCardForm, demoCardFormParameters)

         yield put(OrdersActions.payOrder.request({ orderId: action.payload.lastOrderId, orderToken: tokenId }))

      } catch (error) {
         console.log(error)
         //yield put(OrdersActions.payOrder.request({ orderId: action.payload.lastOrderId, orderToken: tokenId }))
         yield put(PaymentActions.changeStep('cart1'))
         yield put(CartActions.getCartList.request())

      }
   }
   else {
      yield put(OrdersActions.showNotifictaion.saga({ isVisible: true, title: `New order waiting for payment`, type: `ok`, time: 2000 }))
      yield put(OrdersActions.lastOrder({ waiting: false, lastOrderId: action.payload.lastOrderId }))

      //yield put(OrdersActions.showNotifictaion({ isVisible: true, title: `New order waiting for payment`, type: `ok` }))
      //yield delay(2000)
      //yield put(OrdersActions.showNotifictaion({ isVisible: false }))
   }





}



export function* CartSaga() {
   yield* [
      takeLeading(CartActions.addProduct.request.type, addProductRequest),
      takeLeading(CartActions.changeProductsAmount.request.type, changeProductsAmountRequest),
      takeLeading(CartActions.getCartList.request.type, getCartRequest),
      takeLeading(CartActions.removeAllProducts.request.type, removeAllProductsRequest),
      takeEvery(CartActions.removeProduct.request.type, removeProductRequest),
      takeLeading(CartActions.payment, payment)
   ];
}