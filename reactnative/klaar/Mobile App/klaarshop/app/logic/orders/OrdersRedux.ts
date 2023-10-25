import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import { action } from '@storybook/addon-actions';
import fp from 'lodash/fp';
import { ProductT } from '~/screens/ProductsItemsScreen/ProductsItemsScreen';
import {
   addRestReducers, createRestActions,

   getDefaultRestState
} from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { CurrencyT } from '../product/ProductRedux';
import { ProductType } from '../profile/ProfileRedux';
import { CreateFromCartRestActions, GetByIdRestActions, PayOrderRestActions, SetStatusRestActions, SetOrderStatusRestActions } from './OrdersActions';

export type OrderStatusT = "waitPayment" | "inProgress" | "done";

export type CreateFromCartResponse = {

}

export type SetOrderStatusResponse = {
   message: string;
}

export type CreateFromCartPayload = {
   region: string
   city: string
   street: string
   houseNumber: string
   squareNumberOrOffice: string
   mailIndex: string
}

export type SetOrderStatusPayload = {
   orderId: string;
   newStatus: OrderStatus;
}

export type SellerBuyerT = {
   photo: string
   rating: number
   apperDate: number
   _id: string
   email: string
   fn: string
   ln: string
}

export type ProductFromOrderT = {
   _id: string
   product: {
      mainPhoto: string
      name: string
   }
   pricePerOne: number
   amount: number
   size: number
}

export type OrderByIdT = {
   apperDate: number
   _id: string
   buyer: SellerBuyerT
   seller: SellerBuyerT
   status: OrderStatusT
   products: ProductFromOrderT[]
   pricePerOne: number
   amount: number
   currency: CurrencyT
}

export type GetByIdResponse = {

}

export type GetByIdPaylaod = {
   orderId: string
   idx: number
}


export type SetStatusResponse = {

}

export type SetStatusPayload = {
   orderId: string
   newStatus: OrderStatusT
}

export type PayOrderPayload = {
   orderId: string
   orderToken: string
}


const createFromCartRestActions = createRestActions<
   typeof CreateFromCartRestActions,
   CreateFromCartResponse,
   CreateFromCartPayload
>(CreateFromCartRestActions)

const setOrderStatusRestActions = createRestActions<
   typeof SetOrderStatusRestActions,
   SetOrderStatusResponse,
   SetOrderStatusPayload
>(SetOrderStatusRestActions)


const getByIdRestActions = createRestActions<
   typeof GetByIdRestActions,
   GetByIdResponse,
   GetByIdPaylaod
>(GetByIdRestActions)


const setStatusRestActions = createRestActions<
   typeof SetStatusRestActions,
   SetStatusResponse,
   SetStatusPayload
>(SetStatusRestActions)


const payOrderRestActions = createRestActions<
   typeof PayOrderRestActions,
   { message: string },
   PayOrderPayload
>(PayOrderRestActions)


type LastOrderT = {
   waiting: boolean
   lastOrderId: string
}

type ShowNotificationT = {
   type?: `error` | `ok`
   title?: string
   isVisible: boolean
   time?: number
}

type ArrayOrdersById = {
   order: OrderByIdT
   idx: number
}

type ArrayOrdersByIdState = {
   [key: number]: OrderByIdT
} | `delete`


const OrdersActions = {
   createFromCart: createFromCartRestActions,
   setOrderStatus: setOrderStatusRestActions,
   getById: getByIdRestActions,
   setStatus: setStatusRestActions,
   payOrder: payOrderRestActions,
   lastOrder: createAction<LastOrderT>(`orders/lastOrder`),
   showNotifictaion: {
      redux: createAction<ShowNotificationT>(`orders/showNotifictaionRedux`),
      saga: createAction<ShowNotificationT>(`orders/showNotifictaionSaga`)
   },
   arrayOrdersById: createAction<ArrayOrdersById>(`orders/arrayOrdersById`)
};



type OrdersRestNodes = `createFromCart` | `getById` | `setStatus` | `payOrder` | 'setOrderStatus'
type OrderState = {
   lastOrder: LastOrderT,
   notification: ShowNotificationT,
   arrayOrdersById: ArrayOrdersByIdState
}

type OrdersState = NodeRestStateType<OrdersRestNodes, OrderState>;

const initialState: OrdersState = {
   createFromCart: getDefaultRestState<CreateFromCartResponse>(),
   getById: getDefaultRestState<GetByIdResponse>(),
   setStatus: getDefaultRestState<SetStatusResponse>(),
   setOrderStatus: getDefaultRestState(),
   payOrder: getDefaultRestState(),
   lastOrder: {
      waiting: false,
      lastOrderId: ``
   },
   notification: {
      type: undefined,
      title: ``,
      isVisible: false,
      time: 3000
   },
   arrayOrdersById: {} as ArrayOrdersByIdState
};


type Builder = ActionReducerMapBuilder<OrdersState>;

const ordersReducer = createReducer(initialState, builder =>
   (fp.flow([
      addRestReducers(createFromCartRestActions, 'createFromCart'),
      addRestReducers(getByIdRestActions, 'getById'),
      addRestReducers(setStatusRestActions, 'setStatus'),
      addRestReducers(setOrderStatusRestActions, 'setOrderStatus'),
      addRestReducers(payOrderRestActions, 'payOrder'),
   ])(builder) as Builder)
      .addCase(OrdersActions.lastOrder, (state, action) => {

         state.lastOrder = { ...state.lastOrder, waiting: action.payload.waiting, lastOrderId: action.payload.lastOrderId }
      })
      .addCase(OrdersActions.showNotifictaion.redux, (state, action) => {
         // if (action.payload.title) state.notification.title = action.payload.title
         // if (action.payload.type) state.notification.type = action.payload.type
         // if (action.payload.time) state.notification.time = action.payload.time
         state.notification = action.payload
      })
      .addCase(OrdersActions.arrayOrdersById, (state, action) => {
         if (action.payload === `delete`) {
            state.arrayOrdersById = {}
         }
         else {
            state.arrayOrdersById = { ...state.arrayOrdersById, [action.payload.idx]: action.payload.order }
         }
      })

);

export { ordersReducer, OrdersActions };
