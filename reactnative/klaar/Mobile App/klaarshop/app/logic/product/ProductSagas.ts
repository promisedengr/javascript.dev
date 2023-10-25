import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';
import { all, call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { navigationService } from '~/screens/NavigationService';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import { AddProductResponseData, DeleteProductResponse } from '~/types/api';
import { showError } from '../AlertService/AlertService';
import { OrdersActions } from '../orders/OrdersRedux';
import { ProfileActions } from '../profile/ProfileRedux';
import { UserActions } from '../user/UserRedux';
import { userSelector } from '../user/UserSelectors';
import { UserInteractionActions } from '../userInteraction/UserInteractionRedux';
import { AddReviewResponse, ApproveProductResponse, GetFollowedProductsResponse, GetProductByIdResponse, GetReviewsResponse, GetUnaviableListReponse, productActions, ProductsSearchResponse, SubscribeResponse } from './ProductRedux';
import { productSelector } from './ProductSelectors';

function* addProductRequest(action: Action) {
   const state = yield select(userSelector);

   let token = state.userToken;

   if (productActions.add_product.request.match(action)) {
      try {

         const { photos, colors, ...payload } = action.payload

         const error = {};

         const addProduct: ApiResponse<AddProductResponseData> = yield call(
            api.addProductPost,
            token,
            payload
         );

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         if (addProduct.data && addProduct.ok) {

            yield put(productActions.add_product.success(addProduct.data))

            yield all(
               photos!.map(p => {
                  if (p.data) {
                     return put(productActions.addPhoto.request({ ...p, productId: addProduct.data?._id }))
                  }
               }
               )
            )

            yield all(
               colors!.map(c => {
                  if (c.data) {
                     return put(productActions.setColor.request({ ...c, productId: addProduct.data?._id }))
                  }
               })
            )
            yield put(UserActions.mainScreenRoute(`home`))
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
            yield put(OrdersActions.showNotifictaion.saga({ isVisible: true, title: `Your product was succesfully created! Wait please for admin approve.`, type: `ok`, time: 2000 }))

         }
      }
      catch (error) {
         console.log(error)
         yield put(productActions.add_product.failure(extractError(error)));

      }
   }
};

function* deleteProductRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;

   if (productActions.deleteProduct.request.match(action)) {
      try {
         const error = {};

         const deleteProductResponse: ApiResponse<DeleteProductResponse> = yield call(
            api.deleteProduct,
            token,
            action.payload
         )
         if (deleteProductResponse.ok)
            yield put(productActions.deleteProduct.success({message: deleteProductResponse.data?.message}));
         else {
            _.set(error, 'description', deleteProductResponse.data?.message);
            _.set(error, 'code', deleteProductResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      }
      catch (error) {
         yield put(productActions.deleteProduct.failure(extractError(error)));
      }
   }
};

function* editProductRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;

   if (productActions.editProduct.request.match(action)) {
      try {

         const error = {};

         const addProduct: ApiResponse<AddProductResponseData & { message: string }> = yield call(
            api.editProduct,
            token,
            action.payload
         );
         // console.log(addProduct)
         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }
         if (addProduct.data && addProduct.ok) {

            yield put(productActions.editProduct.success())
            yield call({ context: Navigation, fn: Navigation.pop }, navigationService.getCurrentScreenId())
            //yield put(ProfileActions.getSelfProducts.request({ index: `0` }))
         }
         else {
            yield put(OrdersActions.showNotifictaion.saga({ isVisible: true, title: addProduct.data!.message, type: `error`, time: 2000 }))
         }

      }
      catch (error) {
         console.log(error)
         yield put(productActions.editProduct.failure(extractError(error)));

      }
   }
};


function* addPhotoRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.addPhoto.request.match(action)) {
      try {
         //const { index, data, productId, mimeType } = action.payload
         const photoResponse: ApiResponse<AddProductResponseData> = yield call(
            api.addPhotoPost,
            token,
            action.payload
         )

         if (photoResponse.data && photoResponse.ok) {

            yield put(productActions.addPhoto.success(photoResponse.data))

         }

      }
      catch (e) {
         console.log(e)
         yield put(productActions.addPhoto.failure(extractError(e)));

      }
   }
}

function* deletePhotoRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.deletePhoto.request.match(action)) {
      try {
         //const { index, data, productId, mimeType } = action.payload
         const photoResponse: ApiResponse<AddProductResponseData> = yield call(
            api.deletePhoto,
            token,
            action.payload)

         yield put(productActions.deletePhoto.success())
      }
      catch (e) {
         console.log(e)
         yield put(productActions.deletePhoto.failure(extractError(e)));

      }
   }
}


function* unSetColorRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.unSetColor.request.match(action)) {
      try {
         //const { index, data, productId, mimeType } = action.payload
         const colorResponse: ApiResponse<AddProductResponseData> = yield call(
            api.deletePhoto,
            token,
            action.payload)

         yield put(productActions.unSetColor.success())
      }
      catch (e) {
         console.log(e)
         yield put(productActions.unSetColor.failure(extractError(e)));

      }
   }
}

function* setColorRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.setColor.request.match(action)) {
      try {
         const error = {};

         const colorResponse: ApiResponse<AddProductResponseData> = yield call(
            api.setColorPost,
            token,
            action.payload)

         if (colorResponse.ok)
            yield put(productActions.setColor.success());
         else {
            _.set(error, 'description', colorResponse.data?.message);
            _.set(error, 'code', colorResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.setColor.failure(extractError(e)));

      }
   }
}


function* productsSearchRequest(action: Action) {
   const state = yield select(userSelector);
   const {
      productsSearch: {
         data: productData
      }
   } = yield select(productSelector)
   let token = state.userToken;
   if (productActions.productsSearch.request.match(action)) {
      try {

         // console.log(`productData:`, productData)

         if (!!action.payload.nameRegex) {
            yield delay(3000)
         }


         const productsSearch: ApiResponse<ProductsSearchResponse> = yield call(
            api.productsSearchPost,
            token,
            action.payload)
         if (productsSearch.data && productsSearch.ok) {
            yield put(productActions.currentState({ stateName: `productsSearch` }))

            if (action.payload.index) {
               yield put(productActions.productsSearch.success({ products: [...productData.products, ...productsSearch.data.products,] }))
            }
            else {
               yield put(productActions.productsSearch.success(productsSearch.data))
            }
         }
         else {
            yield put(productActions.productsSearch.failure(productsSearch.status));
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.productsSearch.failure(extractError(e)));

      }
   }
}


function* subscribeRequest(action: Action) {
   const state = yield select(userSelector);

   const {
      getProductById: {
         data: productById
      },
      productsSearch: {
         data: productsSearchData
      }
   } = yield select(productSelector)

   let token = state.userToken;
   if (productActions.subscribe.request.match(action)) {
      try {
         const productsSearch: ApiResponse<SubscribeResponse> = yield call(
            api.subscribeGet,
            token,
            action.payload
         )
         if (productsSearch.data && productsSearch.ok) {

            if (action.payload.reducerName === `Products`) {

               yield put(productActions.toggleFollow({ productId: action.payload.productId }))
               if (productById && productById._id === action.payload.productId) {

                  yield put(productActions.getProductById.success({ ...productById, youSubscribed: !productById.youSubscribed }))
               }
            }
            else if (action.payload.reducerName === `UserInteractions`) {

               yield put(UserInteractionActions.toggleFollow({ productId: action.payload.productId }))
               if (productById && productById._id === action.payload.productId) {

                  yield put(productActions.getProductById.success({ ...productById, youSubscribed: !productById.youSubscribed }))
               }
               if (productsSearchData) {
                  yield put(productActions.toggleFollow({ productId: action.payload.productId }))
               }
            }

            yield put(productActions.subscribe.success(productsSearch.data))
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.subscribe.failure(extractError(e)));

      }
   }
}


function* getFollowedProductsRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.getFollowedProducts.request.match(action)) {
      try {
         const error = {};

         const productsSearch: ApiResponse<GetFollowedProductsResponse> = yield call(
            api.getFollowedProducts,
            token,
            action.payload
         )
         if (productsSearch.data && productsSearch.ok) {
            yield put(productActions.currentState({ stateName: `getFollowedProducts` }))
            yield put(productActions.getFollowedProducts.success(productsSearch.data))
         } else {
            _.set(error, 'description', productsSearch.data?.message);
            _.set(error, 'code', productsSearch.status);
            throw new RequestError(error as BaseErrorType);
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.getFollowedProducts.failure(extractError(e)));

      }
   }
}


function* approveProductRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.approveProduct.request.match(action)) {
      try {
         const productsSearch: ApiResponse<ApproveProductResponse> = yield call(
            api.approveProduct,
            token,
            action.payload
         )
         if (productsSearch.data && productsSearch.ok) {
            yield put(productActions.approveProduct.success(productsSearch.data))
            yield put(productActions.removeFromUnavaible({ productId: action.payload.productId }))
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.approveProduct.failure(extractError(e)));

      }
   }
}

function* getUnaviableListRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.getUnaviableList.request.match(action)) {
      try {
         const productsSearch: ApiResponse<GetUnaviableListReponse> = yield call(
            api.getUnaviableList,
            token,
            action.payload
         )
         if (productsSearch.data && productsSearch.ok) {

            yield put(productActions.getUnaviableList.success(productsSearch.data))
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.getUnaviableList.failure(extractError(e)));

      }
   }
}

function* getReviewsRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (productActions.getReviews.request.match(action)) {
      try {
         const response: ApiResponse<GetReviewsResponse> = yield call(
            api.getReviews,
            token,
            action.payload
         )
         if (response.data && response.ok) {

            yield put(productActions.getReviews.success(response.data))
         }
         else {

            yield put(productActions.getReviews.failure(response.data))
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.getReviews.failure(extractError(e)));

      }
   }
}


function* addReviewRequest(action: Action) {
   const state = yield select(userSelector);
   const { productsSearch: {
      fetching: productsFetching
   }
   } = yield select(productSelector)
   let token = state.userToken;
   if (productActions.addReview.request.match(action) && !productsFetching) {
      try {
         const error = {};

         const response: ApiResponse<AddReviewResponse> = yield call(
            api.addReview,
            token,
            action.payload
         )
         if (response.data && response.ok) {
            yield put(productActions.addReview.success(response.data))
            yield put(ProfileActions.getUnreviwedProducts.request({ index: 0 }))
            yield call({ context: Navigation, fn: Navigation.pop }, navigationService.getCurrentScreenId())
         } else {
            _.set(error, 'description', response.data?.message);
            _.set(error, 'code', response.status);
            throw new RequestError(error as BaseErrorType);
         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.addReview.failure(extractError(e)));

      }
   }
}

function* getProductByIdRequest(action: Action) {
   const state = yield select(userSelector);
   const { productsSearch: {
      fetching: productsFetching
   }
   } = yield select(productSelector)
   let token = state.userToken;
   if (productActions.getProductById.request.match(action) && !productsFetching) {
      try {

         const response: ApiResponse<GetProductByIdResponse> = yield call(
            api.getProductById,
            token,
            action.payload
         )
         if (response.data && response.ok) {

            yield put(productActions.getProductById.success(response.data))

         }
      }
      catch (e) {
         console.log(e)
         yield put(productActions.getProductById.failure(extractError(e)));

      }
   }
}





export function* ProductSaga() {
   yield* [
      takeLeading(productActions.add_product.request.type, addProductRequest),
      takeEvery(productActions.addPhoto.request.type, addPhotoRequest),
      takeEvery(productActions.deletePhoto.request.type, deletePhotoRequest),
      takeEvery(productActions.setColor.request.type, setColorRequest),
      takeEvery(productActions.unSetColor.request.type, unSetColorRequest),
      takeLatest(productActions.productsSearch.request.type, productsSearchRequest),
      takeLeading(productActions.editProduct.request.type, editProductRequest),
      takeLeading(productActions.subscribe.request.type, subscribeRequest),
      takeLeading(productActions.getFollowedProducts.request.type, getFollowedProductsRequest),
      takeLeading(productActions.approveProduct.request.type, approveProductRequest),
      takeLeading(productActions.getUnaviableList.request.type, getUnaviableListRequest),
      takeLeading(productActions.getReviews.request.type, getReviewsRequest),
      takeLeading(productActions.addReview.request.type, addReviewRequest),
      takeLeading(productActions.getProductById.request.type, getProductByIdRequest),
      takeLeading(productActions.deleteProduct.request.type, deleteProductRequest)
   ]
};