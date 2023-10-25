import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import i18n from 'i18next';
import _ from 'lodash';
import { call, delay, put, select, takeLatest, take } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { UserInteractionActions } from '~/logic/userInteraction/UserInteractionRedux';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import {
   GetProfileResponse, GetProductsResponse, GetReviewsResponse,
   SubscribeResponse, UnsubscribeResponse
} from '~/types/api';
import { userInteractionSelector } from './UserInteractionSelectors';
import { userSelector } from './../user/UserSelectors';

function* getProfile(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   if (UserInteractionActions.getProfile.request.match(action)) {
      try {
         const error = {};
         let { userId } = action.payload;
         const getProfileResponse: ApiResponse<GetProfileResponse> = yield call(
            api.getProfileGet,
            token,
            userId
         );
         if (getProfileResponse.ok) {
            let data = getProfileResponse.data;
            yield put(UserInteractionActions.getProfile.success({
               fn: data?.fn,
               ln: data?.ln,
               photo: data?.photo,
               country: data?.country,
               regDate: data?.regDate,
               rating: data?.rating,
               numReviews: data?.numReviews,
               reviews: data?.reviews,
               numSubscribers: data?.numSubscribers,
               numAvaibleProducts: data?.numAvaibleProducts,
               avaibleProducts: data?.avaibleProducts,
               numSubcribeOnProducts: data?.numSubcribeOnProducts,
               numSubcribeOnUsers: data?.numSubcribeOnUsers
            }));
         } else {
            _.set(error, 'description', getProfileResponse.data?.message);
            _.set(error, 'code', getProfileResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserInteractionActions.getProfile.failure(extractError(error)))
      }
   }
}

function* getProducts(action: Action) {
   const userState = yield select(userSelector);
   const {
      getProducts: {
         data: productData
      }
   } = yield select(userInteractionSelector)

   let token = userState.userToken;
   if (UserInteractionActions.getProducts.request.match(action)) {
      try {
         const error = {};
         const getProductsResponse: ApiResponse<GetProductsResponse> = yield call(
            api.getProductsGet,
            token,
            action.payload
         );
         if (getProductsResponse.ok && !!getProductsResponse.data) {
            

            if (+action.payload.index) {
               yield put(UserInteractionActions.getProducts.success({ products: [...productData.products, ...getProductsResponse.data.products] }))
            }
            else {
               yield put(UserInteractionActions.getProducts.success(getProductsResponse.data));
            }



         } else {
            _.set(error, 'description', getProductsResponse.data?.message);
            _.set(error, 'code', getProductsResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserInteractionActions.getProducts.failure(extractError(error)))
      }
   }
}

function* getReviews(action: Action) {
   const userState = yield select(userSelector);
   const userInteractionState = yield select(userInteractionSelector);
   let token = userState.userToken;
   let index = userInteractionState.getReviews.data ? userInteractionState.getReviews.data.reviews.length.toString() : '0';
   let prevReviews = userInteractionState.getReviews.data ? userInteractionState.getReviews.data.reviews : undefined;
   if (UserInteractionActions.getReviews.request.match(action)) {
      try {
         const error = {};
         let { userId } = action.payload;
         const getReviewsResponse: ApiResponse<GetReviewsResponse> = yield call(
            api.getReviewsGet,
            token,
            userId,
            index
         );
         if (getReviewsResponse.ok) {
            let newReviews = !!prevReviews ? prevReviews.concat(getReviewsResponse.data?.reviews) : getReviewsResponse.data?.reviews;
            yield put(UserInteractionActions.getReviews.success({
               reviews: newReviews
            }));
         } else {
            _.set(error, 'description', getReviewsResponse.data?.message);
            _.set(error, 'code', getReviewsResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserInteractionActions.getReviews.failure(extractError(error)))
      }
   }
}

function* subscribe(action: Action) {
   const userState = yield select(userSelector);
   let token = userState.userToken;
   if (UserInteractionActions.subscribe.request.match(action)) {
      try {
         const error = {};
         let { userIdToSubscribe } = action.payload;
         const subscribeResponse: ApiResponse<SubscribeResponse> = yield call(
            api.subscribeGet,
            token,
            userIdToSubscribe
         );
         if (subscribeResponse.ok) {
            yield put(UserInteractionActions.subscribe.success());
         } else {
            _.set(error, 'description', subscribeResponse.data?.message);
            _.set(error, 'code', subscribeResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserInteractionActions.subscribe.failure(extractError(error)))
      }
   }
}

function* unsubscribe(action: Action) {
   const userState = yield select(userSelector);
   let token = userState.userToken;
   if (UserInteractionActions.unsubscribe.request.match(action)) {
      try {
         const error = {};
         let { userId } = action.payload;
         const unsubscribeResponse: ApiResponse<UnsubscribeResponse> = yield call(
            api.unsubscribeGet,
            token,
            userId
         );
         if (unsubscribeResponse.ok) {
            yield put(UserInteractionActions.unsubscribe.success());
         } else {
            _.set(error, 'description', unsubscribeResponse.data?.message);
            _.set(error, 'code', unsubscribeResponse.status);
            throw new RequestError(error as BaseErrorType);
         }
      } catch (error) {
         yield put(UserInteractionActions.unsubscribe.failure(extractError(error)))
      }
   }
}

export function* UserInteractionSaga() {
   yield* [
      takeLeading(UserInteractionActions.getProfile.request.type, getProfile),
      takeLeading(UserInteractionActions.getProducts.request.type, getProducts),
      takeLeading(UserInteractionActions.getReviews.request.type, getReviews),
      takeLeading(UserInteractionActions.subscribe.request.type, subscribe),
      takeLeading(UserInteractionActions.unsubscribe.request.type, unsubscribe)
   ];
}