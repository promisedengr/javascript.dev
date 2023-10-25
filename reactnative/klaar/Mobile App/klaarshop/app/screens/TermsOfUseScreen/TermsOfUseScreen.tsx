import * as React from 'react';
import { FC, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
   SafeAreaView,
   StyleSheet,
   View
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { WebView } from 'react-native-webview';

import { Header } from '~/ui/components/Header';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { Theme, useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { navigationService } from '../NavigationService';

export type TermsOfUseScreenProps = {
   uri: string
   headerTitle: string
};

const TermsOfUseScreen: FC<TermsOfUseScreenProps> = ({ uri = 'https://google.com/', headerTitle = `Test` }) => {

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation()

   const [isLoading, setisLoading] = useState(false)



   const _onLoadStart = () => {
      //console.log(`_onLoadStart`)
      setisLoading(true)
   }

   const _onLoadEnd = () => {
      // console.log(`_onLoadEnd`)
      setisLoading(false)
   }


   const onPressBack = () => Navigation.pop(navigationService.getCurrentScreenId())

   return (

      <View style={s?.container}>
         <Header
            headerTitle={headerTitle}
            headerLeft={'arrow'}
            onPressBack={onPressBack}
            bgColor={colors.transparent}
         />
         <WebView
            baseUrl=""
            //{...webViewProps}
            source={{
               uri
            }}
            onLoadStart={_onLoadStart}
            onLoadEnd={_onLoadEnd} />
         {isLoading &&
            <View style={s?.preloader} >
               <Preloader />
            </View>
         }
      </View >
   )
}
const MTermsOfUseScreen = memo(TermsOfUseScreen)
export { MTermsOfUseScreen as TermsOfUseScreen };

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
      },
      preloader: {
         width: `100%`,
         height: `100%`,
         position: `absolute`
      }
   });
