import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import fp from 'lodash/fp';
import {
   addRestReducers, createRestActions,

   getDefaultRestState
} from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { OrderStatusT } from '../orders/OrdersRedux';
import { GetSelfOrdersPayload } from '../product/ProductRedux';
import { ActivSellPermRestActions, AddOrChangeDelAddrRestActions, ChangeProfileRestActions, DeleteDelAddrRestActions, GetDeliveryAddressesRestActions, GetReviwedProductsRestActions, GetSelfOrdersRestActions, GetSelfProductsRestActions, GetSelfProfileRestActions, GetSelfReviewsRestActions, GetUnreviwedProductsRestActions, SetProfilePhotoRestActions } from './ProfileActions';


export type DeliveryAddressesT = {
   region: string
   city: string
   street: string
   houseNumber: string
   squareNumberOrOffice: string
   mailIndex: string
}
export type AddOrChangeDelAddrPayload = {
   index: string
} & DeliveryAddressesT



export type ChangeProfilePayload = {
   fn?: string
   ln?: string
   phone?: string
   email?: string
   bday: number

}

export type DeleteDelAddrPayload = {
   index: string
}

export type DeliveryAddressesResponse = {
   deliveryAddresses: DeliveryAddressesT[]
}

export type GetSelfProductPayload = {
   index: string
}

export type ColorsType = {

   photo: string
   name: string

}[]

export type ProductType = {
   _id: string,
   approved: boolean,
   hidden: boolean,
   couldBeEdited: boolean,
   mainPhoto: string,
   photos: string[],
   sizes: number[],
   apperDate: number,
   category: {
      _id: string,
      subcategories: string[],
      apperDate: number,
      name: string,
      requiredFields: {
         colors: boolean,
         sizes: boolean
      },
      __v: number
   },
   seller: {
      _id: string,
      photo: string,
      rating: number,
      numProducts: number,
      numAvaibleProducts: number,
      apperDate: number,
      email: string,
      phone: string
      fn: string,
      ln: string,
      bday?: number
      numReviews: number,
   }
   subcategory: string,
   deliveryMethods: {
      ruPost: boolean,
      pickup: boolean
   },
   colors?: ColorsType
   name: string,
   description: string,
   currency: string,
   price: number,
   numReviews: number,
   numSubscribers: number,
   youOwner: boolean,
   youSubscribed: boolean
} 

export type GetSelfProductResponse = {
   products: ProductType[]
}

export type GetSelfProfileResponse = {
   _id: string,
   photo: string,
   rating: number,
   numProducts: number,
   numAvaibleProducts: number,
   apperDate: number,
   email: string,
   phone: string
   fn: string,
   ln: string,
   bday?: number
   numReviews: number,
   numSubscribers: number,
   numSubcribeOnProducts: number,
   numSubcribeOnUsers: number,
   youSubscribed: boolean,
   role: `seller` | `admin` | `buyer`

}

export type GetSelfReviewsResponse = {
   reviews: any
}

export type GetSelfReviewsPayload = {
   index: number
}

export type SetProfilePhotoPayload = {
   mimeType: `image/jpeg`
   data: string
   // ширина картинки : от 640 до 3840
   // высота: от 480 до 2160
   // должна иметь jpeg формат
   // вес до 2 мегабайт
}


type ClientT = {
   photo: string
   rating: number
   apperDate: number
   _id: string
   email: string
   fn: string
   ln: string
   phone?: string
}

export type ItemsT = {
   object: string
   amount: number,
   currency: string,
   description: string,
   parent: string,
   quantity: number,
   type: string
}

export type GetSelfOrdersResponse = {
   orders: {
      apperDate: number
      _id: string
      buyer: ClientT
      seller: ClientT
      status: OrderStatusT
      stripeOrder: {
         id: string
         object: string
         amount: number
         amount_returned: number | null
         application: any
         application_fee: any
         charge: any
         created: number
         currency: string
         customer: any
         email: string | null
      }
      items: ItemsT[]
   }[]
}


export type GetUnreviwedProductsResponse = {
   products: ProductType[]
}


export type GetUnreviwedProductsPayload = {
   index: number
}

export type GetReviwedProductsPayload = {
   index: number
}

export type GetReviwedProductsResponse = {
   products: ProductType[]
}


const getUnreviwedProductsRestActions = createRestActions<
   typeof GetUnreviwedProductsRestActions,
   GetUnreviwedProductsResponse,
   GetUnreviwedProductsPayload
>(GetUnreviwedProductsRestActions);

const addOrChangeDelAddrRestActions = createRestActions<
   typeof AddOrChangeDelAddrRestActions,
   void,
   AddOrChangeDelAddrPayload
>(AddOrChangeDelAddrRestActions);


const changeProfileRestActions = createRestActions<
   typeof ChangeProfileRestActions,
   void,
   ChangeProfilePayload
>(ChangeProfileRestActions);

const deleteDelAddrRestActions = createRestActions<
   typeof DeleteDelAddrRestActions,
   void,
   DeleteDelAddrPayload
>(DeleteDelAddrRestActions);


