import { Navigation } from 'react-native-navigation';

class NavigationService {
   currentScreen: any;
   screenEventListener: any;
   constructor() {
      this.currentScreen = {};
      this.screenEventListener = Navigation.events().registerComponentDidAppearListener(
         data => {
            this.setCurrentScreenData(data);
         },
      );
   }

   setCurrentScreenData(data = {}) {
      this.currentScreen = data;
   }

   getCurrentScreenId(): string {
      return this.currentScreen.componentId;
   }
}

export const navigationService = new NavigationService();
