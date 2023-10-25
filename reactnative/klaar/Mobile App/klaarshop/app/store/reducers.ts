import { combineReducers } from 'redux';
import { clientReducer } from '~/logic/client/ClientRedux';
import { productReducer } from '~/logic/product/ProductRedux';
import { userReducer } from '~/logic/user/UserRedux';
import { userInteractionReducer } from '~/logic/userInteraction/UserInteractionRedux';
import { paymentReducer } from '~/logic/payment/PaymentRedux';
import { categoriesReducer } from '~/logic/categories/categories/CategoriesRedux';
import { profileReducer } from '~/logic/profile/ProfileRedux';
import { chatReducer } from '~/logic/chats/ChatsRedux';
import { cartReducer } from '~/logic/cart/CartRedux';
import { ordersReducer } from '~/logic/orders/OrdersRedux';
import { action } from '@storybook/addon-actions';
import { createAction } from '@reduxjs/toolkit';

export const DESTROY_STORE = createAction(`DESTROY_STORE`)

const appReducer = combineReducers({
   user: userReducer,
   client: clientReducer,
   product: productReducer,
   userInteraction: userInteractionReducer,
   payment: paymentReducer,
   categories: categoriesReducer,
   profile: profileReducer,
   chat: chatReducer,
   cart: cartReducer,
   orders: ordersReducer
});

export const rootReducer = (state, action) => {
   if (action.type === `DESTROY_STORE`) {
      state = undefined
   }
   return appReducer(state, action)

}

export type RootState = ReturnType<typeof appReducer>;
