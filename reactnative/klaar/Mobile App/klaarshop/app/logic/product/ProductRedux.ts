import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import fp from 'lodash/fp';

import { addRestReducers, createRestActions, getDefaultRestState } from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { 
   AddProductResponseData,
   DeleteProductResponse
} from '~/types/api';
import { DeliveryAddressesT, ProductType } from '../profile/ProfileRedux';
import {
   AddPhotoRestActions, AddProductRestActions, AddReviewRestActions, ApproveProductRestActions,
   DeletePhotoRestActions, EditProductRestActions, GetFollowedProductsRestActions,
   GetProductByIdRestActions,
   GetReviewsRestActions,
   DeleteProductRestActions,
   GetUnaviableListRestActions, ProductsSearchRestActions, SetColorRestActions,
   SubscribeRestActions, UnSetColorRestActions
} from './ProductActions';

export type CurrencyT = `rub` | `usd`
export type SymbCurrencyT = `$` | `₽`


export type OnPostResponse = {
   message: string
} | undefined

export type ProductDataPayload = {
   name: string
   description: string
   category: string
   subcategory: string
   sizes?: number[]
   deliveryMethods: {
      ruPost?: boolean
      pickup?: boolean
   }
   pickupAddress?: DeliveryAddressesT
   currency: CurrencyT,
   price: number,
   photos?: Partial<AddPhotoPayload>[]
   colors?: Partial<SetColorPayload>[]
}

export type DeleteProductPayload = {
   productId: string;
}


type PhotoIdentify = {
   index: string
   productId: string
}

export type AddPhotoPayload = {
   mimeType: 'image/jpeg'
   data: string
} & PhotoIdentify

export type SetColorPayload = {
   colorName: string
} & AddPhotoPayload

export type UnSetColorPayload = PhotoIdentify

export type DeletePhotoPayload = PhotoIdentify

export enum PriceSort {
   IncreasingPrice = -1,
   ByCreateDate,
   DecreasingPrice

}

export type ProductsSearchPayload = {
   index?: number
   nameRegex?: string
   category?: string
   subcategory?: string
   priceSort?: PriceSort
}

export type ProductsSearchResponse = {
   products: ProductType[]
}

export type EditProductPayload = ProductDataPayload & {
   productId: string

}

export type ReducersNameT = `Products` | `UserInteractions`

export type SubscribePayload = {
   productId: string
   isFavorite: boolean
   reducerName?: ReducersNameT
}

export type SubscribeResponse = {
   message: string
}

export type GetFollowedProductsPayload = {
   index: string
}

export type GetFollowedProductsResponse = {
   products: ProductType[]
}

export type ApproveProductResponse = {
   message: string
}

export type ApproveProductPayload = {
   type: `approve` | `unapprove`
   productId: string
}


export type GetUnaviableListReponse = {
   products: ProductType[]
}

export type GetUnaviableListPayload = {
   index: string
}

export type GetReviewsPayload = {
   productId: string
   index: string
}


export type ReviewT = {
   apperDate: number
   _id: string
   fromUser: {
      photo: string
      _id: string
      fn: string
      ln: string
   },
   grade: number
   text: string
}

export type GetReviewsResponse = {
   reviews: ReviewT[]
} | undefined

export type AddReviewPayload = {
   productId: string
   grade: number
   text: string
}

export type AddReviewResponse = {
   message: string
}


export type GetSelfOrdersPayload = {
   index: string
}

export type GetProductByIdResponse = ProductType

export type GetProductByIdPayload = {
   productId: string
}


const getProductByIdRestActions = createRestActions<
   typeof GetProductByIdRestActions,
   GetProductByIdResponse,
   GetProductByIdPayload
>(GetProductByIdRestActions)

const getUnaviableListRestActions = createRestActions<
   typeof GetUnaviableListRestActions,
   GetUnaviableListReponse,
   GetUnaviableListPayload
>(GetUnaviableListRestActions)

const getFollowedProductsRestActions = createRestActions<
   typeof GetFollowedProductsRestActions,
   GetFollowedProductsResponse,
   GetFollowedProductsPayload
>(GetFollowedProductsRestActions)

const editProductRestActions = createRestActions<
   typeof EditProductRestActions,
   void,
   EditProductPayload
>(EditProductRestActions);

const addPhotoRestActions = createRestActions<
   typeof AddPhotoRestActions,
   OnPostResponse,
   AddPhotoPayload
>(AddPhotoRestActions);


const deletePhototRestActions = createRestActions<
   typeof DeletePhotoRestActions,
   void,
   DeletePhotoPayload
>(DeletePhotoRestActions);

const setColorRestActions = createRestActions<
   typeof SetColorRestActions,
   void,
   SetColorPayload
>(SetColorRestActions);

const unSetColorRestActions = createRestActions<
   typeof UnSetColorRestActions,
   void,
   UnSetColorPayload
>(UnSetColorRestActions);


const addProductRestActions = createRestActions<
   typeof AddProductRestActions,
   AddProductResponseData,
   ProductDataPayload
>(AddProductRestActions);

const deleteProductRestActions = createRestActions<
   typeof DeleteProductRestActions,
   DeleteProductResponse,
   DeleteProductPayload
>(DeleteProductRestActions);



const productsSearchRestActions = createRestActions<
   typeof ProductsSearchRestActions,
   ProductsSearchResponse,
   ProductsSearchPayload
>(ProductsSearchRestActions);


const subscribeRestActions = createRestActions<
   typeof SubscribeRestActions,
   SubscribeResponse,
   SubscribePayload
>(SubscribeRestActions);


const approveProductRestActions = createRestActions<
   typeof ApproveProductRestActions,
   ApproveProductResponse,
   ApproveProductPayload
