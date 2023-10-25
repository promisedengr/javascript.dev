
import { restActionCreatorHelper } from "~/store/restHelper";



const cartRestActionsHelper = restActionCreatorHelper(`cart`)

export const AddProductRestActions = cartRestActionsHelper(`addProduct`)
export const СhangeProductsAmountRestActions = cartRestActionsHelper(`changeProductsAmount`)
export const GetCartListRestActions = cartRestActionsHelper(`getCart`)
export const RemoveAllProductsRestActions = cartRestActionsHelper(`removeAllProducts`)
export const RemoveProductRestActions = cartRestActionsHelper(`removeProduct`)