const getDeliveryAddressesRestActions = createRestActions<
   typeof GetDeliveryAddressesRestActions,
   DeliveryAddressesResponse,
   void
>(GetDeliveryAddressesRestActions);


const getSelfProductsRestActions = createRestActions<
   typeof GetSelfProductsRestActions,
   GetSelfProductResponse,
   GetSelfProductPayload
>(GetSelfProductsRestActions);

const getSelfProfileRestActions = createRestActions<
   typeof GetSelfProfileRestActions,
   GetSelfProfileResponse,
   void
>(GetSelfProfileRestActions);

const getSelfReviewsRestActions = createRestActions<
   typeof GetSelfReviewsRestActions,
   GetSelfReviewsResponse,
   GetSelfReviewsPayload
>(GetSelfReviewsRestActions)

const setProfilePhotoRestActions = createRestActions<
   typeof SetProfilePhotoRestActions,
   void,
   SetProfilePhotoPayload
>(SetProfilePhotoRestActions)

const activSellPermRestActions = createRestActions<
   typeof ActivSellPermRestActions,
   void,
   void
>(ActivSellPermRestActions)


const getSelfOrdersRestActions = createRestActions<
   typeof GetSelfOrdersRestActions,
   GetSelfOrdersResponse,
   GetSelfOrdersPayload
>(GetSelfOrdersRestActions);



const getReviwedProductsRestActions = createRestActions<
   typeof GetReviwedProductsRestActions,
   GetReviwedProductsResponse,
   GetReviwedProductsPayload
>(GetReviwedProductsRestActions);

type LocalStatusChangeT = {
   orderId: string
   status: `waitShipment` | `shipping` | `done`
}


const ProfileActions = {
   addOrChangeDeliveryAddress: addOrChangeDelAddrRestActions,
   changeProfile: changeProfileRestActions,
   deleteDelAddr: deleteDelAddrRestActions,
   deliveryAddresses: getDeliveryAddressesRestActions,
   getSelfProducts: getSelfProductsRestActions,
   getSelfProfile: getSelfProfileRestActions,
   getSelfReviews: getSelfReviewsRestActions,
   setProfilePhoto: setProfilePhotoRestActions,
   activSellPerm: activSellPermRestActions,
   getSelfOrders: getSelfOrdersRestActions,
   getUnreviwedProducts: getUnreviwedProductsRestActions,
   localStatusChange: createAction<LocalStatusChangeT>(`profile/localStatusChange`),
   getReviwedProducts: getReviwedProductsRestActions,
};

// type ClientStep = 'get_data' | 'otp';
// type ClientRestNodes = ClientStep ;
// type ClientStore = {
//     step: ClientStep,    
// };

// type ClientState = NodeRestStateType<ClientRestNodes, ClientStore>;

const initialState = {
   addOrChangeDeliveryAddress: getDefaultRestState(),
   changeProfile: getDefaultRestState(),
   deleteDelAddr: getDefaultRestState(),
   deliveryAddresses: getDefaultRestState<DeliveryAddressesResponse>(),
   getSelfProducts: getDefaultRestState<GetSelfProductResponse>(),
   getSelfProfile: getDefaultRestState<GetSelfProfileResponse>(),
   getSelfReviews: getDefaultRestState<GetSelfReviewsResponse>(),
   setProfilePhoto: getDefaultRestState(),
   activSellPerm: getDefaultRestState(),
   getSelfOrders: getDefaultRestState<GetSelfOrdersResponse>(),
   getUnreviwedProducts: getDefaultRestState<GetUnreviwedProductsResponse>(),
   getReviwedProducts: getDefaultRestState<GetReviwedProductsResponse>(),
};

type Builder = ActionReducerMapBuilder<typeof initialState>;

const profileReducer = createReducer(initialState, builder =>
   (fp.flow([
      addRestReducers(addOrChangeDelAddrRestActions, 'addOrChangeDeliveryAddress'),
      addRestReducers(changeProfileRestActions, 'changeProfile'),
      addRestReducers(deleteDelAddrRestActions, 'deleteDelAddr'),
      addRestReducers(getDeliveryAddressesRestActions, 'deliveryAddresses'),
      addRestReducers(getSelfProductsRestActions, 'getSelfProducts'),
      addRestReducers(getSelfProfileRestActions, 'getSelfProfile'),
      addRestReducers(getSelfReviewsRestActions, 'getSelfReviews'),
      addRestReducers(setProfilePhotoRestActions, 'setProfilePhoto'),
      addRestReducers(activSellPermRestActions, 'activSellPerm'),
      addRestReducers(getSelfOrdersRestActions, 'getSelfOrders'),
      addRestReducers(getUnreviwedProductsRestActions, 'getUnreviwedProducts'),
      addRestReducers(getReviwedProductsRestActions, 'getReviwedProducts'),


   ])(builder) as Builder)
      .addCase(ProfileActions.localStatusChange, (state, action) => {
         state.getSelfOrders.data.orders = state.getSelfOrders.data?.orders.map(d => d._id === action.payload.orderId ? { ...d, status: action.payload.status } : d)
      })

);

export { profileReducer, ProfileActions };
