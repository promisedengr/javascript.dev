import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import {
   View, SafeAreaView, StyleSheet, TouchableOpacity,
   Dimensions, Text, NativeSyntheticEvent,
   TextInputKeyPressEventData,
   KeyboardAvoidingView,
   Platform
} from 'react-native'
import { Navigation } from 'react-native-navigation';

import { Header } from '~/ui/components/Header';
import { RenderStars } from '~/ui/components/RenderStars/renderStars';
import { Theme, useThemeContext } from '~/ui/theme'
import { colors, gradients } from '~/ui/theme/default/colors';
import BucketIcon from '../CartScreen/assets/bucket';
import { navigationService } from '../NavigationService';
import { TextInput } from '~/ui/components/TextInput';
import { ImageWithLoader } from '~/ui/components/ImageWithLoader/ImageWithLoader';
import { useDispatch, useSelector } from 'react-redux';
import { productActions } from '~/logic/product/ProductRedux';
import { Button } from '~/ui/components/Button';
import { F } from 'lodash/fp';
import LinearGradient from 'react-native-linear-gradient';
import { productSelector } from '~/logic/product/ProductSelectors';
import { showError } from '~/logic/AlertService/AlertService';

interface Props {
   productId: string
   photo: string
   fn: string
   ln: string
}


const { width } = Dimensions.get(`screen`)

const WriteReviewScreen: FC<Props> = ({
   productId,
   photo,
   fn,
   ln,
}) => {


   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();
   const dispatch = useDispatch()

   const {
      addReview: {
         fetching: reviewFetching,
         error: reviewError
      }
   } = useSelector(productSelector)

   const [value, setValue] = useState(``)
   const [rating, setRating] = useState(5)


   const [imageLoad, setimageLoad] = useState(false)

   const onImageLoad = () => {
      setimageLoad(true)
   }

   const onImageLoadEnd = () => {
      setimageLoad(false)
   }
   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }



   const onBucketPress = () => {
      setValue(``)
      onBackPress()
   }

   const onEnterPress = () => {
      dispatch(productActions.addReview.request({ productId, text: value, grade: rating }))
   }

   const onRatingChange = (idx: number) => {
      setRating(idx)
   }

   const onPhotoPress = () => {

   }

   useEffect(() => {
      if (reviewError?.description)
         showError(reviewError.description);
   }, [reviewError]);


   return (

      <LinearGradient style={s?.container} colors={gradients.g3}>
         <View style={s?.container}>
            <KeyboardAvoidingView style={s?.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
               <Header
                  onPressBack={() => onBackPress()}
                  bgColor={colors.transparent}
                  headerTitle={t(`reviews.review`)}
                  headerLeft={'arrow'}
                  borderBottomWidth={1}
                  headerRight={<View style={s?.headerRight}>
                     <TouchableOpacity onPress={onBucketPress}>
                        <BucketIcon />
                     </TouchableOpacity>
                  </View>
                  } />
               <View style={s?.authorContainer}>
                  <View style={s?.avatarContainer}>
                     <ImageWithLoader source={photo}
                        onPhotoPress={onPhotoPress}
                        imageLoad={imageLoad}
                        onLoadStart={onImageLoad}
                        onLoadEnd={onImageLoadEnd}
                        photoStyle={s?.avatar}
                        photoContainerStyle={s?.avatar}
                     />
                  </View>
                  <View style={s?.textContainer}>
                     <View><Text style={s?.titleText}>{`${fn} ${ln}`}</Text></View>
                     <View style={s?.stars}><RenderStars size={22} onRatingChange={onRatingChange} rating={rating} /></View>
                  </View>
                  <View style={s?.timeWrapper}>
                     <Text style={s?.subTitleText}>Today</Text>
                  </View>
               </View>
               <View style={s?.inputContainer}>
                  <TextInput maxSymbols={50} validationOk={value.length > 0} value={value} onChangeText={(text) => setValue(text)} />
               </View>
               <View style={[s?.alignItemsCenter, s?.marginTopx4]} >
                  <View style={s?.buttonContainer}>
                     <Button
                        disabled={reviewFetching}
                        spinner={reviewFetching}
                        onPress={onEnterPress}
                        title={`${t('buttons.review')}`}
                        color={colors.lightBlue2}
                     />
                  </View>
               </View >
            </KeyboardAvoidingView>
         </View >
      </LinearGradient>
   )
}



export { WriteReviewScreen }

const { width: w } = Dimensions.get(`screen`)


const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
      },
      headerRight: {
         flexDirection: 'row',
         alignItems: 'center',
         width: width * 0.15,
         justifyContent: 'flex-end'
      },
      authorContainer: {
         flexDirection: `row`,
         width: `100%`,
         justifyContent: `center`,
         padding: theme.metrics.x4
      },
      avatar: {
         height: 56,
         width: 56,
         borderRadius: 20
      },
      avatarContainer: {
         flex: 1.5
      },
      textContainer: {
         flex: 5,
         justifyContent: "center"
      },
      timeWrapper: {
         flex: 2,
         alignItems: `flex-end`,
         justifyContent: `flex-end`
      },
      stars: {
         flexDirection: `row`,
         marginTop: theme.metrics.x
      },
      titleText: {
         fontSize: theme.metrics.x4,
         color: theme.colors.black,
         fontWeight: "500"
      },
      subTitleText: {
         fontSize: theme.metrics.x3 + theme.metrics.x05,
         color: theme.colors.silver,
         fontWeight: "400"
      },
      inputContainer: {
         padding: theme.metrics.x4,


      },
      messageInput: {
         position: `absolute`,
         bottom: 0
      },
      reviewTextWrapper: {
         backgroundColor: theme.colors.white,
         borderRadius: 30,
         borderWidth: 1,
         borderColor: theme.colors.silver,
         minHeight: 150,
         padding: theme.metrics.x4
      },
      reviewText: {
         fontSize: 15,
         color: theme.colors.black
      },
      borderBlue: {
         borderColor: theme.colors.lightBlue2
      },
      alignItemsCenter: {
         alignItems: 'center',
         position: `absolute`,
         bottom: 0,
         width: `100%`
      },
      marginTopx4: {
         marginTop: theme.metrics.x4
      },
      buttonContainer: {
         height: 56,
         width: w - theme.metrics.x4 * 2,
         marginBottom: theme.metrics.x7,
      },
   })