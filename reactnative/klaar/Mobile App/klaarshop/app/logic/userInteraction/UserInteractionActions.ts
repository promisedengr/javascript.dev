export const UserInteractionGetProfileRestActions = {
  request: 'userInteraction/getProfile_request',
  success: 'userInteraction/getProfile_success',
  failure: 'userInteraction/getProfile_failure',
  needUpdate: 'userInteraction/getProfile_needUpdate',
} as const;

export const UserInteractionGetProductsRestActions = {
  request: 'userInteraction/getProducts_request',
  success: 'userInteraction/getProducts_success',
  failure: 'userInteraction/getProducts_failure',
  needUpdate: 'userInteraction/getProducts_needUpdate',
} as const;

export const UserInteractionGetReviewsRestActions = {
  request: 'userInteraction/getReviews_request',
  success: 'userInteraction/getReviews_success',
  failure: 'userInteraction/getReviews_failure',
  needUpdate: 'userInteraction/getReviews_needUpdate',
} as const;

export const UserInteractionSubscribeRestActions = {
  request: 'userInteraction/subscribe_request',
  success: 'userInteraction/subscribe_success',
  failure: 'userInteraction/subscribe_failure',
  needUpdate: 'userInteraction/subscribe_needUpdate',
} as const;

export const UserInteractionUnsubscribeRestActions = {
  request: 'userInteraction/unsubscribe_request',
  success: 'userInteraction/unsubscribe_success',
  failure: 'userInteraction/unsubscribe_failure',
  needUpdate: 'userInteraction/unsubscribe_needUpdate',
} as const;