import { Action } from '@reduxjs/toolkit';
import { ApiResponse } from 'apisauce';
import _ from 'lodash';
import { call, delay, put, select, take } from 'redux-saga/effects';
import { api, extractError, RequestError } from '~/api';
import { BaseErrorType } from '~/store/restHelper.d';
import { takeLeading } from '~/store/sagaHelper';
import { userSelector } from '../user/UserSelectors';
import { ChatActions, GetChatListResponse, GetChatLoginResponse, GetMessagesListResponse } from './ChatsRedux';
import { chatSelector } from './ChatsSelectors';


function* getChatsListRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (ChatActions.getChatList.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getChatsList: ApiResponse<GetChatListResponse> = yield call(
            api.getChatsList,
            token,
            action.payload

         );

         if (getChatsList.data && getChatsList.ok) {
            const responseData = getChatsList.data;




            yield put(ChatActions.getChatList.success(responseData))
            yield put(ChatActions.usersInDialog())
         }

      } catch (error) {
         yield put(ChatActions.getChatList.failure(extractError(error)));
      }
   }
}

function* getChatLoginRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (ChatActions.getChatLogin.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getChatsList: ApiResponse<GetChatLoginResponse> = yield call(
            api.getChatLogin,
            token
         );

         if (getChatsList.data) {
            const responseData = getChatsList.data;

            yield put(ChatActions.getChatLogin.success(responseData));
         }

      } catch (error) {
         yield put(ChatActions.getChatLogin.failure(extractError(error)));
      }
   }
}

function* getMessagesListRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   const { getMessagesList: {
      data: messagesData
   }
   } = yield select(chatSelector)
   if (ChatActions.getMessagesList.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getChatsList: ApiResponse<GetMessagesListResponse> = yield call(
            api.getMessagesList,
            token,
            {
               ...action.payload
            }
         );

         if (getChatsList.data) {

            let responseData

            if (+action.payload.index) {
               responseData = { ...getChatsList.data, messages: [...messagesData.messages, ...getChatsList.data.messages] };
            }
            else {
               responseData = { ...getChatsList.data, messages: [...getChatsList.data.messages] }
            }



            yield put(ChatActions.getMessagesList.success(responseData));
         }

      } catch (error) {
         yield put(ChatActions.getMessagesList.failure(extractError(error)));
      }
   }
}

function* sendMessageRequest(action: Action) {
   const state = yield select(userSelector);
   let token = state.userToken;
   //let id = state.userId

   if (ChatActions.sendMessage.request.match(action)) {
      try {
         const error = {};

         if (!_.isEmpty(error)) {
            yield delay(200);
            throw new RequestError(error as BaseErrorType);
         }

         // eslint-disable-next-line @typescript-eslint/no-unused-vars
         const getChatsList: ApiResponse<GetChatLoginResponse> = yield call(
            api.sendMessage,
            token,
            action.payload

         );

         if (getChatsList.data) {
            //const responseData = getChatsList.data;

            yield put(ChatActions.sendMessage.success());
         }

      } catch (error) {
         yield put(ChatActions.sendMessage.failure(extractError(error)));
      }
   }
}


export function* ChatSaga() {
   yield* [
      takeLeading(ChatActions.getChatList.request.type, getChatsListRequest),
      takeLeading(ChatActions.getChatLogin.request.type, getChatLoginRequest),
      takeLeading(ChatActions.sendMessage.request.type, sendMessageRequest),
      takeLeading(ChatActions.getMessagesList.request.type, getMessagesListRequest),
   ];
}