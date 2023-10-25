import React, { FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Dimensions, FlatList, ListRenderItem } from "react-native";
import { Navigation } from "react-native-navigation";
import { Header } from "~/ui/components/Header";
import { useThemeContext } from "~/ui/theme";
import { colors } from "~/ui/theme/default/colors";
import { navigationService } from "../NavigationService";
import { StyleSheet } from 'react-native'
import { Theme } from '~/ui/theme'
import { useDispatch, useSelector } from "react-redux";
import { ProductType, ProfileActions } from "~/logic/profile/ProfileRedux";
import { profileSelector } from "~/logic/profile/ProfileSelectors";
import { Preloader } from "~/ui/components/Preloader/Preloader";
import { Button } from "~/ui/components/Button";
import { userSelector } from "~/logic/user/UserSelectors";
import { defineCurrency } from "~/ui/renderHelpers/defineCurrency";
import { CurrencyT } from "~/logic/product/ProductRedux";
import { usePriceDefine } from "~/Hooks/usePriceDefine";
import ItemLayout from "~/ui/components/CartItem/ItemLayout";

type LeftReviewProps = {

}

const { width: w, height: h } = Dimensions.get(`screen`)


const LeftReviewScreen: FC<LeftReviewProps> = props => {
   const { } = props

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();
   const dispatch = useDispatch()
   const [checkedId, setcheckedId] = useState(``)
   const [loadMore, setLoadMore] = useState(false)
   const [itemsIndex, setItemsIndex] = useState(15)

   const {
      getUnreviwedProducts: {
         data: unreviwedProductsData,
         fetching: unreviwedProductsFetching
      }
   } = useSelector(profileSelector)


   useEffect(() => {
      if (!unreviwedProductsFetching) {
         dispatch(ProfileActions.getUnreviwedProducts.request({ index: 0 }))
      }
   }, [])


   const onBackPress = () => {
      Navigation.pop(navigationService.getCurrentScreenId())
   }

   const onButtonPress = () => {

      const data = unreviwedProductsData?.products.filter(d => checkedId === d._id)[0]

      Navigation.push(navigationService.getCurrentScreenId(), {
         component: {
            name: 'WriteReviewScreen',
            passProps: {
               productId: checkedId,
               photo: data?.seller.photo,
               fn: data?.seller.fn,
               ln: data?.seller.ln,
            },
            options: {
               animations: {
                  push: {
                     enabled: true
                  }
               }
            }
         },
      })
   }

   const onCheckPress = (id: string) => {
      if (checkedId === id) {
         setcheckedId(``)
      }
      else {
         setcheckedId(id)
      }
   }

   const {
      currentCurrency
   } = useSelector(userSelector)


   const currencyPriceFormat = usePriceDefine()

   const _renderItem: ListRenderItem<ProductType> = ({ item: i, index: idx }) => {
      return (
         <ItemLayout key={idx} passiveMode={false}
            item={{
               minSize: i!.sizes[0],
               maxSize: i!.sizes[i!.sizes.length - 1],
               idx,
               price: currencyPriceFormat({ price: i.price, currency: i.currency as CurrencyT }),
               productColorsArray: i!.colors,
               productName: i!.name,
               productImage: { uri: i!.mainPhoto },
               currentCurrency: defineCurrency(currentCurrency)
            }}
            isChecked={checkedId === i!._id}
            onCheckPress={() => onCheckPress(i!._id)}
            borderBottom={idx === unreviwedProductsData!.products.length - 1} />
      )
   }

   const onLoadMore = () => {
      setItemsIndex(itemsIndex + 15)
      dispatch(ProfileActions.getUnreviwedProducts.request({ index: itemsIndex }))
   }

   const footerLoader = (loading: boolean) => (
      loading
         ? <View style={{ paddingVertical: 10 }}><Preloader /></View>
         : unreviwedProductsData && (unreviwedProductsData?.products.length % 15 === 0) ? < View style={{ height: 50 }} /> : null
   )


   const onEndReached = () => {
      if (!loadMore && (unreviwedProductsData!.products.length % 15 === 0)) {
         onLoadMore()
         setLoadMore(true)
      }
   }



   return (
      <View style={s?.container}>
         <Header
            onPressBack={onBackPress}
            bgColor={colors.transparent}
            headerTitle={t(`profile.giveFeedback`)}
            headerLeft={'arrow'}
         />
         {unreviwedProductsFetching || !unreviwedProductsData
            ? <Preloader />
            : <>
               <FlatList
                  keyExtractor={(item) => item._id}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  contentContainerStyle={s?.itemsContainer}
                  data={unreviwedProductsData!.products}
                  renderItem={_renderItem}
                  onEndReached={onEndReached}
                  onEndReachedThreshold={0.3}
                  ListFooterComponent={footerLoader(unreviwedProductsFetching && loadMore)}
               />

               {unreviwedProductsData.products.length > 0
                  ? <View style={[s?.alignItemsCenter, s?.marginTopx4]}>
                     <View style={s?.buttonContainer}>
                        <Button
                           disabled={!checkedId}
                           onPress={onButtonPress}
                           title={`${t('Оставить отзыв')}`}
                           color={colors.lightBlue2}
                        />
                     </View>
                  </View>
                  : null}
            </>
         }
      </View>
   )
}


export const createStyle = (theme: Theme) =>
   StyleSheet.create({

      alignItemsCenter: {
         alignItems: 'center'
      },

      marginTopx4: {
         marginTop: theme.metrics.x4
      },
      container: {
         flex: 1
      },

      buttonContainer: {
         height: 56,
         width: w - theme.metrics.x4 * 2,
         marginBottom: 34
      },
      scrollView: {
         flexGrow: 1,
         marginTop: theme.metrics.x4
      },
      itemsContainer: {
         flexGrow: 1,
      },
   })


const LeftReviewScreenM = memo(LeftReviewScreen)
export { LeftReviewScreenM as LeftReviewScreen };