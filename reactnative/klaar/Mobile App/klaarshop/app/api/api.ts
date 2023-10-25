import { create } from 'apisauce';
import { getConfig } from '~/config/Config';
import { AddProductPayload, ChangeProductsAmountPayload, GetCartListResponse, RemoveProductPayload } from '~/logic/cart/CartRedux';
import { CategoriesListResponse, CategoryT, GetByIdPayload } from '~/logic/categories/categories/CategoriesRedux';
import { GetChatListPayload, GetChatListResponse, GetChatLoginResponse, GetMessagesListPayload, GetMessagesListResponse, SendMessagePayload } from '~/logic/chats/ChatsRedux';
import { CreateFromCartPayload, CreateFromCartResponse, GetByIdPaylaod, GetByIdResponse, PayOrderPayload, SetStatusPayload, SetStatusResponse } from '~/logic/orders/OrdersRedux';
import {
   AddReviewPayload, AddReviewResponse, ApproveProductPayload, ApproveProductResponse, EditProductPayload, GetFollowedProductsPayload,
   GetProductByIdPayload,
   GetProductByIdResponse,
   GetReviewsPayload, GetSelfOrdersPayload, GetUnaviableListPayload, SubscribePayload
} from '~/logic/product/ProductRedux';
import { DeliveryAddressesResponse, GetReviwedProductsPayload, GetReviwedProductsResponse, GetSelfProfileResponse, GetSelfReviewsPayload, GetSelfReviewsResponse, GetUnreviwedProductsPayload, GetUnreviwedProductsResponse, SetProfilePhotoPayload } from '~/logic/profile/ProfileRedux';
import { GetByIdUserPayload, GetByIdUserResponse, StartChattingPayload, StartChattingResponse, TokenCheckPayload } from '~/logic/user/UserRedux';
import { GetProductsPayload } from '~/logic/userInteraction/UserInteractionRedux';
import {
   AddProductRequest,
   AddProductResponseData,
   ClientInfoResponse,
   ForgotPasswordRequest,
   ForgotPasswordResponse,
   LoginRequest,
   LoginResponse,
   LOGIN_URL,
   LogoutResponse,
   OtpVerifyRequest, OtpVerifyResponse,
   PasswordRecoveryRequest,
   PasswordRecoveryResponse,
   RegisterRequest,
   RegisterResponse, ResendOtpCodeRequest,
   ResendOtpCodeResponse,
   TokenRelevanceCheckResponse,
   GetProfileResponse,
   GetProductsResponse,
   GetReviewsResponse,
   FacebookLoginResponse,
   FacebookLoginRequest,
   SetOrderStatusRequest,
   SetOrderStatusResponse,
   SubscribeResponse,
   DeleteProductRequest,
   DeleteProductResponse,
   UnsubscribeResponse,
   GoogleLoginRequest,
   GoogleLoginResponse,
   REGISTER_URL,
   ACTIVATE_URL,
   FORGOT_PASSWORD_URL,
   PASS_RECOVERY_URL,
   ADD_URL,
   AddPhotoRequest,
   PHOTOS_URL,
   DeletePhotoRequest,
   SetColorRequest,
   COLORS_URL,
   ProductsSearchRequest,
   SEARCH_URL,
   SubCategoryRequest,
   ADD_SUBCATEGORY_URL,
   CREATE_URL,
   CreateCategoryRequest,
   GetByIdRequest,
   CategoriesListRequest,
   LIST_URL,
   AddOrChangeDelAddrRequest,
   ChangeProfileRequest,
   CHANGE_URL,
   DeleteDelAddrRequest,
   GetSelfProductRequest,
   PRODUCTS_URL,
   REVIEWS_URL,
   SET_PHOTO_URL,
   START_CHATTING_URL,
   MESSAGES_URL,
   MESSAGE_URL,
   DELIVERY_ADDRESSES_URL,
   EDIT_URL,
   ADD_PRODUCT_URL,
   CHANGE_AMOUNT_URL,
   SUBSCRIBE_URL,
   UNSUBSCRIBE_URL,
   SUBSCRIBE_ON_PRODUCTS,
   UNAVIABLE_URL,
   ACTIVATE_SELLER_PERMISSION_URL,
   ADD_REVIEW_URL,
   CREATE_FROM_CART_URL,
   SET_STATUS_URL,
   ORDERS_URL,
   UNREVIEWED_URL,
   REVIEWED_URL,
   CHECK_URL
} from '~/types/api';
import { PAY_URL } from '../types/api';
import { errorResponseTransform } from './errorResponseTransform';

