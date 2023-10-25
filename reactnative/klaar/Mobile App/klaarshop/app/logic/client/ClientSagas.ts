import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { call, delay, put, select } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { ClientActions } from '~/logic/client/ClientRedux';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import { ClientInfoResponse } from '~/types/api';
import { userSelector } from '../user/UserSelectors';


function* getClientDataRequest(action: Action) {
    const state = yield select(userSelector);
    let token = state.userToken;
    //let id = state.userId

    if (ClientActions.get_data.request.match(action)) {
      try {        
        const error = {};          
  
        if (!_.isEmpty(error)) {
          yield delay(200);
          throw new RequestError(error as BaseErrorType);
        }
  
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const getClientDataResponse: ApiResponse<ClientInfoResponse> = yield call(
          api.getClientDataGet,
          token,
          //id       
        );
                
        if(getClientDataResponse.data) {
            const responseData = getClientDataResponse.data;
            console.log(responseData);
            yield put(ClientActions.get_data.success({
                _id: responseData._id,
                regDate: responseData.regDate,
                role: responseData.role,
                numReviews: responseData.numReviews,
                numSubscribers: responseData.numSubscribers,
                subscribers: responseData.subscribers,
                fn: responseData.fn,
                ln: responseData.ln,
                reviews: responseData.reviews
            }));
        }
        
      } catch (error) {
        yield put(ClientActions.get_data.failure(extractError(error)));
      }
    }
  }
  
  export function* ClientSaga() {
    yield* [
      takeLeading(ClientActions.get_data.request.type, getClientDataRequest),      
    ];
  }