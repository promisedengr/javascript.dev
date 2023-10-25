import { Navigation } from 'react-native-navigation';
import { buffers, eventChannel } from 'redux-saga';
import { call, spawn, take, select, put } from 'redux-saga/effects';
import { initI18n } from '~/config/i18n';
import { ClientSaga } from '~/logic/client/ClientSagas';
import { ProductSaga } from '~/logic/product/ProductSagas';
import { TokenCheckResponse, UserActions } from '~/logic/user/UserRedux';
import SplashScreen from 'react-native-splash-screen'
import { UserSaga } from '~/logic/user/UserSagas';
import { PaymentSaga } from '~/logic/payment/PaymentSagas';
import { UserInteractionSaga } from '~/logic/userInteraction/UserInteractionSagas';
// import { getConfig } from '~/config/Config';
import { registerScreens, showDefaultScreen } from '~/screens/RegisterScreens';
import { deleteTokenFromAsyncStorage, getTokenFromAsyncStorage, getUserIdFromAsyncStorage, getLanguageFromAsyncStorage, getCurrencyFromAsyncStorage } from './../logic/asyncStorage/asyncStorageHelper';
import { RootStore, store } from './store';
import { userSelector } from '~/logic/user/UserSelectors';
import { ProfileSaga } from '~/logic/profile/ProfileSagas';
import { CategoriesSaga } from '~/logic/categories/categories/CategoriesSagas';
import { ChatSaga } from '~/logic/chats/ChatsSagas';
import { CartSaga } from '~/logic/cart/CartSagas';
import { OrdersSaga } from '~/logic/orders/OrdersSagas';
import { ApiResponse } from 'apisauce';
import { api } from '~/api';

const APP_LAUNCH = 'klaarshop';

function createNavigationChannel() {
   return eventChannel(emit => {
      Navigation.events().registerAppLaunchedListener(() => emit(APP_LAUNCH));
      return () => { };
   }, buffers.expanding(0));
}
const navigationChannel = createNavigationChannel();

function* applicationStart(store: RootStore) {
   const userState = yield select(userSelector);
   try {
      
      let userLanguage = yield call(getLanguageFromAsyncStorage);
      let userCurrency = yield call(getCurrencyFromAsyncStorage);

      //console.log('FROM ASYNC:', userLanguage, userCurrency);

      if (userLanguage) {
         yield put(UserActions.currentLang(userLanguage));
         initI18n(userLanguage);
      } else {
         initI18n('en');
      }
      if (userCurrency)
         yield put(UserActions.currentCurrency(userCurrency));
      else 
         yield put(UserActions.currentCurrency('usd'));


      let userToken = yield call(getTokenFromAsyncStorage);
      //let userId = yield call(getUserIdFromAsyncStorage);
      if (userToken) {
         // yield put(
         //   UserActions.tokenRelevanceCheck.request({token: userToken})
         // );

         const response: ApiResponse<TokenCheckResponse> = yield call(
            api.tokenCheck,
            userToken

         );

         if (response.data?.message === `OK`) {
            yield put(
               UserActions.storeTokenToRedux(userToken)
            );
         }
         else if (response.data?.message === `Not authorized`) {
            userToken = ``
            yield call(deleteTokenFromAsyncStorage)
         }

         // yield put(
         //    UserActions.storeUserIdToRedux(userId)
         // );
      }
      // console.log(userState.tokenRelevanceCheck.data);
      SplashScreen.hide();
      yield call(registerScreens, store);

      while (true) {
         const navigationEvent = yield take(navigationChannel);
         //console.log(navigationEvent);
         // TODO: загрузить сохраненную информацию о пользователе
         // и редиректнуть на нужный скрин
         // есть ли у нас токен и прочая фигня для юзера???

         yield call(showDefaultScreen, !!userToken);
      }
   } catch (e) { }
}
function* rootSaga(store: RootStore) {
   const sagas = [
      applicationStart,
      UserSaga,
      ClientSaga,
      ProductSaga,
      UserInteractionSaga,
      PaymentSaga,
      ProfileSaga,
      CategoriesSaga,
      ChatSaga,
      CartSaga,
      OrdersSaga
   ];

   yield* sagas.map((saga, index) =>
      spawn(function* sagaGuard() {
         while (true) {
            try {
               if (index === 0) {
                  yield call(saga, store);
               } else {
                  yield call(saga);
               }
               break;
            } catch (e) {
               console.log(e);
            }
         }
      }),
   );
}

export { rootSaga };

