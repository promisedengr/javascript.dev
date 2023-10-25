import { ApisauceInstance } from 'apisauce';
import { CategoriesListPayload, CreateCategoryPayload, GetByIdPayload, SubCategoryPayload } from '~/logic/categories/categories/CategoriesRedux';
import { AddPhotoPayload, DeletePhotoPayload, ProductDataPayload, ProductsSearchPayload, SetColorPayload, UnSetColorPayload, DeleteProductPayload } from '~/logic/product/ProductRedux';
import { AddOrChangeDelAddrPayload, ChangeProfilePayload, DeleteDelAddrPayload, GetSelfProductPayload, ProductType } from '~/logic/profile/ProfileRedux';
import { ProductsInfo } from '~/logic/userInteraction/UserInteractionRedux';
import { OrderStatus } from '~/logic/orders/OrdersRedux'; 


export const TOKEN_ERROR = 'TOKEN_ERROR';
export const LOGIN_URL = '/login';
export const VERIFY_OTP_URL = '/verifyOtp';
export const REFRESH_TOKEN_URL = '/refreshToken';
export const REGISTER_URL = '/registration'
export const ACTIVATE_URL = `/activate`
export const FORGOT_PASSWORD_URL = '/forgotPassword'
export const PASS_RECOVERY_URL = '/passRecovery'
export const ADD_URL = `/add`
export const PHOTOS_URL = `/photos`
export const COLORS_URL = `/colors`
export const SEARCH_URL = `/search`
export const ADD_SUBCATEGORY_URL = `/addSubcategory`
export const CREATE_URL = `/create`
export const LIST_URL = `/list`
export const DELIVERY_ADDRESSES_URL = `/deliveryAddresses`
export const CHANGE_URL = `/change`
export const PRODUCTS_URL = `/products`
export const REVIEWS_URL = `/reviews`
export const SET_PHOTO_URL = `/setPhoto`
export const START_CHATTING_URL = `/startChatting`
export const MESSAGES_URL = `/messages`
export const MESSAGE_URL = `/message`
export const EDIT_URL = `/edit`
export const ADD_PRODUCT_URL = `/addProduct`
export const CHANGE_AMOUNT_URL = `/changeAmount`
export const SUBSCRIBE_URL = `/subscribe`
export const UNSUBSCRIBE_URL = `/unsubscribe`
export const SUBSCRIBE_ON_PRODUCTS = `/subcribeOnProducts`
export const UNAVIABLE_URL = `/unaviable`
export const ACTIVATE_SELLER_PERMISSION_URL = `/activateSellerPermision`
export const ADD_REVIEW_URL = `/addReview`
export const CREATE_FROM_CART_URL = `/createFromCart`
export const SET_STATUS_URL = `/setStatus`
export const ORDERS_URL = `/orders`
export const PAY_URL = `/pay`
export const UNREVIEWED_URL = `/unreviwed`
export const REVIEWED_URL = `/reviwed`
export const CHECK_URL = `/check`



export interface ApiManager {
   sauce: ApisauceInstance;
}

export type TokenResponse = {
   accessToken: string;
   refreshToken: string;
};

export type ResponseError = {
   error: number;
};

export type RefreshTokenPostRequest = { refreshToken: string };
export type TokenPostResponse = TokenResponse & ResponseError;

export type SaltPostResponse = {
   salt: string;
   accessToken: string;
} & ResponseError;

export enum LoginType {
   nothing = 0,
   password = 1,
   pin = 2,
   fingerPrint = 3,
   faceId = 5,
}

export type LoginRequest = {
   email: string;
   passw: any;
};

export type SetOrderStatusRequest = {
   orderId: string;
   newStatus: OrderStatus;
}

export type SetOrderStatusResponse = {
   message: string;
}

export type GoogleLoginRequest = {
   access_token: string;
};

export type FacebookLoginRequest = {
   access_token: string;
};

export type RegisterRequest = { fn: string, ln: string, email: string, passw: any };

export type OtpVerifyRequest = { email: string, code: string };

export enum LoginAccessType {
   nothing = 0,
   otpCode = 1,
};

