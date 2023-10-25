import React, { memo, FC } from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersActions } from '~/logic/orders/OrdersRedux';
import { ordersSelector } from '~/logic/orders/OrdersSelectors';

import { Theme } from '~/ui/theme'
import { useThemeContext } from '~/ui/theme'



// function runTiming(clock: any, value: any, dest: any, duration: number) {
//    const state = {
//       finished: new Value(0),
//       position: value,
//       time: new Value(0),
//       frameTime: new Value(0),
//    };

//    const config = {
//       duration,
//       toValue: dest,
//       easing: Easing.inOut(Easing.cubic),
//    };

//    return block([

//       cond(clockRunning(clock), 0, [

//          set(state.finished, 0),
//          set(state.time, 0),
//          set(state.position, value),
//          set(state.frameTime, 0),
//          set(config.toValue, dest),
//          startClock(clock),
//       ]),
//       timing(clock, state, config),
//       cond(state.finished, debug('stop clock', stopClock(clock))),
//       state.position,
//    ]);
// }

// const setStatusBar = (color?: string) => {
//    Navigation.mergeOptions(navigationService.getCurrentScreenId(), {
//       statusBar: {
//          backgroundColor: color,
//          style: 'dark',
//       }
//    });
// }

export type NewNotificationProps = {
};




const NewNotification: FC<NewNotificationProps> = (props) => {
   const { } = props
   const { s } = useThemeContext(createStyle)
   const dispatch = useDispatch()

   const {
      notification: {
         isVisible,
         type,
         title
      }
   } = useSelector(ordersSelector)

   const { t } = useTranslation()

   // const [statusVisible, setstatusVisible] = useState(false)

   // const ANIMATION_DURATION = 500

   // let height = useRef(new Value(0))
   //console.log(t(`More`) === t(`More`))

   // useEffect(() => {
   //    if (isVisible) {
   //       setstatusVisible(true)
   //    }
   //    else {
   //       // setTimeout(() =>
   //       //    setStatusBar(colors.grayStatusBar), ANIMATION_DURATION
   //       // )
   //    }
   // }, [isVisible])



   // if (isVisible) {
   //    height.current = runTiming(new Clock(), new Value(0), new Value(60), ANIMATION_DURATION)
   //    //setStatusBar(type === `ok` ? s?.ok.backgroundColor : s?.error.backgroundColor)
   // }
   // else {
   //    if (statusVisible) {
   //       height.current = runTiming(new Clock(), new Value(60), new Value(0), ANIMATION_DURATION)
   //    }
   // }

   // Platform.OS === `android` ? { paddingTop: StatusBar.currentHeight } : {}

   const styleDefine = (typeP: typeof type) => {
      switch (typeP) {
         case `ok`: {
            return s?.ok
         }
         case `error`: {
            return s?.error
         }
         default: {
            return {}
         }
      }
   }

   const onTitlePress = () => {
      dispatch(OrdersActions.showNotifictaion.redux({ isVisible: false }))
   }

   return (
      <>
         {isVisible && <SafeAreaView style={[s?.container, , styleDefine(type)]}>
            {/* <Animated.View style={[s?.container, type === `ok` ? s?.ok : s?.error, { height: height.current }]}> */}
            {/* {statusVisible && <StatusBar barStyle={`dark-content`} backgroundColor={type === `ok` ? s?.ok.backgroundColor : (type === `error` ? s?.error.backgroundColor : ``)} />} */}
            <TouchableOpacity onPress={onTitlePress} style={s?.titleWrapper}>
               <Text style={s?.titleText}>{title}</Text>
            </TouchableOpacity>

            {/* </Animated.View> */}
         </SafeAreaView>}
      </>
   )
}



const MemorizedComponent = memo(NewNotification)
export { MemorizedComponent as NewNotification }

const { width: w } = Dimensions.get(`screen`)

export const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         position: `absolute`,
         width: w,
         top: 0,
         zIndex: 99999,
      },
      ok: {
         backgroundColor: theme.colors.avocado
      },
      error: {
         backgroundColor: theme.colors.red2
      },
      titleText: {
         fontSize: 16,
         color: theme.colors.white,
         fontWeight: "600",
      },
      titleWrapper: {
         height: 60,
         alignItems: `center`,
         justifyContent: `center`,
      }

   })