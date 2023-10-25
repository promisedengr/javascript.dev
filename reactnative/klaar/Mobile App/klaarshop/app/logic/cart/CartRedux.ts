import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import fp from 'lodash/fp';
import { ProductT } from '~/screens/ProductsItemsScreen/ProductsItemsScreen';
import {
   addRestReducers, createRestActions,

   getDefaultRestState
} from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { ColorsType, ProductType } from '../profile/ProfileRedux';
import { AddProductRestActions, GetCartListRestActions, RemoveAllProductsRestActions, RemoveProductRestActions, СhangeProductsAmountRestActions } from './CartActions';



export type AddProductPayload = {
   productId: string
   amount: number
   size?: number
   color?: number
   deliveryMethod: `ruPost` | `pickup`
}

export type ChangeProductsAmountPayload = {
   data: {
      [key: number]: number
   }
}

export type GetCartListResponse = {
   apperDate: number
   _id: string
   owner: string
   products: {
      pricePerOne: number
      amount: 1
      deliveryMethod: `ruPost` | `pickup`
      product: {
         colors: ColorsType
         approved: boolean
         hidden: boolean
         couldBeEdited: boolean
         mainPhoto: string
         photos: string[]
         sizes: number[]
         buyers: string[]
         apperDate: number
         _id: string
         category: string
         subcategory: string
         seller: string
         name: string
         description: string
         currency: `rub` | `usd`
         price: number
      }
      seller: {
         photo: string
         rating: number
         apperDate: number
         _id: string
         email: string
         fn: string
         ln: string
      }
   }[]

}


export type RemoveProductPayload = {
   index: string
}




const addProductRestActions = createRestActions<
   typeof AddProductRestActions,
   { message: string },
   AddProductPayload
>(AddProductRestActions);



const changeProductsAmountRestActions = createRestActions<
   typeof СhangeProductsAmountRestActions,
   { message: string },
   ChangeProductsAmountPayload
>(СhangeProductsAmountRestActions);

const getCartListRestActions = createRestActions<
   typeof GetCartListRestActions,
   GetCartListResponse,
   void
>(GetCartListRestActions);

const removeAllProductsRestActions = createRestActions<
   typeof RemoveAllProductsRestActions,
   void,
   void
>(RemoveAllProductsRestActions);


const removeProductRestActions = createRestActions<
   typeof RemoveProductRestActions,
   void,
   RemoveProductPayload
>(RemoveProductRestActions);


type LocalAmountChange = {
   key: number
   amount: number
}

type LocalRemoveProduct = {
   index: number
}

type CurrentScreenNameT = {
   name: string
}

const CartActions = {
   addProduct: addProductRestActions,
   changeProductsAmount: changeProductsAmountRestActions,
   getCartList: getCartListRestActions,
   removeAllProducts: removeAllProductsRestActions,
   removeProduct: removeProductRestActions,
   localAmountChange: createAction<LocalAmountChange>(`cart/localAmountChange`),
   localRemoveProduct: createAction<LocalRemoveProduct>(`cart/localRemoveProduct`),
   localRemoveAllProducts: createAction(`cart/localRemoveAllProducts`),
   currentScreenName: createAction<CurrentScreenNameT>(`cart/currentScreenName`),
   cartScreenName: createAction<CurrentScreenNameT>(`cart/cartScreenName`),
   payment: createAction<{ lastOrderId: string }>(`cart/payment`)
};


type CartRestNodes = 'addProduct' | `changeProductsAmount` | `getCartList` | `removeAllProducts` | `removeProduct`

type CartStateActions = LocalAmountChange | LocalRemoveProduct | CurrentScreenNameT

const initialState = {
   addProduct: getDefaultRestState(),
   changeProductsAmount: getDefaultRestState(),
   getCartList: getDefaultRestState<GetCartListResponse>(),
   removeAllProducts: getDefaultRestState(),
   removeProduct: getDefaultRestState(),
   currentScreenName: ``,
   cartScreenName: ``

}


type CartState = NodeRestStateType<CartRestNodes, CartStateActions>;


type Builder = ActionReducerMapBuilder<CartState>;

const cartReducer = createReducer(initialState, builder =>
   (fp.flow([
      addRestReducers(addProductRestActions, 'addProduct'),
      addRestReducers(changeProductsAmountRestActions, 'changeProductsAmount'),
      addRestReducers(getCartListRestActions, 'getCartList'),
      addRestReducers(removeAllProductsRestActions, 'removeAllProducts'),
      addRestReducers(removeProductRestActions, 'removeProduct'),

   ])(builder) as Builder)
      .addCase(CartActions.localAmountChange, (state, action) => {
         state.getCartList.data.products[`${action.payload.key}`].amount = action.payload.amount
      })
      .addCase(CartActions.localRemoveProduct, (state, action) => {
         state.getCartList.data.products = state.getCartList.data.products.filter((d: any, idx: number) => idx !== action.payload.index)
      })
      .addCase(CartActions.localRemoveAllProducts, state => {
         state.getCartList.data.products = []
      })
      .addCase(CartActions.currentScreenName, (state, action) => {
         state.currentScreenName = action.payload.name
      })
      .addCase(CartActions.cartScreenName, (state, action) => {
         state.cartScreenName = action.payload.name
      })
);

export { cartReducer, CartActions };
