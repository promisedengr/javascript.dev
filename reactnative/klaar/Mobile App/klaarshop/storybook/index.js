import React from 'react';
import { getStorybookUI, configure } from '@storybook/react-native';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { initI18n } from '~/config/i18n';
import { loadStories } from './storyLoader';
import './rn-addons';

initI18n('ru');

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
  shouldPersistSelection: true,
});

Navigation.registerComponent('storybook', () => {
  const C = () => <StorybookUIRoot />;
  return gestureHandlerRootHOC(C);
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'storybook',
      },
    },
  });
});
