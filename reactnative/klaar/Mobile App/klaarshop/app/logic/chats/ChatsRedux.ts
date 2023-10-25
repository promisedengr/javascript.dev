import { ActionReducerMapBuilder, createAction, createReducer } from '@reduxjs/toolkit';
import { action } from '@storybook/addon-actions';
import { indexOf } from 'lodash';
import fp from 'lodash/fp';
import {
   addRestReducers, createRestActions,

   getDefaultRestState
} from '~/store/restHelper';
import { NodeRestStateType } from '~/store/restHelper.d';
import { GetChatListRestActions, GetChatLoginRestActions, GetMessagesListRestActions, SendMessageRestActions } from './ChatsActions';


export type GetChatListPayload = {
   index: number
}


type MemberT = {
   photo: string,
   rating: number,
   _id: string,
   fn: string,
   ln: string
}

export type MessageT = {
   date: number
   fromUserId: string
   fromUserName: string
   text: string
}



type ChatsT = {
   members: MemberT[]
   banned: boolean,
   apperDate: number,
   _id: string
   messages: MessageT[]
   newMessCounter?: number
}

export type GetChatListResponse = {
   chats: ChatsT[]
}

export type GetChatLoginResponse = {
   userId: string
   key: string
}

export type GetMessagesListPayload = {
   chatId: string
   index: string
}

export type GetMessagesListResponse = {
   messages: MessageT[]
}

export type SendMessagePayload = {
   chatId: string
   text: string
}




const getChatLoginRestActions = createRestActions<
   typeof GetChatLoginRestActions,
   GetChatLoginResponse,
   void
>(GetChatLoginRestActions);



const getChatListRestActions = createRestActions<
   typeof GetChatListRestActions,
   GetChatListResponse,
   GetChatListPayload
>(GetChatListRestActions);


const getMessagesListRestActions = createRestActions<
   typeof GetMessagesListRestActions,
   GetMessagesListResponse,
   GetMessagesListPayload
>(GetMessagesListRestActions);


const sendMessageRestActions = createRestActions<
   typeof SendMessageRestActions,
   void,
   SendMessagePayload
>(SendMessageRestActions);


type AddToChatListMessT = { message: MessageT, chatId: string }

type AddNewMessCounterT = {
   chatId: string
   value?: number
}

type UsersInDialogT = string[]

type MyUserIdT = string

type OnlineUsersT = string[]

type OnlineUserT = string

type IsSocketConnectedT = boolean


const ChatActions = {
   getChatList: getChatListRestActions,
   getChatLogin: getChatLoginRestActions,
   sendMessage: sendMessageRestActions,
   getMessagesList: getMessagesListRestActions,
   addMessage: createAction<MessageT>(`chats/addMessage`),
   currentChat: createAction<string>(`chats/currentChat`),
   addToChatListMess: createAction<AddToChatListMessT>(`chats/addToChatListMess`),
   addNewMessCounter: createAction<AddNewMessCounterT>(`chats/addNewMessCounter`),
   usersInDialog: createAction(`chats/usersInDialog`),
   myUserId: createAction<MyUserIdT>(`chats/myUserId`),
   addOnlineUser: createAction<OnlineUserT>(`chats/addOnlineUser`),
   deleteOnlineUser: createAction<OnlineUserT>(`chats/deleteOnlineUser`),
   deleteAllOnlineUsers: createAction(`chats/deleteAllOnlineUsers`),
   isSocketConnected: createAction<boolean>(`chats/isSocketConnected`)

};


type ChatRestNodes = 'getChatList' | 'getChatLogin' | `sendMessage` | 'getMessagesList'

type ChatStore = {
   addMessage: MessageT
   currentChat: string
   addToChatListMess: AddToChatListMessT
   addNewMessCounter: AddNewMessCounterT
   usersInDialog: UsersInDialogT
   myUserId: MyUserIdT
   onlineUsers: OnlineUsersT
   isSocketConnected: IsSocketConnectedT
};


const initialState = {
   getChatList: getDefaultRestState<GetChatListResponse>(),
   getChatLogin: getDefaultRestState<GetChatLoginResponse>(),
   sendMessage: getDefaultRestState(),
   getMessagesList: getDefaultRestState<GetMessagesListResponse>(),
   currentChat: ``,
   usersInDialog: [] as string[],
   myUserId: ``,
   onlineUsers: [] as string[],
   isSocketConnected: false
}


type ChatState = NodeRestStateType<ChatRestNodes, ChatStore>;


type Builder = ActionReducerMapBuilder<ChatState>;

const chatReducer = createReducer(initialState, builder =>
   (fp.flow([
      addRestReducers(getChatListRestActions, 'getChatList'),
      addRestReducers(getChatLoginRestActions, 'getChatLogin'),
      addRestReducers(sendMessageRestActions, 'sendMessage'),
      addRestReducers(getMessagesListRestActions, 'getMessagesList'),

   ])(builder) as Builder)
      .addCase(ChatActions.addMessage, (state, action) => {
         if (state.currentChat) {
            state.getMessagesList.data.messages = [action.payload, ...state.getMessagesList.data.messages,]
         }
      })
      .addCase(ChatActions.currentChat, (state, action) => {
         state.currentChat = action.payload
      })
      .addCase(ChatActions.addToChatListMess, (state, action) => {

         state.getChatList.data.chats.map((d: any, idx: number) => {
            if (d._id === action.payload.chatId) {
               state.getChatList.data.chats[idx].messages = [action.payload.message, ...state.getChatList.data.chats[idx].messages]
            }
         })
      })
      // .addCase(ChatActions.addNewMessCounter, (state, action) => {
      //    state.getChatList.data.chats.map((d: any, idx: number) => {
      //       if (d._id === action.payload.chatId) {
      //          if (typeof action.payload.value === `number`) {
      //             state.getChatList.data.chats[idx].newMessCounter = action.payload.value
      //          }
      //          else {
      //             if (state.getChatList.data.chats[idx].newMessCounter) {
      //                state.getChatList.data.chats[idx].newMessCounter++
      //             }
      //             else {
      //                state.getChatList.data.chats[idx].newMessCounter = 1
      //             }
      //          }

      //       }
      //    })
      // })
      .addCase(ChatActions.usersInDialog, (state, action) => {
         state.getChatList.data.chats.map((c: any) => {
            c.members.map((m: any) => {
               if ((m._id !== state.myUserId) && !state.usersInDialog.includes(m._id)) {
                  state.usersInDialog = [...state.usersInDialog, m._id]
               }
            })
         })
      })
      .addCase(ChatActions.myUserId, (state, action) => {
         state.myUserId = action.payload
      })
      .addCase(ChatActions.addOnlineUser, (state, action) => {
         if (!state.onlineUsers.includes(action.payload)) {
            state.onlineUsers = [...state.onlineUsers, action.payload]
         }
      })
      .addCase(ChatActions.deleteOnlineUser, (state, action) => {
         state.onlineUsers = state.onlineUsers.filter(i => !state.onlineUsers.includes(action.payload))
      })
      .addCase(ChatActions.deleteAllOnlineUsers, state => {
         state.onlineUsers = []
      })
      .addCase(ChatActions.isSocketConnected, (state, action) => {
         state.isSocketConnected = action.payload
      })
);

export { chatReducer, ChatActions };
