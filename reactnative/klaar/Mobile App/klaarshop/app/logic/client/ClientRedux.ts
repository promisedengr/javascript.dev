import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import fp from 'lodash/fp';
import {
    addRestReducers, createRestActions,

    getDefaultRestState
} from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { GetClientDataActions } from './ClientActions';

export type ClientData = {
    _id: string;
    regDate: string;
    role: string;
    numReviews: number;
    numSubscribers: number;
    subscribers: any
    fn: string,
    ln: string,
    reviews: any
};

const getClientDataRestActions = createRestActions<
  typeof GetClientDataActions,  
  ClientData
>(GetClientDataActions);

const ClientActions = {
    get_data: getClientDataRestActions,
    changeStep: createAction<ClientStep>('client/changeStep'),        
};

type ClientStep = 'get_data' | 'otp';
type ClientRestNodes = ClientStep ;
type ClientStore = {
    step: ClientStep,    
};

type ClientState = NodeRestStateType<ClientRestNodes, ClientStore>;

const initialState: ClientState = {
    step: 'get_data',
    get_data: getDefaultRestState<ClientData>(),
    otp: getDefaultRestState()   
};

type Builder = ActionReducerMapBuilder<ClientState>;

const clientReducer = createReducer(initialState, builder =>
    (fp.flow([
      addRestReducers(getClientDataRestActions, 'get_data'),     
      // addRestReducers(userOtpRestActions, 'otp'),
      // addRestReducers(userProfileRestActions, 'profile'),
    ])(builder) as Builder)
    /*     .addCase(ClientActions.changeStep, (state, action) => {
        state.step = action.payload;
    })   
    .addCase(ClientActions.get_data.success, (state, action) => {
        state.get_data = action.payload;
    })  */ 
  );

export { clientReducer, ClientActions };
