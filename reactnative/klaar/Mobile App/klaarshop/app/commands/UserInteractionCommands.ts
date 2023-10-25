import { CustomCommand } from 'reactotron-core-client';
import { UserInteractionActions } from '~/logic/userInteraction/UserInteractionRedux';
import { store } from '~/store/store';

const GetProfileCommand: CustomCommand = {
  command: 'Get users profile',
  description: 'No description provided',
  handler: () => {
    store.dispatch(
      UserInteractionActions.getProfile.request({
        userId: '5f2d2ed2fb0cca0444e175b7'
      }),
    );
  },
};

const GetProductsCommand: CustomCommand = {
  command: 'Get users products',
  description: 'No description provided',
  handler: () => {
    store.dispatch(
      UserInteractionActions.getProducts.request({
        userId: '5f2d2ed2fb0cca0444e175b7'
      }),
    );
  },
};

const GetReviewsCommand: CustomCommand = {
  command: 'Get users reviews',
  description: 'No description provided',
  handler: () => {
    store.dispatch(
      UserInteractionActions.getReviews.request({
        userId: '5f2d2ed2fb0cca0444e175b7'
      }),
    );
  },
};

const SubscribeCommand: CustomCommand = {
  command: 'Subscribe to another user',
  description: 'No description provided',
  handler: () => {
    store.dispatch(
      UserInteractionActions.subscribe.request({
        userIdToSubscribe: '5f2fea657417a94dd0fff72f'
      }),
    );
  },
};

const UnsubscribeCommand: CustomCommand = {
  command: 'Unsubscribe from another user',
  description: 'No description provided',
  handler: () => {
    store.dispatch(
      UserInteractionActions.unsubscribe.request({
        userId: '5f2fea657417a94dd0fff72f'
      }),
    );
  },
};

const commands = [
  GetProfileCommand,
  GetProductsCommand,
  GetReviewsCommand,
  SubscribeCommand,
  UnsubscribeCommand
];
export { commands }