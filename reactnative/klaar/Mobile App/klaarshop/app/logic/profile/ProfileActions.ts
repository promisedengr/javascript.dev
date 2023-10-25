import { restActionCreatorHelper } from "~/store/restHelper";



const profileRestActionsHelper = restActionCreatorHelper(`profile`)

export const ActivSellPermRestActions = profileRestActionsHelper(`activateSellerPermision`)
export const AddOrChangeDelAddrRestActions = profileRestActionsHelper(`addOrChangeDeliveryAddress`)
export const ChangeProfileRestActions = profileRestActionsHelper(`changeProfile`)
export const DeleteDelAddrRestActions = profileRestActionsHelper(`deleteDeliveryAddress`)
export const GetDeliveryAddressesRestActions = profileRestActionsHelper(`getDeliveryAddresses`)
export const GetSelfProductsRestActions = profileRestActionsHelper(`getSelfProducts`)
export const GetSelfProfileRestActions = profileRestActionsHelper(`getSelfProfile`)
export const GetSelfReviewsRestActions = profileRestActionsHelper(`getSelfReviews`)
export const GetSelfSubOnProdsRestActions = profileRestActionsHelper(`getSelfSubcribeOnProducts`)
export const GetSelfSubOnUsersRestActions = profileRestActionsHelper(`getSelfSubcribeOnUsers`)
export const GetSelfSubsRestActions = profileRestActionsHelper(`getSelfSubscribers`)
export const SetProfilePhotoRestActions= profileRestActionsHelper(`setProfilePhoto`)
export const GetSelfOrdersRestActions = profileRestActionsHelper(`getSelfOrders`) 
export const GetUnreviwedProductsRestActions = profileRestActionsHelper(`getUnreviwedProducts`)
export const GetReviwedProductsRestActions = profileRestActionsHelper(`getReviwedProducts`)