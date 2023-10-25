import React from 'react'
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext, Theme } from '~/ui/theme';
import { AvatarWithStatus } from '../ChatDialog/AvatarWithStatus';
import ArrowIcon from '../Header/assets/arrow';

interface Props {
   name: string
   status: boolean
   source: string
   onBack: () => void
}


const { width: w } = Dimensions.get(`window`)

const ChatHeader = (props: Props) => {

   const { name, source, status, onBack } = props

   const { s } = useThemeContext(createStyle);

   const { t } = useTranslation()

   return (
      <SafeAreaView style={s?.safeArea} >
         <View style={s?.header}>
            <View style={s?.backIcon}>
               <TouchableOpacity style={s?.backIconWrapper} onPress={onBack}>
                  <ArrowIcon w={12} h={20.5} />
               </TouchableOpacity>
            </View>
            <View style={s?.nameAndStatus}>
               <View><Text style={s?.nameText}>{name}</Text></View>
               <View><Text style={s?.statusText}>{status ? t(`Online`) : t(`Offline`)}</Text></View>
            </View>
            <View style={s?.avatar}>
               <AvatarWithStatus size={32}
                  borderRadiusSize={16} onlineStatusSize={10} isOnline={status}
                  source={source} />
            </View>
         </View>
      </SafeAreaView>
   )
}

export { ChatHeader }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      safeArea: {
         backgroundColor: theme.colors.transparent
      },
      header: {
         width: w,
         position: `relative`,
         height: 60,
         top: 0,
         borderBottomWidth: 1,
         borderBottomColor: theme.colors.gray,
         flexDirection: `row`,
      },
      backIcon: {
         flex: 3,
         justifyContent: `center`
      },
      backIconWrapper: {
         paddingLeft: 9,
         width: `100%`,
         height: `100%`,
         justifyContent: `center`
      },
      nameAndStatus: {
         flex: 12,
         justifyContent: `center`,
         alignItems: `center`
      },
      avatar: {
         flex: 3,
         justifyContent: `center`,
         alignItems: `center`
      },
      nameText: {
         fontSize: 16,
         fontWeight: "600",
         color: theme.colors.black
      },
      statusText: {
         fontSize: 14,
         fontWeight: "400",
         color: theme.colors.silver
      }
   })
