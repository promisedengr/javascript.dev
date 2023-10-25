import { restActionCreatorHelper } from "~/store/restHelper"

const chatsRestActionsHelper = restActionCreatorHelper(`orders`)

export const CreateFromCartRestActions = chatsRestActionsHelper(`createFromCart`)
export const SetOrderStatusRestActions = chatsRestActionsHelper('setOrderStatus');
export const GetByIdRestActions = chatsRestActionsHelper(`getById`)
export const SetStatusRestActions = chatsRestActionsHelper(`setStatus`)
export const PayOrderRestActions = chatsRestActionsHelper(`payOrder`)