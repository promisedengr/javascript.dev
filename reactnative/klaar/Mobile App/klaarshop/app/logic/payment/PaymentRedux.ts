import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import fp from 'lodash/fp';
import { addRestReducers, createRestActions, getDefaultRestState } from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
// import { 
  
//  } from './PaymentActions';
import { ResendOtpCodeResponse } from '~/types/api';

// type UserLoginInfo = {
//   userId: string;
//   activated: boolean;
//   userRole: string;
//   access_token: string;
//   token_type: string;
// }

// export type LoginPayload = {phone: string; password: string; storeToken: boolean};

// const userLoginRestActions = createRestActions<
//   typeof UserLoginRestActions,
//   UserLoginInfo,
//   LoginPayload
// >(UserLoginRestActions);


const PaymentActions = {
  // login: userLoginRestActions,
  // storeTokenToRedux: createAction<UserStringInfo>('user/storeTokenToRedux'),
  // otpStopAuth: createAction('user/otpStopAuth'),
  changeStep: createAction<PaymentStep>('payment/changeStep'),
  updateProductsToOrder: createAction<ProductsToOrder>('payment/updateProductsToOrder')
};

type PaymentStep = 'cart1' | 'cart2' | 'ordering';
type PaymentRestNodes = PaymentStep;
type PaymentStringInfo = undefined | string;

type ProductsToOrder = number[]
type PaymentStore = {
  step: PaymentStep;
  productsToOrder: ProductsToOrder;
  // userToken: PaymentStringInfo;
};
type PaymentState = NodeRestStateType<PaymentRestNodes, PaymentStore>;

const initialRestState: PaymentState = {
  step: 'cart1',
  productsToOrder: []
  // userToken: undefined,
  // userId: undefined,
  // userRole: undefined,
  // login: getDefaultRestState<UserLoginInfo>(),
};

type Builder = ActionReducerMapBuilder<PaymentState>;

const paymentReducer = createReducer(initialRestState, builder =>
  (fp.flow([
    // addRestReducers(userLoginRestActions, 'login'),
  ])(builder) as Builder)
    .addCase(PaymentActions.updateProductsToOrder, (state, action) => {
      state.productsToOrder = action.payload;
    })
    .addCase(PaymentActions.changeStep, (state, action) => {
      state.step = action.payload;
    })
);

export { paymentReducer, PaymentActions };