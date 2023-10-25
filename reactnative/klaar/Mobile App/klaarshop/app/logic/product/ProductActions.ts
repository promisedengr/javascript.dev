import { restActionCreatorHelper } from "~/store/restHelper";

const restActionProductHelper = restActionCreatorHelper(`product`)

export const EditProductRestActions = restActionProductHelper(`editProduct`)
export const SubscribeRestActions = restActionProductHelper(`subscribe`)
export const GetFollowedProductsRestActions = restActionProductHelper(`getFollowedProducts`)
export const ApproveProductRestActions = restActionProductHelper(`approveProduct`)
export const GetUnaviableListRestActions = restActionProductHelper(`getUnaviableList`)
export const GetReviewsRestActions = restActionProductHelper(`getReviews`)
export const AddReviewRestActions = restActionProductHelper(`addReview`)
export const GetProductByIdRestActions = restActionProductHelper(`getProductById`)

export const AddProductRestActions = {
   request: 'product/add_product_request',
   success: 'product/add_product_success',
   failure: 'product/add_product_failure',
   needUpdate: 'product/add_product_needUpdate',
} as const;

export const DeleteProductRestActions = {
   request: 'product/deleteProduct_request',
   success: 'product/deleteProduct_success',
   failure: 'product/deleteProduct_failure',
   needUpdate: 'product/deleteProduct_needUpdate'
} as const;

export const AddPhotoRestActions = {
   request: 'product/add_photo_request',
   success: 'product/add_photo_success',
   failure: 'product/add_photo_failure',
   needUpdate: 'product/add_photo_needUpdate',
} as const;

export const DeletePhotoRestActions = {
   request: 'product/deletePhoto_request',
   success: 'product/deletePhoto_success',
   failure: 'product/deletePhoto_failure',
   needUpdate: 'product/deletePhoto_needUpdate',
} as const;

export const SetColorRestActions = {
   request: 'product/setColor_request',
   success: 'product/setColor_success',
   failure: 'product/setColor_failure',
   needUpdate: 'product/setColor_needUpdate',
} as const;

export const UnSetColorRestActions = {
   request: 'product/unSetColor_request',
   success: 'product/unSetColor_success',
   failure: 'product/unSetColor_failure',
   needUpdate: 'product/unSetColor_needUpdate',
} as const;


export const ProductsSearchRestActions = {
   request: 'product/productsSearch_request',
   success: 'product/productsSearch_success',
   failure: 'product/productsSearch_failure',
   needUpdate: 'product/productsSearch_needUpdate',
} as const;