import React, { useEffect, useState } from 'react';
import { Text, ImageSourcePropType, SafeAreaView, View, } from 'react-native';

import { createStyle } from './styles';
import { useThemeContext } from '~/ui/theme';
import { useTranslation } from 'react-i18next';
import { Header } from './../../ui/components/Header';
import { SortBox } from '~/ui/components/SortBox/SortBox';
import { ProductsList } from '~/ui/components/ProductsList/ProductsList';
import { navigationService } from '../NavigationService';
import { Navigation } from 'react-native-navigation';
import { SearchInput } from '~/ui/components/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { PriceSort, productActions, ProductsSearchPayload } from '~/logic/product/ProductRedux';
import { productSelector } from '~/logic/product/ProductSelectors';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '~/ui/theme/default/colors';
import { UserActions } from '~/logic/user/UserRedux';

export type ProductT = {
   productID: string,
   favorite: boolean,
   productImage: ImageSourcePropType,
   sellerImage: ImageSourcePropType,
   productRating: number,
   productFollowers: number,
   productCategory: string,
   productName: string,
   productColorsArray: string[],
   productPriceCurrency: "$" | "₽",
   productPriceDefault: string,
   productSizeMin: number,
   productSizeMax: number,
   productPriceGroup: string

}

type Props = {
}

export type CategorySearchT = {
   categoryId?: string
   subCategory?: string
}

const ProductsItemsScreen: React.FC<Props> = React.memo((props) => {


   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();
   const [search, setSearch] = useState(``)
   const [sort, setSort] = useState<PriceSort>(1)
   const [itemsIndex, setItemsIndex] = useState(0)


   const [loadMore, setLoadMore] = useState(false)


   const initCategory = {
      categoryId: ``,
      subCategory: ``
   }

   const [category, setCategory] = useState<CategorySearchT>(initCategory)
   const dispatch = useDispatch()



   const {
      productsSearch: {
         data: productsData,
         fetching: productsFetching
      }
   } = useSelector(productSelector)

   //console.log(`productsData:`, productsData)

   // const [products, setProducts] = useState(pridcutsItem);


   useEffect(() => {
      if (!productsFetching) {
         dispatch(productActions.productsSearch.request({ index: 0 }))
      }
      // Navigation.mergeOptions(navigationService.getCurrentScreenId(), {
      //    statusBar: {
      //       backgroundColor: colors.grayStatusBar,
      //       style: 'dark'
      //    }
      // });
   }, [])

   if (!productsFetching && loadMore) {
      setLoadMore(false)
   }

   const onLoadMore = () => {

      setItemsIndex(itemsIndex + 15)

      const payload: ProductsSearchPayload = {
         index: itemsIndex + 15,
         priceSort: sort,
         nameRegex: search.toLowerCase(),
         category: category.categoryId,
         subcategory: category.subCategory
      }

      if (!search) delete payload.nameRegex
      if (!category.categoryId) delete payload.category
      if (!category.subCategory) delete payload.subcategory

      dispatch(productActions.productsSearch.request(payload))
   }





   const onFilterPress = () => {
      Navigation.push(navigationService.getCurrentScreenId(), {
         component: {
            name: 'FilterCategoryScreen',
            passProps: {
               onCategoryPress: (category: CategorySearchT) => setCategory(category),
               search
            },
            options: {
               animations: {
                  push: {
                     enabled: true
                  }
               }
            }
         },
      });
   }

   const onSearchTextChange = (text: string) => {
      setSearch(text)

      if (search) {
         const payload: ProductsSearchPayload = {
            index: 0,
            priceSort: sort,
            nameRegex: text.toLowerCase(),
            category: category.categoryId,
            subcategory: category.subCategory
         }

         if (!text) delete payload.nameRegex
         if (!category.categoryId) delete payload.category
         if (!category.subCategory) delete payload.subcategory


         dispatch(productActions.productsSearch.request(payload))
      }
   }

   const onSortPress = () => {
      const payload: ProductsSearchPayload = {
         index: 0,
         priceSort: sort,
         nameRegex: search.toLowerCase(),
         category: category.categoryId,
         subcategory: category.subCategory
      }

      if (!search) delete payload.nameRegex
      if (!category.categoryId) delete payload.category
      if (!category.subCategory) delete payload.subcategory


      dispatch(productActions.productsSearch.request(payload))
      setSort(sort ? -1 : 1)
   }

   const onPressBack = () => {
      dispatch(UserActions.mainScreenRoute(`home`))
      // Navigation.pop(navigationService.getCurrentScreenId())

   }

   const onCancelPress = () => {
      if (search) {
         setSearch(``)
         const payload: ProductsSearchPayload = {
            index: 0,
            priceSort: sort,
            category: category.categoryId,
            subcategory: category.subCategory
         }

         if (!category.categoryId) delete payload.category
         if (!category.subCategory) delete payload.subcategory

         dispatch(productActions.productsSearch.request(payload))
      }
   }


   const isLoading = (productsFetching && !loadMore) || !productsData || !productsData.products

   const footerIsLoading = productsFetching && loadMore

   const onEndReached = () => {
      if (!loadMore && (productsData!.products.length % 15 === 0)) {
         onLoadMore()
         setLoadMore(true)
      }
   }

   return (

      <View style={s?.container}>
         <Header
            headerLeft={'arrow'}

            headerCenter={<SearchInput
               onClearPress={onCancelPress}
               value={search}
               onChangeText={onSearchTextChange} />}
            onPressBack={onPressBack}
            headerLeftWidth={`15%`}
            headerCenterWidth={`80%`}
            headerTitleFontSize={17}
            borderBottomWidth={0}
         />
         <SortBox onSortPress={isLoading ? () => { } : onSortPress}
            onFilterPress={isLoading ? () => { } : onFilterPress} />
         {(isLoading
            ? <Preloader />
            : <ProductsList
               onEndReached={onEndReached}
               isLoading={footerIsLoading}
               list={productsData!.products}
            />
         )}

      </View>

   )
})


{/* <Picker
selectedValue={pickerValue}
style={s?.picker}
onValueChange={(itemValue, itemIndex) => setPickerValue(itemValue)}
dropdownIconColor={theme.colors.lightBlue2}
>
{pickerData.map(d => (
   <Picker.Item key={d.delievery} label={d.delievery} value={d.delievery} />
))}
</Picker> */}
export { ProductsItemsScreen }