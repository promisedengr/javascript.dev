import { RootState } from '~/store/reducers';

export const cartSelector = (state: RootState) => state.cart;

export const cartProductsSelector = (state: RootState) => state.cart.getCartList.data?.products