
import { restActionCreatorHelper } from "~/store/restHelper";



const chatsRestActionsHelper = restActionCreatorHelper(`chats`)

export const GetChatListRestActions = chatsRestActionsHelper(`getChatList`)
export const GetChatLoginRestActions = chatsRestActionsHelper(`getChatLogin`)
export const GetMessagesListRestActions = chatsRestActionsHelper(`getMessagesList`)
export const SendMessageRestActions = chatsRestActionsHelper(`sendMessage`)