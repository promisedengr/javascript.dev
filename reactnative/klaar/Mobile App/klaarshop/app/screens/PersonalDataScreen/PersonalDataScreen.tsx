import _ from 'lodash';
import React, { memo, useEffect, useState, FC, useRef } from 'react';
import { View, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Header } from './../../ui/components/Header';
import { createStyle } from './PersonalDataScreenStyles';
import { useThemeContext } from '~/ui/theme';
import { useTranslation } from 'react-i18next';
import { colors } from './../../ui/theme/default/colors';
import { PhotoComponent } from '~/ui/components/PhotoComponent';
import { AddPhotoBoxButton } from '~/ui/components/AddPhotoBoxButton';
import { TextInput } from '~/ui/components/TextInput';
import { OurDropdown } from '~/ui/components/OurDropdown';
import { Button } from '~/ui/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileActions } from '~/logic/profile/ProfileRedux';
import { profileSelector } from '~/logic/profile/ProfileSelectors';
import { TextField } from 'react-native-material-textfield';
import { validateEmail, validateName, validatePhone } from '~/logic/user/ValidationHelper';
import { Navigation } from 'react-native-navigation';
import { navigationService } from '../NavigationService';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';


type PersonalDataScreenProps = {}

const PersonalDataScreen: FC<PersonalDataScreenProps> = props => {

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const dispatch = useDispatch()

   const {
      getSelfProfile: {
         data: profileData,
         fetching: profileFetching
      }
   } = useSelector(profileSelector)

   useEffect(() => {
      dispatch(ProfileActions.getSelfProfile.request())
   }, [])

   const fnRef = useRef<TextField>(null)
   const lnRef = useRef<TextField>(null)
   const emailRef = useRef<TextField>(null)
   const phoneRef = useRef<TextField>(null)


   const [testImg, setTestImg] = useState({ uri: ``, data: `` });
   const [value1, setValue1] = useState(``);
   const [value2, setValue2] = useState(``);
   const [value3, setValue3] = useState(``);
   const [value4, setValue4] = useState(``);
   const [value5, setValue5] = useState(``);

   useEffect(() => {

      if (profileData && !profileFetching) {

         const initialBday = profileData.bday ? new Date(profileData?.bday * 1000).toISOString().slice(0, 10) : ``
         setTestImg({ uri: profileData.photo, data: `` })
         setValue1(profileData?.ln)
         setValue2(profileData?.fn)
         setValue3(profileData?.email)
         setValue4(profileData?.phone)
         setValue5(initialBday)
         // fnRef.current?.setValue(profileData?.ln)
         // lnRef.current?.setValue(profileData?.fn)
         // emailRef.current?.setValue(profileData?.email)
         // phoneRef.current?.setValue(profileData?.phone)
      }
   }, [profileData])

   const imageOption: any = {
      mediaType: 'photo',
      maxWidth: 700,
      maxHeight: 700,
      quality: 1,
      includeBase64: true,
   };

   const takeImg = () => {
      launchImageLibrary(
         imageOption,
         (response: ImagePickerResponse) => {
            /* console.log('Response = ', response); */

            if (response.didCancel) {
               console.log("User cancelled image picker");
            } else if (response.error) {
               console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
               console.log("User tapped custom button: ", response.customButton);
            } else {
               const source = { uri: response.uri };

               // You can also display the image using data:
               // const source = { uri: 'data:image/jpeg;base64,' + response.data };

               setTestImg({ data: 'data:image/jpeg;base64,' + response.base64, uri: response.uri });
            }
         });
   };

   const sendFormHandler = () => {
      if (value5) {
         const bday = new Date(value5).getTime() / 1000
         const payload = {
            fn: value1,
            ln: value2,
            email: value3,
            phone: value4,
            bday
         }

         if (!value4) delete payload.phone
         if (!value5) delete payload.bday

         dispatch(ProfileActions.changeProfile.request(payload))
      }

      if (testImg.data !== undefined)
         dispatch(ProfileActions.setProfilePhoto.request({ data: testImg.data, mimeType: `image/jpeg` }));
   }

   const onBackPress = () => Navigation.pop(navigationService.getCurrentScreenId());

   const isDisabled = !validateName(value1)
      || !validateName(value2)
      || !validateEmail(value3)
      || !(value4 ? validatePhone(value4) : true)

   return (
      <View style={s?.container}>
         <View style={s?.container}>
            <Header
               headerLeft={'arrow'}
               onPressBack={onBackPress}
               headerTitleFontSize={17}
               headerTitle={t('profile.personalData')}
               borderBottomWidth={1}
               bgColor={colors.transparent}
            />
            {profileFetching
               ? <Preloader />
               : <KeyboardAvoidingView
                  keyboardVerticalOffset={0}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={s?.scrollviewStyle}
               >
                  <ScrollView
                     showsVerticalScrollIndicator={false} >

                     <View style={{
                        justifyContent: `flex-end`,
                        flex: 1
                     }}>
                        <View style={[s?.defaultBlock]}>
                           <Text style={s?.grayHeaderText}>
                              {t('profile.photo')}
                           </Text>
                           <View style={[s?.photoContainer, !testImg.uri
                              ? { backgroundColor: colors.lightBlue2, borderRadius: 30 }
                              : null]}>
                              {!!testImg.uri
                                 ? <PhotoComponent
                                    onPhotoPress={takeImg}
                                    onPress={() => { setTestImg({ data: ``, uri: `` }) }}
                                    image={testImg.uri}
                                 />
                                 : <AddPhotoBoxButton
                                    onPress={takeImg}
                                 />
                              }
                           </View>
                        </View>
                        <View style={[s?.defaultBlock, s?.borderTop]}>
                           <Text style={s?.grayHeaderText}>
                              {t('profile.personalData')}
                           </Text>
                           <View style={s?.marginTopx4}>
                              <TextInput ref={fnRef} value={value1} inputLabel={t('profile.name')}
                                 validationOk={validateName(value1)} required={true}
                                 onChangeText={(text) => setValue1(text)}
                              />
                           </View>
                           <View style={s?.marginTopx4}>
                              <TextInput ref={lnRef} value={value2} inputLabel={t('profile.surname')}
                                 validationOk={validateName(value2)} required={true}
                                 onChangeText={(text) => setValue2(text)}
                              />
                           </View>
                           <View style={s?.marginTopx4}>
                              <TextInput ref={emailRef} value={value3} inputLabel={t('profile.post')}
                                 validationOk={validateEmail(value3)} required autoCapitalize={'none'}
                                 onChangeText={(text) => setValue3(text)}
                              />
                           </View>
                           <View style={s?.marginTopx4}>
                              <TextInput ref={phoneRef} value={value4} inputLabel={t('profile.phone')}
                                 validationOk={value4 ? validatePhone(value4) : true} required={true}
                                 onChangeText={(text) => setValue4(text)}
                              />
                           </View>
                        </View>
                        <View style={[s?.defaultBlock, s?.borderTop]}>
                           <Text style={s?.grayHeaderText}>
                              {t('profile.birthday')}
                           </Text>
                           <View style={s?.marginTopx4}>
                              <OurDropdown
                                 inputLabel={t('errors.select')}
                                 value={value5}
                                 required={true}
                                 onChangeValue={(text) => setValue5(text)}
                                 datePickerMode={true}
                              />
                           </View>
                        </View>
                        <View style={s?.buttonSave}>
                           <Button
                              disabled={isDisabled}
                              onPress={sendFormHandler}
                              title={t('buttons.save')}
                              color={isDisabled ? colors.gray6 : colors.lightBlue2}
                           />
                        </View>
                     </View>
                  </ScrollView>
               </KeyboardAvoidingView>
            }
         </View >
      </View>
   );
};

const MPersonalDataScreen = memo(PersonalDataScreen);
export { MPersonalDataScreen as PersonalDataScreen };