export type RegisterResponseErrorType = {
   value?: string;
   msg?: string;
   param?: string;
   location?: string;
};

export type RegisterResponse = {
   message: string;
   roflanCode?: string;
   errors?: RegisterResponseErrorType[];
};

export type ForgotPasswordRequest = {
   email: string;
};

export type PasswordRecoveryRequest = {
   userId: string;
   code: string;
   passw: any;
};

export type ForgotPasswordResponse = {
   message?: string;
   userId?: string;
   roflanCode?: string;
};

export type PasswordRecoveryResponse = {
   message: string;
};

export type SendOtpResponse = {
   message: string;
   roflanCode?: string;
};

export type OtpVerifyResponse = {
   message: string;
};

export type LoginResponse = {
   userId: string;
   activated: boolean;
   userRole: string;
   access_token: string;
   token_type: string;
   message?: string;
};

export type GoogleLoginResponse = {
   message?: string;
   userId?: string;
   activated?: boolean;
   userRole?: string;
   access_token?: string;
   token_type?: string;
};

export type FacebookLoginResponse = {
   message?: string;
   userId?: string;
   activated?: boolean;
   userRole?: string;
   access_token?: string;
   token_type?: string;
};

export type ResendOtpCodeRequest = {
   email: string;
};

export type TokenRelevanceCheckResponse = {
   message?: string;
   relevance?: boolean;
   activated?: boolean;
};

export type ResendOtpCodeResponse = {
   message: string;
};

export type LogoutResponse = {
   message: string;
};

export type ClientDataResponse = {
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

export type ClientInfoResponse = ClientDataResponse & ResponseError;

export type AddProductRequest = ProductDataPayload

export type AddPhotoRequest = AddPhotoPayload
export type DeletePhotoRequest = DeletePhotoPayload
export type DeleteProductRequest = DeleteProductPayload
export type SetColorRequest = SetColorPayload
export type UnSetColorRequest = UnSetColorPayload
export type ProductsSearchRequest = ProductsSearchPayload
export type SubCategoryRequest = SubCategoryPayload
export type CreateCategoryRequest = CreateCategoryPayload
export type GetByIdRequest = GetByIdPayload
export type CategoriesListRequest = CategoriesListPayload
export type AddOrChangeDelAddrRequest = AddOrChangeDelAddrPayload
export type ChangeProfileRequest = ChangeProfilePayload
export type DeleteDelAddrRequest = DeleteDelAddrPayload
export type GetSelfProductRequest = GetSelfProductPayload

export type AddProductResponseTypes = {
   approved: boolean,
   hidden: boolean,
   couldBeEdited: boolean,
   mainPhoto: string,
   photos: string[],
   subscribers: any[],
   sizes: string[],
   buyers: any[],
   apperDate: number,
   _id: string,
   category: string,
   subcategory: string,
   colors: string[],
   seller: string,
   deliveryMethods: {
      ruPost: boolean,
      pickup: boolean
   },
   reviews: [],
   name: string,
   description: string,
   currency: string,
   price: number,
   __v: number
}

type AssosiateObj = {
   youSubscribed: boolean;
   inYourCart: boolean;
   youOwner: boolean;
};

export type AddProductResponseData = AddProductResponseTypes & ResponseError;
export type GetProfileResponse = {
   message?: string;
   fn?: string;
   ln?: string;
   photo?: string;
   country?: string;
   regDate?: string;
   rating?: number;
   numReviews?: number;
   reviews?: object[];
   numSubscribers?: number;
   numAvaibleProducts?: number;
   avaibleProducts?: object[];
   assosiate?: AssosiateObj;
   fsLink?: string;
   vkLink?: string;
   viberLink?: string;
   telegramLink?: string;
   webLink?: string;
   numSubcribeOnProducts?: number;
   numSubcribeOnUsers?: number;
};

export type DeleteProductResponse = {
   message: string;
};

export type GetProductsResponse = ProductsInfo

export type GetReviewsResponse = {
   message?: string;
   reviews?: object[];
};

export type SubscribeResponse = {
   message: string;
};

export type UnsubscribeResponse = {
   message: string;
};

