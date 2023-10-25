import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { useThemeContext } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import { createStyle } from './ProductDescriptionStyles';

export type ProductDescriptionProps = {
   productName: string;
   productCategory: string;
   productDescription: string;
};


const ProductDescription: React.FC<ProductDescriptionProps> = ({
   productCategory,
   productDescription,
   productName
}) => {

   const [textOpened, setTextOpened] = useState(false);

   const { t } = useTranslation()

   const textLess = productDescription.slice(0, 150);
   const textMore = productDescription;
   const { s } = useThemeContext(createStyle);

   const lessThen150 = productDescription.length <= 150

   return (
      <View style={s?.container}>
         <Text style={s?.categoryText}>{productCategory}</Text>
         <Text style={s?.nameText}>{productName}</Text>
         <Text style={s?.categoryText}>{t(`product.description`)}</Text>
         <Text style={s?.descriptionText}>
            {textOpened || lessThen150 ? textMore : textLess + '...'}{!lessThen150
               ?
               <Text onPress={() => setTextOpened(!textOpened)} style={{ color: colors.mainBlue, fontSize: 14 }}>
                  {textOpened ? ' Show less' : ' Show more'}
               </Text>
               : null}
         </Text>


      </View >
   );
};

ProductDescription.defaultProps = {

}


const ProductDescriptionM = memo(ProductDescription);
export { ProductDescriptionM as ProductDescription };
