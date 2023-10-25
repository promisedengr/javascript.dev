import * as React from 'react';
import { FC, memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
   View,
   StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesReducerActions } from '~/logic/categories/categories/CategoriesRedux';
import { categoriesSelector } from '~/logic/categories/categories/CategoriesSelectors';
import { productActions, ProductsSearchPayload } from '~/logic/product/ProductRedux';
import { ArrowButton } from '~/ui/components/ArrowButton';
import { Header } from '~/ui/components/Header';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { Theme, useThemeContext } from '~/ui/theme';
import { navigationService } from '../NavigationService';
import { CategorySearchT } from '../ProductsItemsScreen/ProductsItemsScreen';

export type ClientSettingsScreenProps = {
   componentId: string
   onCategoryPress: (category: CategorySearchT) => void
   search: string
};

const FilterCategoryScreen: FC<ClientSettingsScreenProps> = memo(({ onCategoryPress, search = `` }) => {

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation()
   const dispatch = useDispatch()
   const {
      getCategoriesList: {
         data: categoriesData,
         fetching: categoriesFetching
      } } = useSelector(categoriesSelector)

   useEffect(() => {
      dispatch(CategoriesReducerActions.getCategoriesList.request({ index: `0` }))
   }, [])

   useEffect(() => {
      if (categoriesData && !categoriesFetching) {
         setCategory(categoriesData.categories.map(d => {
            return { name: d.name, id: d._id, subCategories: d.subcategories }
         }))
      }

   }, [categoriesData])

   type CategoryT = { name: string, id?: string, subCategories?: string[] }[]



   const [category, setCategory] = useState<CategoryT>([]);
   const [isSub, setIsSub] = useState<boolean>(false)
   const [prevCategory, setPrevCategory] = useState<{ name: string, id: string }>({ name: ``, id: `` })


   const arrowButtonFunc = (name: string, item?: string[], id?: string): void => {
      if (!isSub && item && id) {
         setPrevCategory({ name, id })
         setCategory(item.map(i => ({ name: i })))
         setIsSub(true)
      }
      else {

         const payload: ProductsSearchPayload = {
            index: 0,
            category: id,
            subcategory: name,
            nameRegex: search.toLowerCase()
         }

         if (!search) delete payload.nameRegex

         dispatch(productActions.productsSearch.request(payload))
         onCategoryPress({ categoryId: id, subCategory: name })
         Navigation.pop(navigationService.getCurrentScreenId())
         // console.log(`Search name ${name}`)
      }
   };

   const onPressBack = () => {
      if (isSub && categoriesData) {
         setCategory(categoriesData.categories.map(d => {
            return { name: d.name, id: d._id, subCategories: d.subcategories }
         }))
         setIsSub(false)
      }
      else {
         Navigation.pop(navigationService.getCurrentScreenId())
      }
   }

   const onAllCategoriesPress = () => {
      if (isSub) {

         const payload: ProductsSearchPayload = {
            index: 0,
            category: prevCategory.id,
            nameRegex: search.toLowerCase()
         }

         if (!search) delete payload.nameRegex

         dispatch(productActions.productsSearch.request(payload))

         onCategoryPress({ categoryId: prevCategory.id })
         Navigation.pop(navigationService.getCurrentScreenId())
         //console.log(`Search prevCategory ${prevCategory}`)
      }
      else {

         const payload: ProductsSearchPayload = {
            index: 0,
            nameRegex: search.toLowerCase()
         }

         if (!search) delete payload.nameRegex

         dispatch(productActions.productsSearch.request(payload))
         onCategoryPress({ categoryId: `` })

         Navigation.pop(navigationService.getCurrentScreenId())
         //console.log(`Search without category`)
      }
   }


   return (
      <View style={s?.container}>
         <View /* style={s?.container} */>
            {categoriesFetching
               ? <Preloader />
               : (<ScrollView>
                  <Header
                     headerTitle={isSub ? prevCategory.name : t('filter.category')}
                     headerLeft={'arrow'}
                     onPressBack={onPressBack}
                  />
                  <ArrowButton
                     onPress={onAllCategoriesPress}
                     title={!isSub ? t(`filter.allcategories`) : t(`filter.incategoty`)}
                     borderBottom />
                  {category.map((item, i) => (
                     <ArrowButton key={i}
                        title={item.name}
                        onPress={() => arrowButtonFunc(item.name, item.subCategories, item.id)}
                        borderBottom
                     />
                  )
                  )}
               </ScrollView>
               )
            }
         </View>
      </View>
   )
})

export { FilterCategoryScreen }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
      },
      preloader: {
         justifyContent: `center`,
         alignItems: `center`,
         flex: 1
      }
   });
