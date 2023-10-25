import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation, Options } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { RootStore } from '~/store/store';
import { AddProductScreenOptions } from './AddProductScreen';
import { AddProductScreen } from './AddProductScreen/AddProductScreen';
import { ClientProfileScreen, ClientProfileScreenOptions } from './ClientProfileScreen';
import { ClientSettingsScreen, ClientSettingsScreenOptions } from './ClientSettingsScreen';
import { LoginScreen, LoginScreenOptions } from './LoginScreen';
import { FatalErrorScreen, FatalErrorScreenOptions } from './FatalErrorScreen';
import { TermsOfUseScreen, TermsOfUseScreenOptions } from './TermsOfUseScreen';
import { ProductInfoScreen, ProductInfoScreenOptions } from './ProductInfoScreen';
import { SellerScreen, SellerScreenOptions } from './SellerScreen';
import { PersonalDataScreen, PersonalDataScreenOptions } from './PersonalDataScreen';
import { CartScreen, CartScreenOptions } from './CartScreen';
import { OrderingScreen, OrderingScreenOptions } from './OrderingScreen';
import { PaymentScreen, PaymentScreenOptions } from './PaymentScreen';
import { ChatScreen } from './ChatScreen/ChatScreen';
import { ChatScreenOptions } from './ChatScreen/ChatScreenOptions';
import { DialogScreen } from './DialogScreen/DialogScreen';
import { DialogScreenOptions } from './DialogScreen/DialogScreenOptions';
import { MainScreen, MainScreenOptions } from './MainScreen';
import { NotificationsScreen } from './NotificationsScreen/NotificationsScreen';
import { NotificationsScreenOptions } from './NotificationsScreen/NotificationsScreenOptions';
import FavoriteScreen from './FavoriteScreen/FavoriteScreen';
import { FavoriteScreenOptions } from './FavoriteScreen/FavoriteScreenOptions';
import { MyAdsScreenOptions } from './MyAdsScreen/MyAdsScreenOptions';
import { MyAdsScreen } from './MyAdsScreen/MyAdsScreen';
import { BuyHistoryScreen } from './BuyHistoryScreen/BuyHistoryScreen';
import { BuyHistoryScreenOptions } from './BuyHistoryScreen/BuyHistoryScreenOptions';
import { ReviewsScreen } from './ReviewsScreen/ReviewsScreen';
import { ReviewsScreenOptions } from './ReviewsScreen/ReviewsScreenOptions';
import { WriteReviewScreen } from './WriteReviewScreen/WriteReviewScreen';
import { WriteReviewScreenOptions } from './WriteReviewScreen/WriteReviewScreenOptions';
import { ProductItemsScreenOptions, ProductsItemsScreen } from './ProductsItemsScreen';
import { FilterCategoryScreen, FilterCategoryScreenOptions } from './FIlterCategoryScreen';
import { AddAdressScreen } from './AddAdressScreen/AddAdressScreen';
import { AddAdressScreenOptions } from './AddAdressScreen/AddAdressScreenOptions';
import { AdminApproveScreen } from './AdminApproveScreen/AdminApproveScreen';
import { AdminApproveScreenOptions } from './AdminApproveScreen/AdminApproveScreenOptions';
import { navigationService } from './NavigationService';
import { PurchaseStatusScreen } from './PurchaseStatusScreen/PurchaseStatusScreen';
import { PurchaseStatusScreenOptions } from './PurchaseStatusScreen/PurchaseStatusScreenOptions';
import { LeftReviewScreen } from './LeftReview/LeftReviewScreen';
import { LeftReviewOptions } from './LeftReview/LeftReviewOptions';
import { NewNotification } from '~/ui/components/NewNotification/NewNotification';
import { theme } from '~/ui/theme/default/theme';
import LinearGradient from "react-native-linear-gradient";

type PassedScreen = {
   id: string;
   ScreenComponent: React.ComponentType<any>;
   options?: (props?: any) => Options;
};