const config = getConfig();

const tokenConst = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmY4NzBhNTgyNDE2MTcyZDI2ZjI2NzMiLCJzZXNzaW9uSWQiOiJwbTRhenZ2NSIsInVzZXJSb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTE3NjE0NzUsImV4cCI6MTYxNDM1MzQ3NX0.FoIRwNGsTjZYEXwKWvAlCI9V900v2Cyi58va1dnSQmg"


const sauce = create({
   baseURL: config.baseURL,
   headers: { Accept: 'application/json' },
   //Authorization: `Bearer ${token}
});

sauce.addResponseTransform(errorResponseTransform);

const url = `http://167.99.41.6/api`

const authAPI = `${url}/auth`;
const userDataAPI = `${url}/users`
const productAPI = `${url}/products`
const userInteractionAPI = `${url}/users`
const categoriesAPI = `${url}/categories`
const profileAPI = `${url}/profile`
const chatsAPI = `${url}/chats`
const cartAPI = `${url}/cart`
const ordersAPI = `${url}/orders`

const api = {
   sauce,
   loginPost: function (params: LoginRequest) {
      return sauce.post<LoginResponse>(LOGIN_URL, params, {
         baseURL: authAPI,
      });
   },
   setOrderStatusPost: function (token: string, params: SetOrderStatusRequest) {
      return sauce.post<SetOrderStatusResponse>(`/${params.orderId}/setStatus`, params, {
         baseURL: ordersAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   googleLoginPost: function (params: GoogleLoginRequest) {
      return sauce.post<GoogleLoginResponse>('/googleLogin', params, {
         baseURL: authAPI,
      });
   },
   facebookLoginPost: function (params: FacebookLoginRequest) {
      return sauce.post<FacebookLoginResponse>('/facebookLogin', params, {
         baseURL: authAPI,
      });
   },
   registerPost: function (params: RegisterRequest) {
      return sauce.post<RegisterResponse>(REGISTER_URL, params, {
         baseURL: authAPI,
      });
   },
   resendOtpCodePost: function (params: ResendOtpCodeRequest) {
      return sauce.post<ResendOtpCodeResponse>('/resendCode', params, {
         baseURL: authAPI,
      });
   },
   OtpVerifyPost: function (params: OtpVerifyRequest) {
      return sauce.post<OtpVerifyResponse>(ACTIVATE_URL, params, {
         baseURL: authAPI,
      });
   },
   logoutGet: function (token: string) {
      const sauceAuthorized = create({
         baseURL: authAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         },
      });
      return sauceAuthorized.get<LogoutResponse>('/logout', {
         baseURL: authAPI,
      });
   },
   getClientDataGet: function (token: string) {
      return sauce.get<ClientInfoResponse>(`/user/5f32f247e2b8c223fb5877fa`, {
         /* baseURL: userDataAPI, */
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   addProductPost: function (token: string = tokenConst, params: AddProductRequest,) {
      console.log(`create`)
      return sauce.post<AddProductResponseData>(CREATE_URL, params, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   editProduct: function (token: string = tokenConst, params: EditProductPayload,) {
      const { productId, ...restParams } = params
      return sauce.post<{ message: string }>(`/${productId}${EDIT_URL}`, restParams, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },


   addPhotoPost: function (token: string, params: AddPhotoRequest,) {
      const { index, productId, data, ...restParams } = params
      const photo = data.split(`data:image/jpeg;base64,`)[1]

      console.log(`photoAPI:`, photo)

      return sauce.post<AddProductResponseData>(`/${productId}${PHOTOS_URL}/${index}`, { ...restParams, data: photo }, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   deletePhoto: function (token: string = tokenConst, params: DeletePhotoRequest,) {
      const { index, productId } = params
      return sauce.delete<AddProductResponseData>(`/${productId}${PHOTOS_URL}/${index}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   getProfileGet: function (token: string, userId: string) {
      let param = '/' + userId;
      const sauceAuthorized = create({
         baseURL: userInteractionAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         },
      });
      return sauceAuthorized.get<GetProfileResponse>(param, {});
   },
   getProductsGet: function (token: string, params: GetProductsPayload) {
      const { userId, index } = params
      let param = '/' + userId + PRODUCTS_URL + `/` + index;
      const sauceAuthorized = create({
         baseURL: userInteractionAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         },
      });
      return sauceAuthorized.get<GetProductsResponse>(param, {});
   },
   getReviewsGet: function (token: string, userId: string, index: string) {
      let param = '/' + userId + '/getReviews/' + index;
      const sauceAuthorized = create({
         baseURL: userInteractionAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         },
      });
      return sauceAuthorized.get<GetReviewsResponse>(param, {});
   },
   unsubscribeGet: function (token: string, userId: string) {
      let param = '/' + userId + '/unsubscribe';
      const sauceAuthorized = create({
         baseURL: userInteractionAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         },
      });
      return sauceAuthorized.get<UnsubscribeResponse>(param, {});
   },
   tokenRelevanceCheckGet: function (token: string) {
      const sauceAuthorized = create({
         baseURL: authAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         },
      });
      return sauceAuthorized.get<TokenRelevanceCheckResponse>('/tokenRelevance', {
      });
   },
   forgotPasswordPost: function (params: ForgotPasswordRequest) {
      return sauce.post<ForgotPasswordResponse>(FORGOT_PASSWORD_URL, params, {
         baseURL: authAPI,
      });
   },
   passwordRecoveryPost: function (params: PasswordRecoveryRequest) {
      return sauce.post<PasswordRecoveryResponse>(PASS_RECOVERY_URL, params, {
         baseURL: authAPI,
      });
   },
   setColorPost: function (token: string, params: SetColorRequest,) {
      const { index, productId, data, ...restParams } = params
      const photo = data.split(`data:image/jpeg;base64,`)[1]
      return sauce.post<AddProductResponseData>(`/${productId}${COLORS_URL}/${index}`, { ...restParams, data: photo }, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   unSetColorDelete: function (token: string, params: DeletePhotoRequest,) {
      const { index, productId } = params
      return sauce.delete<AddProductResponseData>(`/${productId}${COLORS_URL}/${index}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   deleteProduct: function (token: string, params: DeleteProductRequest) {
      const { productId } = params
      return sauce.delete<DeleteProductResponse>(`/${productId}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   productsSearchPost: function (token: string, params: ProductsSearchRequest,) {
      const { index, ...restParams } = params
      const indexDefault = index ? index : 0
      return sauce.post<AddProductResponseData>(`${SEARCH_URL}`, { index: indexDefault, ...restParams }, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      });
   },
   postSubCategories: function (token: string, params: SubCategoryRequest) {
      const { categotyId, subcategory } = params

      return sauce.post<AddProductResponseData>(`/${categotyId}${ADD_SUBCATEGORY_URL}`, subcategory, {
         baseURL: categoriesAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   postCreateCategory: function (token: string, params: CreateCategoryRequest) {

      return sauce.post<AddProductResponseData>(CREATE_URL, params, {
         baseURL: categoriesAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getByIdCategory: function (token: string, params: GetByIdRequest) {
      const { categoryId } = params
      return sauce.get<CategoryT>(`/${categoryId}`, {}, {
         baseURL: categoriesAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getCategoriesList: function (token: string, params: CategoriesListRequest) {
      const { index } = params
      return sauce.get<CategoriesListResponse>(`${LIST_URL}/${index}`, {}, {
         baseURL: categoriesAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   postAddOrChangeDelAddr: function (token: string = tokenConst, params: AddOrChangeDelAddrRequest) {
      const { index, ...restParams } = params
      return sauce.post<{ message: string }>(`${DELIVERY_ADDRESSES_URL}/${index}`, restParams, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   postChangeProfile: function (token: string = tokenConst, params: ChangeProfileRequest) {
      return sauce.post<CategoriesListResponse>(CHANGE_URL, params, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   deleteDelAddr: function (token: string, params: DeleteDelAddrRequest) {
      const { index } = params
      return sauce.delete<CategoriesListResponse>(`${DELIVERY_ADDRESSES_URL}/${index}`, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getDeliveryAddresses: function (token: string = tokenConst) {

      return sauce.get<DeliveryAddressesResponse>(DELIVERY_ADDRESSES_URL, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getSelfProducts: function (token: string = tokenConst, params: GetSelfProductRequest) {
      const { index } = params
      return sauce.get<CategoriesListResponse>(`${PRODUCTS_URL}/${index}`, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getSelfProfile: function (token: string = tokenConst) {
      return sauce.get<GetSelfProfileResponse>(``, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getSelfReviews: function (token: string, params: GetSelfReviewsPayload) {
      const { index } = params
      return sauce.get<GetSelfReviewsResponse>(`${REVIEWS_URL}/${index}`, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   setProfilePhoto: function (token: string, params: SetProfilePhotoPayload) {
      const paramsEdited = { ...params, data: params.data.split(`data:image/jpeg;base64,`)[1] }
      return sauce.post<any>(SET_PHOTO_URL, paramsEdited, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getByIdUser: function (params: GetByIdUserPayload) {
      const { userId } = params
      return sauce.get<GetByIdUserResponse>(`/${userId}`, {}, {
         baseURL: userDataAPI,
         headers: {
            Accept: 'application/json',
         }
      })
   },
   startChatting: function (token: string, params: StartChattingPayload) {
      const { userId } = params
      return sauce.get<StartChattingResponse | { message: string }>(`/${userId}${START_CHATTING_URL}`, {}, {
         baseURL: userDataAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getChatsList: function (token: string = tokenConst, params: GetChatListPayload) {
      const { index } = params
      return sauce.get<GetChatListResponse | { message: string }>(`${LIST_URL}/${index}`, {}, {
         baseURL: chatsAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getChatLogin: function (token: string = tokenConst) {

      return sauce.get<GetChatLoginResponse | { message: string }>(LOGIN_URL, {}, {
         baseURL: chatsAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getMessagesList: function (token: string = tokenConst, params: GetMessagesListPayload) {
      const { chatId, index } = params
      return sauce.get<GetMessagesListResponse>(`/${chatId}${MESSAGES_URL}/${index}`, {}, {
         baseURL: chatsAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   sendMessage: function (token: string = tokenConst, params: SendMessagePayload) {
      const { chatId, text } = params
      return sauce.post<{ message: string }>(`/${chatId}${MESSAGE_URL}`, { text }, {
         baseURL: chatsAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   addProduct: function (token: string = tokenConst, params: AddProductPayload) {
      return sauce.post<{ message: string }>(ADD_PRODUCT_URL, params, {
         baseURL: cartAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   changeProductsAmount: function (token: string = tokenConst, params: ChangeProductsAmountPayload) {
      return sauce.post<{ message: string }>(`${PRODUCTS_URL}${CHANGE_AMOUNT_URL}`, params, {
         baseURL: cartAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getCartList: function (token: string = tokenConst) {
      return sauce.get<GetCartListResponse>(`/`, {}, {
         baseURL: cartAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   removeAllProducts: function (token: string = tokenConst) {
      return sauce.delete<{ message: string }>(PRODUCTS_URL, {}, {
         baseURL: cartAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   removeProduct: function (token: string = tokenConst, params: RemoveProductPayload) {
      return sauce.delete<{ message: string }>(`${PRODUCTS_URL}/${params.index}`, {}, {
         baseURL: cartAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   subscribeGet: function (token: string = tokenConst, params: SubscribePayload) {

      const SUB_URL = params.isFavorite ? UNSUBSCRIBE_URL : SUBSCRIBE_URL

      return sauce.get<SubscribeResponse>(`/${params.productId}${SUB_URL}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getFollowedProducts: function (token: string = tokenConst, params: GetFollowedProductsPayload) {

      return sauce.get<SubscribeResponse>(`${SUBSCRIBE_ON_PRODUCTS}/${params.index}`, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   approveProduct: function (token: string = tokenConst, params: ApproveProductPayload) {
      return sauce.get<ApproveProductResponse>(`${params.productId}/${params.type}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getUnaviableList: function (token: string = tokenConst, params: GetUnaviableListPayload) {
      return sauce.get<ApproveProductResponse>(`${UNAVIABLE_URL}${LIST_URL}/${params.index}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   activSellPerm: function (token: string = tokenConst) {
      return sauce.get<ApproveProductResponse>(ACTIVATE_SELLER_PERMISSION_URL, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getReviews: function (token: string, params: GetReviewsPayload) {
      const { index, productId } = params
      return sauce.get<GetReviewsResponse>(`/${productId}${REVIEWS_URL}${LIST_URL}/${index}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   addReview: function (token: string, params: AddReviewPayload) {
      const { productId, ...restParams } = params
      return sauce.post<AddReviewResponse>(`/${productId}${ADD_REVIEW_URL}`, restParams, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   createFromCart: function (token: string, params: CreateFromCartPayload) {

      return sauce.post<CreateFromCartResponse>(CREATE_FROM_CART_URL, params, {
         baseURL: ordersAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getByIdOrder: function (token: string, params: GetByIdPaylaod) {
      const { orderId } = params

      return sauce.get<GetByIdResponse>(`/${orderId}`, {}, {
         baseURL: ordersAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   setStatusOrder: function (token: string, params: SetStatusPayload) {
      const { orderId, newStatus } = params

      return sauce.post<SetStatusResponse>(`/${orderId}${SET_STATUS_URL}`, { newStatus }, {
         baseURL: ordersAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   payOrder: function (token: string, params: PayOrderPayload) {
      const { orderId, orderToken } = params
      console.log(`orderId`, orderId)

      return sauce.post<SetStatusResponse>(`/${orderId}${PAY_URL}`, { token: orderToken }, {
         baseURL: ordersAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getSelfOrders: function (token: string, params: GetSelfOrdersPayload) {
      return sauce.get<SetStatusResponse>(`${ORDERS_URL}${LIST_URL}/${params.index}`, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getUnreviwedProducts: function (token: string, params: GetUnreviwedProductsPayload) {
      return sauce.get<GetUnreviwedProductsResponse>(`${PRODUCTS_URL}${UNREVIEWED_URL}/${params.index}`, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getProductById: function (token: string, params: GetProductByIdPayload) {

      return sauce.get<GetProductByIdResponse>(`/${params.productId}`, {}, {
         baseURL: productAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   getReviwedProducts: function (token: string, params: GetReviwedProductsPayload) {
      return sauce.get<GetReviwedProductsResponse>(`${PRODUCTS_URL}${REVIEWED_URL}/${params.index}`, {}, {
         baseURL: profileAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },
   tokenCheck: function (token: string) {
      return sauce.get<TokenCheckPayload>(CHECK_URL, {}, {
         baseURL: authAPI,
         headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
         }
      })
   },


};



export { api };

