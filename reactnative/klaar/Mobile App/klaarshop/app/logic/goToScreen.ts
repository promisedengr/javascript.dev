import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { navigationService } from '~/screens/NavigationService';

export function goToScreen(screenId: string) {
  Navigation.push(navigationService.getCurrentScreenId(), {
    component: {
      name: screenId
    }
  });
}

export function goToScreenWithProps(screenId: string, screenProps: object) {
  Navigation.push(navigationService.getCurrentScreenId(), {
    component: {
      name: screenId,
      passProps: screenProps
    }
  });
}

export const handlePressBack = () => {
  Navigation.pop(navigationService.getCurrentScreenId());
}