function registerScreens(store: RootStore) {

   const screens: PassedScreen[] = [
      {
         id: 'LoginScreen',
         ScreenComponent: LoginScreen,
         options: LoginScreenOptions,
      },
      {
         id: 'ClientProfileScreen', // Ваш профиль
         ScreenComponent: ClientProfileScreen,
         options: ClientProfileScreenOptions,
      },
      {
         id: 'ClientSettingsScreen',
         ScreenComponent: ClientSettingsScreen,
         options: ClientSettingsScreenOptions,
      },
      {
         id: 'TermsOfUseScreen',
         ScreenComponent: TermsOfUseScreen,
         options: TermsOfUseScreenOptions,
      },
      {
         id: 'AddProductScreen',
         ScreenComponent: AddProductScreen,
         options: AddProductScreenOptions,
      },
      {
         id: 'FatalErrorScreen',
         ScreenComponent: FatalErrorScreen,
         options: FatalErrorScreenOptions
      },
      {
         id: 'ProductInfoScreen',
         ScreenComponent: ProductInfoScreen,
         options: ProductInfoScreenOptions
      },
      {
         id: 'SellerScreen',
         ScreenComponent: SellerScreen,
         options: SellerScreenOptions
      },
      {
         id: 'PersonalDataScreen', // Персональные данные
         ScreenComponent: PersonalDataScreen,
         options: PersonalDataScreenOptions
      },
      {
         id: 'CartScreen',
         ScreenComponent: CartScreen,
         options: CartScreenOptions
      },
      {
         id: 'OrderingScreen',
         ScreenComponent: OrderingScreen,
         options: OrderingScreenOptions
      },
      {
         id: 'PaymentScreen',
         ScreenComponent: PaymentScreen,
         options: PaymentScreenOptions
      },
      {
         id: 'DialogScreen',
         ScreenComponent: DialogScreen,
         options: DialogScreenOptions
      },
      {
         id: 'ChatScreen',
         ScreenComponent: ChatScreen,
         options: ChatScreenOptions
      },
      {
         id: 'NotificationsScreen', // Уведомления
         ScreenComponent: NotificationsScreen,
         options: NotificationsScreenOptions
      },
      {
         id: 'FavoriteScreen', // Избранное
         ScreenComponent: FavoriteScreen,
         options: FavoriteScreenOptions
      },
      {
         id: 'MyAdsScreen', // Мои объявления
         ScreenComponent: MyAdsScreen,
         options: MyAdsScreenOptions
      },
      {
         id: 'BuyHistoryScreen',
         ScreenComponent: BuyHistoryScreen,
         options: BuyHistoryScreenOptions
      },
      {
         id: 'ReviewsScreen',
         ScreenComponent: ReviewsScreen,
         options: ReviewsScreenOptions
      },
      {
         id: 'WriteReviewScreen',
         ScreenComponent: WriteReviewScreen,
         options: WriteReviewScreenOptions
      },
      {
         id: 'MainScreen',
         ScreenComponent: MainScreen,
         options: MainScreenOptions
      },
      {
         id: 'ProductsItemsScreen',
         ScreenComponent: ProductsItemsScreen,
         options: ProductItemsScreenOptions
      },
      {
         id: 'FilterCategoryScreen',
         ScreenComponent: FilterCategoryScreen,
         options: FilterCategoryScreenOptions
      },
      {
         id: `AddAdressScreen`,
         ScreenComponent: AddAdressScreen,
         options: AddAdressScreenOptions
      },
      {
         id: `AdminApproveScreen`,
         ScreenComponent: AdminApproveScreen,
         options: AdminApproveScreenOptions
      },
      {
         id: `PurchaseStatusScreen`,
         ScreenComponent: PurchaseStatusScreen,
         options: PurchaseStatusScreenOptions
      },
      {
         id: `LeftReviewScreen`,
         ScreenComponent: LeftReviewScreen,
         options: LeftReviewOptions
      },



   ];

   screens.forEach(screen => {
      const { id, ScreenComponent, options } = screen;
      Navigation.registerComponent(id, () => {
         const C = (props: any) => (
            <Provider store={store}>
               <NewNotification />
               <LinearGradient style={{flex: 1}} colors={options().gradient ?? theme.gradients.g3}>
                  <SafeAreaView style={{flex: 1}}>
                     <ScreenComponent {...props} />
                  </SafeAreaView>
               </LinearGradient>
            </Provider>
         );
         if (options) {
            C.options = options;
         }
         return gestureHandlerRootHOC(C);
      });
   });
}


function showDefaultScreen(isAuth: boolean) {

   Navigation.setRoot({
      root: {
         stack: {
            children: [
               {
                  component: {
                     name: isAuth ? `MainScreen` : 'LoginScreen',
                  },
               },
            ],
         },
      },
   });
}

function showMainScreen() {
   Navigation.setRoot({
      root: {
         stack: {
            children: [{ component: { name: 'MainScreen' } }],
         },
      },
   });
}

export { registerScreens, showDefaultScreen, showMainScreen };