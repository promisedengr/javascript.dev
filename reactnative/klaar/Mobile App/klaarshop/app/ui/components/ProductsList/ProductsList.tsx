import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useThemeContext } from '~/ui/theme';
import { createStyle } from './styles';
import { ProductItem } from '../ProductItem';
import { ProductType } from '~/logic/profile/ProfileRedux';
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency';
import { Navigation } from 'react-native-navigation';
import { navigationService } from '~/screens/NavigationService';
import { useDispatch } from 'react-redux';
import { productActions } from '~/logic/product/ProductRedux';
import { Preloader } from '../Preloader/Preloader';

type PropsTypes = {
   list?: ProductType[],
   onEndReached: (args: any) => void
   isLoading: boolean
}


const ProductsList: React.FC<PropsTypes> = React.memo(({
   list,
   onEndReached,
   isLoading
}) => {


   const dispatch = useDispatch()


   const onSellerPress = (sellerId: string) => {
      Navigation.push(navigationService.getCurrentScreenId(), {
         component: {
            name: 'SellerScreen',
            passProps: { sellerId },
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

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const onProductPress = useCallback(
      (productId: string) => {
         dispatch(productActions.getProductById.request({ productId }))
         Navigation.push(navigationService.getCurrentScreenId(), {
            component: {
               name: 'ProductInfoScreen',
               passProps: { reducerName: `Products` },
               options: {
                  animations: {
                     push: {
                        enabled: true
                     }
                  }
               }
            },
         });
      }, [])

   const renderItem = ({ item, index }: { item: ProductType, index: number }) => {





      const onPressFavorite = (productID: string, favorite: boolean) => {
         dispatch(productActions.subscribe.request({ productId: productID, isFavorite: favorite, reducerName: `Products` }))
      }



      return (
         <View style={s?.itemContainer}>
            <ProductItem
               sellerId={item.seller._id}
               productID={item._id}
               productImage={{ uri: item.mainPhoto }}
               sellerImage={{ uri: item.seller.photo }}
               productRating={item.seller.rating}
               productFollowers={item.seller.numReviews}
               productCategory={item.category.name}
               productName={item.name}
               productColorsArray={item.colors}
               productPriceCurrency={defineCurrency(item.currency as `rub` | `usd`)}
               productPriceDefault={`0`}
               productSizeMin={item.sizes[0]}
               productSizeMax={item.sizes[item.sizes.length - 1]}
               productPriceGroup={`${item.price}`}
               favorite={item.youSubscribed}
               onPressFavorite={onPressFavorite}
               //  newProduct={item.new}
               onItemSelect={onProductPress}
               youOwner={item.youOwner}
               onSellerPress={onSellerPress}
               isRequiredSizes={item.category.requiredFields.sizes}
               isRequiredColors={item.category.requiredFields.colors}
            />
            {list && list.length % 2 !== 0 && list.length - 1 === index
               ? <View style={s?.itemContainer} />
               : null}
         </View>
      )


   }

   //  const formatData = (data: ProductT[], numColumns: number) => {
   //      const numberOfFullRows = Math.floor(data.length / numColumns);

   //      let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
   //      while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
   //          data.push({ productID: `blank-${numberOfElementsLastRow}`, empty: true });
   //          numberOfElementsLastRow++;
   //      }

   //      return data;
   //  };

   const footerLoader = (loading: boolean) => (
      loading
         ? <View style={{ paddingVertical: 10 }}><Preloader /></View>
         : list && (list.length % 15 === 0) ? < View style={{ height: 50 }} /> : null
   )

   const memoizeRenderItem = useMemo(() => renderItem, [list])


   return (
      <FlatList
         showsVerticalScrollIndicator={false}
         keyExtractor={item => item._id}
         numColumns={2}
         contentContainerStyle={s?.itemsContainer}
         data={list!}
         renderItem={memoizeRenderItem}
         onEndReached={onEndReached}
         onEndReachedThreshold={0.3}
         ListFooterComponent={footerLoader(isLoading)}
      />
   )
});

export { ProductsList }