import {
   UserInteractionGetProfileRestActions, UserInteractionGetProductsRestActions,
   UserInteractionGetReviewsRestActions, UserInteractionSubscribeRestActions,
   UserInteractionUnsubscribeRestActions
} from "./UserInteractionActions";
import { ActionReducerMapBuilder, createReducer, createAction } from '@reduxjs/toolkit';
import fp from 'lodash/fp';
import {
   addRestReducers, createRestActions, getDefaultRestState
} from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { add } from "lodash";
import { ProductType } from "../profile/ProfileRedux";
import { ToggleFollowT } from "../product/ProductRedux";

type AssosiateObj = {
   youSubscribed: boolean;
   inYourCart: boolean;
   youOwner: boolean;
};

type ProfileInfo = {
   message?: string;
   fn?: string;
   ln?: string;
   photo?: string;
   country?: string;
   regDate?: string;
   rating?: number;
   numReviews?: number;
   reviews?: object[];
   numSubscribers?: number;
   numAvaibleProducts?: number;
   avaibleProducts?: object[];
   assosiate?: AssosiateObj;
   fsLink?: string;
   vkLink?: string;
   viberLink?: string;
   telegramLink?: string;
   webLink?: string;
   numSubcribeOnUsers?: number;
   numSubcribeOnProducts?: number;
};

export type ProductsInfo = {
   message?: string;
   products?: ProductType[];
};

type ReviewsInfo = {
   message?: string;
   reviews?: object[];
};

type SubscribePayload = {
   userIdToSubscribe: string;
};

type UnsubscribePayload = {
   userId: string;
};

type GetReviewsPayload = {
   userId: string;
};

export type GetProductsPayload = {
   userId: string;
   index: string
};

type GetProfilePayload = {
   userId: string;
};

const userInteractionGetProfileRestActions = createRestActions<
   typeof UserInteractionGetProfileRestActions,
   ProfileInfo,
   GetProfilePayload
>(UserInteractionGetProfileRestActions);

const userInteractionGetProductsRestActions = createRestActions<
   typeof UserInteractionGetProductsRestActions,
   ProductsInfo,
   GetProductsPayload
>(UserInteractionGetProductsRestActions);

const userInteractionGetReviewsRestActions = createRestActions<
   typeof UserInteractionGetReviewsRestActions,
   ReviewsInfo,
   GetReviewsPayload
>(UserInteractionGetReviewsRestActions);

const userInteractionSubscribeRestActions = createRestActions<
   typeof UserInteractionSubscribeRestActions,
   void,
   SubscribePayload
>(UserInteractionSubscribeRestActions);

const userInteractionUnsubscribeRestActions = createRestActions<
   typeof UserInteractionUnsubscribeRestActions,
   void,
   UnsubscribePayload
>(UserInteractionUnsubscribeRestActions);

type UserInteractionRestNodes = 'getProfile' | 'getProducts' | 'getReviews' | 'subscribe' | 'unsubscribe';
type UserInteractionStore = {
   currentState: CurrentStateT
};
type UserInteractionState = NodeRestStateType<UserInteractionRestNodes, UserInteractionStore>;


type CurrentStateT = {
   stateName: `getProducts`
}


const UserInteractionActions = {
   getProfile: userInteractionGetProfileRestActions,
   getProducts: userInteractionGetProductsRestActions,
   getReviews: userInteractionGetReviewsRestActions,
   subscribe: userInteractionSubscribeRestActions,
   unsubscribe: userInteractionUnsubscribeRestActions,
   currentState: createAction<CurrentStateT>(`userInteraction/currentState`),
   toggleFollow: createAction<ToggleFollowT>(`userInteraction/toggleFollow`),
};

const initialRestState: UserInteractionState = {
   getProfile: getDefaultRestState<ProfileInfo>(),
   getProducts: getDefaultRestState<ProductsInfo>(),
   getReviews: getDefaultRestState(),
   subscribe: getDefaultRestState(),
   unsubscribe: getDefaultRestState(),
   currentState: { stateName: `getProducts` }
};

type Builder = ActionReducerMapBuilder<UserInteractionState>;

const userInteractionReducer = createReducer(initialRestState, builder =>
   (fp.flow([
      addRestReducers(userInteractionGetProfileRestActions, 'getProfile'),
      addRestReducers(userInteractionGetProductsRestActions, 'getProducts'),
      addRestReducers(userInteractionGetReviewsRestActions, 'getReviews'),
      addRestReducers(userInteractionSubscribeRestActions, 'subscribe'),
      addRestReducers(userInteractionUnsubscribeRestActions, 'unsubscribe')
   ])(builder) as Builder)
      .addCase(UserInteractionActions.currentState, (state, action) => {
         state.currentState.stateName = action.payload.stateName
      })
      .addCase(UserInteractionActions.toggleFollow, (state, action) => {
         const { productId } = action.payload
         //console.log(`state[state.currentState.stateName].data.products`, state.currentState.stateName)

         state[state.currentState.stateName].data.products.map((d: any, idx: number) => {
            if (d._id === productId) {
               state[state.currentState.stateName].data.products[idx].youSubscribed =
                  !state[state.currentState.stateName].data.products[idx].youSubscribed
            }
         })
      })
);

export { userInteractionReducer, UserInteractionActions };