>(ApproveProductRestActions);


const getReviewsRestActions = createRestActions<
   typeof GetReviewsRestActions,
   GetReviewsResponse,
   GetReviewsPayload
>(GetReviewsRestActions);


const addReviewRestActions = createRestActions<
   typeof AddReviewRestActions,
   AddReviewResponse,
   AddReviewPayload
>(AddReviewRestActions);











export type ToggleFollowT = {
   productId: string
   isFollowed?: boolean
}

type CurrentStateT = {
   stateName: `productsSearch` | `getFollowedProducts`
}

type RemoveFromUnavaible = {
   productId: string
}

type CurrentProduct = {
   product: ProductType
}

const productActions = {
   add_product: addProductRestActions,
   deleteProduct: deleteProductRestActions,
   addPhoto: addPhotoRestActions,
   deletePhoto: deletePhototRestActions,
   setColor: setColorRestActions,
   unSetColor: unSetColorRestActions,
   productsSearch: productsSearchRestActions,
   editProduct: editProductRestActions,
   subscribe: subscribeRestActions,
   toggleFollow: createAction<ToggleFollowT>(`product/toggleFollow`),
   getFollowedProducts: getFollowedProductsRestActions,
   currentState: createAction<CurrentStateT>(`product/currentState`),
   approveProduct: approveProductRestActions,
   getUnaviableList: getUnaviableListRestActions,
   removeFromUnavaible: createAction<RemoveFromUnavaible>(`product/removeFromUnavaible`),
   getReviews: getReviewsRestActions,
   addReview: addReviewRestActions,
   currentProduct: createAction<CurrentProduct>(`product/currentProduct`),
   getProductById: getProductByIdRestActions
};

type ProductStep = 'add_product';
type ProductRestNodes = ProductStep | 'subscribe' | `productsSearch` | "getUnaviableList"
   | `productsSearch` | `getFollowedProducts` | `getUnreviwedProducts` | `getProductById` | `editProduct` | 'deleteProduct'

type ProductStore = {
   step: ProductStep
   toggleFollow: ToggleFollowT
   currentState: CurrentStateT
   currentProduct?: ProductType
};

type ProductState = NodeRestStateType<ProductRestNodes, ProductStore>;

const initialRestState = {
   step: 'add_product',
   add_product: getDefaultRestState<OnPostResponse>(),
   deleteProduct: getDefaultRestState(),
   addPhoto: getDefaultRestState<OnPostResponse>(),
   deletePhoto: getDefaultRestState(),
   setColor: getDefaultRestState(),
   unSetColor: getDefaultRestState(),
   productsSearch: getDefaultRestState<ProductsSearchResponse>(),
   editProduct: getDefaultRestState(),
   subscribe: getDefaultRestState<SubscribeResponse>(),
   getFollowedProducts: getDefaultRestState<GetFollowedProductsResponse>(),
   currentState: { stateName: `` },
   approveProduct: getDefaultRestState<ApproveProductResponse>(),
   getUnaviableList: getDefaultRestState<GetUnaviableListReponse>(),
   getReviews: getDefaultRestState<GetReviewsResponse>(),
   addReview: getDefaultRestState<AddReviewResponse>(),
   //currentProduct: undefined,
   getProductById: getDefaultRestState<GetProductByIdResponse>()
};

type Builder = ActionReducerMapBuilder<ProductState>

const productReducer = createReducer(initialRestState, builder =>
   (fp.flow([
      addRestReducers(addProductRestActions, 'add_product'),
      addRestReducers(deleteProductRestActions, 'deleteProduct'),
      addRestReducers(addPhotoRestActions, 'addPhoto'),
      addRestReducers(deletePhototRestActions, 'deletePhoto'),
      addRestReducers(setColorRestActions, 'setColor'),
      addRestReducers(unSetColorRestActions, 'unSetColor'),
      addRestReducers(productsSearchRestActions, 'productsSearch'),
      addRestReducers(editProductRestActions, 'editProduct'),
      addRestReducers(subscribeRestActions, 'subscribe'),
      addRestReducers(getFollowedProductsRestActions, 'getFollowedProducts'),
      addRestReducers(approveProductRestActions, 'approveProduct'),
      addRestReducers(getUnaviableListRestActions, 'getUnaviableList'),
      addRestReducers(getReviewsRestActions, 'getReviews'),
      addRestReducers(addReviewRestActions, 'addReview'),
      addRestReducers(getProductByIdRestActions, 'getProductById'),
   ])(builder) as Builder)
      .addCase(productActions.toggleFollow, (state, action) => {
         const { productId } = action.payload
         //console.log(`state[state.currentState.stateName].data.products`, state[state.currentState.stateName].data.products)

         state[state.currentState.stateName].data.products.map((d: any, idx: number) => {
            if (d._id === productId) {

               state[state.currentState.stateName].data.products[idx].youSubscribed =
                  !state[state.currentState.stateName].data.products[idx].youSubscribed

               // if (state.getProductById.data && state.getProductById.data._id === productId) {

               //    state.getProductById.data.youSubscribed = !state.getProductById.data.youSubscribed
               // }
            }
         })
      })
      .addCase(productActions.currentState, (state, action) => {
         state.currentState.stateName = action.payload.stateName
      })
      .addCase(productActions.removeFromUnavaible, (state, action) => {
         state.getUnaviableList.data.products = state.getUnaviableList.data.products.filter((d: any, idx: number) => (
            action.payload.productId !== d._id
         ))
      })
      .addCase(productActions.currentProduct, (state, action) => {
         state.currentProduct = action.payload.product
      })

);

export { productReducer, productActions };
