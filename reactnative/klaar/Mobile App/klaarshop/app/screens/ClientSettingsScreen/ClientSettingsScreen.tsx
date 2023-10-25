import * as React from 'react';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
   Dimensions,
   StyleSheet,
   View,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyT } from '~/logic/product/ProductRedux';
import { CurrentLangT, UserActions } from '~/logic/user/UserRedux';
import { userSelector } from '~/logic/user/UserSelectors';
import { ArrowButton } from '~/ui/components/ArrowButton';
import { Header } from '~/ui/components/Header';
import { ModalForPicker, PickerValueT } from '~/ui/components/ModalForPicker/ModalForPicker';
import { Separator } from '~/ui/components/Separator';
import { Theme, useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { metrics } from '~/ui/theme/default/metrics';
import { theme } from '~/ui/theme/default/theme';
import { navigationService } from '../NavigationService';

export type ClientSettingsScreenProps = {
   componentId: string
};

const ClientSettingsScreen: React.FC<ClientSettingsScreenProps> = props => {

   const { s } = useThemeContext(createStyle);
   const dispatch = useDispatch()
   const { t, i18n } = useTranslation();
   const {
      currentLang,
      currentCurrency
   } = useSelector(userSelector)

   let initLang: PickerValueT<CurrentLangT> = { value: `en`, label: `` }

   if (currentLang === `en`)
      initLang = { value: `en`, label: t(`English`) }
   else if (currentLang === `ru`)
      initLang = { value: `ru`, label: t(`Русский`) }

   const [pickerCurrency, setPickerCurrency] = useState<PickerValueT<CurrencyT>>({ value: currentCurrency ?? 'usd', label: `` })
   const [lang, setLang] = useState<PickerValueT<CurrentLangT>>(initLang)

   const [modalVisible1, setModalVisible1] = useState(false);
   const [modalVisible2, setModalVisible2] = useState(false);

   const pickerData1: PickerValueT<CurrencyT>[] = [
      { value: `rub`, label: `₽` },
      { value: `usd`, label: `$` }
   ]

   const pickerData2: PickerValueT<CurrentLangT>[] = [
      { value: `en`, label: t(`English`) },
      { value: `ru`, label: t(`Русский`) }
   ]

   const onBackPress = () => Navigation.pop(navigationService.getCurrentScreenId());

   const goToUseOFTerms = useCallback((props?: { headerTitle?: string, uri?: string }) => {
      Navigation.push(navigationService.getCurrentScreenId(), {
         component: {
            passProps: props,

            name: 'TermsOfUseScreen'
         },
      });
   }, []);

   const showCurrencyModal = (bool: boolean) => setModalVisible1(!modalVisible1);

   const onCurrencyPress = (currency: PickerValueT<CurrencyT>) => {
      setPickerCurrency(currency);
      dispatch(UserActions.currentCurrency(currency.value));
      setModalVisible1(!modalVisible1);
   }

   const onLangPress = () => setModalVisible2(!modalVisible2);

   // const showModal = (valueArr: string[],
   //    changeFunc: (value: string) => void,
   //    modalVisible: boolean,
   //    setModalVisible: (arg: boolean) => void) => {
   //    return (<Modal
   //       animationType={`fade`}
   //       transparent={true}
   //       visible={modalVisible}
   //    >
   //       <View style={s?.modal}>
   //          <BlurView
   //             style={s?.absolute}
   //             blurType='dark'
   //             blurAmount={1}
   //             reducedTransparencyFallbackColor="white"
   //          />
   //          <View style={s?.modalWrapper}>
   //             {
   //                valueArr.map((d, idx, arr) => {
   //                   const onPress = () => {
   //                      changeFunc(d)
   //                      setModalVisible(!modalVisible)
   //                   }

   //                   return (<TouchableOpacity onPress={onPress}
   //                      style={[s?.modalItem, (idx !== arr.length - 1 ? s?.borderBottom : {})]}
   //                   >
   //                      <Text style={s?.modalText}>{d}</Text>
   //                   </TouchableOpacity>)
   //                })
   //             }
   //          </View>
   //       </View>
   //    </Modal>)
   // }

   const onLangItemPress = (langValue: typeof lang) => {
      i18n.changeLanguage(langValue.value);
      dispatch(UserActions.currentLang(langValue.value));
      setLang(langValue);
   }

   return (
      <View style={s?.container}>
         <View>
            <Header
               bgColor={theme.colors.transparent}
               headerTitle={t('profile.settings')}
               headerLeft={'arrow'}
               borderBottomWidth={0}
               onPressBack={onBackPress}
            />
            <ModalForPicker valueArr={pickerData1}
               visible={modalVisible1}
               setModalVisible={setModalVisible1}
               changeFunc={onCurrencyPress}
            />
            <ModalForPicker valueArr={pickerData2}
               visible={modalVisible2}
               setModalVisible={setModalVisible2}
               changeFunc={onLangItemPress}
            />
            <Separator />
            <ArrowButton
               title={t('settings.currency')}
               onPress={showCurrencyModal}
            >
               {pickerCurrency.value}
            </ArrowButton>
            <ArrowButton
               title={t('settings.language')}
               onPress={onLangPress}
               borderTop
            >
               {lang.label}
            </ArrowButton>
            <Separator />
            <ArrowButton
               title={t('settings.source')}
               onPress={() => goToUseOFTerms({ headerTitle: t('settings.source') })}
            />
            <ArrowButton
               title={t('settings.terms')}
               onPress={() => goToUseOFTerms({ headerTitle: t('settings.terms') })}
               borderTop
            />
            <ArrowButton
               title={t('settings.policy')}
               onPress={() => goToUseOFTerms({ headerTitle: t('settings.policy') })}
               borderTop
            />
         </View>
      </View>
   )
}

const MClientSettingsScreen = memo(ClientSettingsScreen)
export { MClientSettingsScreen as ClientSettingsScreen };

const { width: w } = Dimensions.get(`screen`)

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
      },
      picker: {
         backgroundColor: `red`,
         width: w,
         height: `100%`,
         alignItems: `flex-end`
      },
      modal: {
         flex: 1,
         justifyContent: `center`,
         alignItems: `center`
      },
      modalItem: {
         width: w * 0.8,
         backgroundColor: `white`,
         justifyContent: `center`,
         padding: metrics.x5
      },
      absolute: {
         position: "absolute",
         top: 0,
         left: 0,
         bottom: 0,
         right: 0
      },
      modalText: {
         fontSize: 20,
         fontWeight: "800"
      },
      modalWrapper: {
         backgroundColor: colors.white
      }
   });