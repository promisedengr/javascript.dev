import * as React from 'react';
import { memo, useCallback } from 'react';
import {
   Platform,
   StatusBar,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useThemeContext } from '~/ui/theme';
import { colors, gradients } from '~/ui/theme/default/colors';
import { metrics } from '~/ui/theme/default/metrics';
import { createStyle } from './HeaderStyles';
import ArrowIcon from './assets/arrow';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export type HeaderProps = {
   headerCenter?: object;
   headerLeft?: object | `arrow`;
   headerRight?: object;
   headerTitle?: string;
   headerTitleFontSize?: number;
   headerTitleFontFamily?: string;
   paddingLeft?: number;
   paddingRight?: number;
   headerLeftWidth?: string;
   headerCenterWidth?: string;
   headerRightWidth?: string;
   borderBottomWidth?: number;
   borderBottomColor?: string;
   navigation?: any;
   bgColor?: string;
   onPressBack?: () => void;
};


const Header: React.FC<HeaderProps> = ({
   headerTitle,
   headerTitleFontSize,
   paddingLeft,
   paddingRight,
   headerCenter,
   headerLeft,
   headerRight,
   headerCenterWidth,
   headerLeftWidth,
   headerRightWidth,
   borderBottomWidth,
   borderBottomColor,
   bgColor,
   onPressBack = () => 1,
   headerTitleFontFamily
}) => {

   const { s } = useThemeContext(createStyle);

   const renderHeaderLeft = () => {
      let layout = [];
      layout.push(
         <View key={`left`} style={[s?.headerSideContainer, {
            paddingLeft: paddingLeft, width: headerLeftWidth
         }]}>
            {!!headerLeft && headerLeft !== 'arrow' &&
               headerLeft
            }
            {!!headerLeft && headerLeft === 'arrow' &&
               <TouchableOpacity style={s?.arrowBackContainer}
                  onPress={() => onPressBack()}
               >
                  <ArrowIcon w={12} h={21} />
               </TouchableOpacity>
            }
         </View>
      )
      return layout;
   }

   const renderHeaderCenter = (title: string | undefined) => {
      let layout = [];
      layout.push(
         <View key={`center`} style={[s?.headerCenterContainer, { width: headerCenterWidth }]}>
            {!!title &&
               <Text style={[s?.headerTitle, {
                  fontSize: headerTitleFontSize
               }]}>
                  {title}
               </Text>
            }
            {!title &&
               headerCenter
            }
         </View>
      )
      return layout;
   }

   const renderHeaderRight = () => {
      let layout = [];
      layout.push(
         <View key={`right`} style={[s?.headerSideContainer, s?.headerRightFlex, {
            paddingRight: paddingRight, width: headerRightWidth
         }]}>
            {!!headerRight &&
               headerRight
            }
         </View>
      )
      return layout;
   }


   const borderBot = { borderBottomWidth: borderBottomWidth, borderColor: borderBottomColor }
   return (
      <SafeAreaView style={[s?.headerContainer, {
         backgroundColor: !!bgColor ? bgColor : undefined
      }, borderBot, 
      //Platform.OS === `android` ? { paddingTop: StatusBar.currentHeight } : {}
      ]}>
         {renderHeaderLeft()}
         {renderHeaderCenter(headerTitle)}
         {renderHeaderRight()}
      </SafeAreaView>
   );
};

Header.defaultProps = {
   headerTitleFontSize: 17,
   paddingLeft: metrics.x4,
   paddingRight: metrics.x4,
   headerRightWidth: '30%',
   headerLeftWidth: '30%',
   headerCenterWidth: '40%',
   borderBottomColor: colors.gray,
   borderBottomWidth: 1
}


const HeaderM = memo(Header);
export { HeaderM as Header };
