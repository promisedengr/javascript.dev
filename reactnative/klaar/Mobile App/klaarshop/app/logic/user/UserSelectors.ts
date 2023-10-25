import { RootState } from '~/store/reducers';

export const userSelector = (state: RootState) => state.user;
// export const showRetryLinkSelector = (state: RootState) =>
//   !!state.user.otp.error?.description;
// export const userProfileSelector = (state: RootState) => state.user.profile;
