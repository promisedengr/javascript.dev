import * as React from 'react';
import { memo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Theme, useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { fonts } from '~/ui/theme/default/fonts';
import { AddPhotoBoxButton } from '../AddPhotoBoxButton';
import { PhotoComponent } from '../PhotoComponent';

const { width, height } = Dimensions.get('window');

type ItemType = { num: number, role: string, photo: any };

export type ProductsPhotoBoxType = {
   items: ItemType[];
   addPhoto(arr: ItemType[], num: number): void;
   deletePhoto(arr: ItemType[], num: number): void;
};


const ProductsPhotoBox: React.FC<ProductsPhotoBoxType> = props => {
   const {
      items,
      addPhoto,
      deletePhoto
   } = props;

   const { s } = useThemeContext(createStyle);

   return (
      <View style={s?.box}>
         {items.map((item: ItemType, index) => {

            if (index === 8)
               return (
                  <React.Fragment key={item.num}>
               </React.Fragment>
               )
            return (
               <View key={item.num} style={[s?.container,
               !item.photo
                  ? { backgroundColor: item.role === 'main' ? colors.mainBlue : colors.background }
                  : {borderRadius: 30 }]}
               >
                  {item.photo
                     ? <PhotoComponent
                        onPress={() => deletePhoto(items, item.num)}
                        image={item.photo}
                     />
                     : (item.role === 'main'
                        ? <AddPhotoBoxButton
                           onPress={() => addPhoto(items, index)}
                        />
                        : <View style={s?.iconBox}>
                           <Text style={[s?.textBox, fonts.h3.regular]}>
                              {index + 1}
                           </Text>
                        </View>
                     )
                  }
               </View>
            )
         })
         }

      </View>
   )
};

const MProductsPhotoBox = memo(ProductsPhotoBox);
export { MProductsPhotoBox as ProductsPhotoBox };

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      box: {
         alignSelf: 'center',
         width: width * 0.92,
         justifyContent: 'space-between',
         flexDirection: 'row',
         flexWrap: 'wrap',
         marginBottom: 16
      },
      container: {
         width: 79,
         height: 79,
         marginBottom: 9,
         borderRadius: 30,
         //backgroundColor: theme.colors.background,
         justifyContent: 'center',
         alignItems: 'center',
      },
      imageStyle: {
         width: '100%',
         height: '100%',
         borderRadius: 30
      },
      iconBox: {
         alignItems: 'center',
         justifyContent: 'center',
         width: theme.metrics.x6,
         height: theme.metrics.x6,
         borderRadius: theme.metrics.x3,
         backgroundColor: theme.colors.white,
      },
      deleteIcon: {
         position: 'absolute',
         zIndex: 1,
         top: 0,
         left: 55
      },
      textBox: {
         letterSpacing: -0.3,
         color: theme.colors.gray3
      },
      photoIconText: {
         color: theme.colors.white,
      }
   });