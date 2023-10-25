import React, { FC, memo, useState } from "react";
import { Dimensions, View, Text, TouchableOpacity, ImageSourcePropType } from "react-native";

import ItemLayout, { ItemModel } from "./ItemLayout";
import { useThemeContext } from '~/ui/theme';
import { useTranslation } from "react-i18next";
import { createStyle } from "./CartItemStyles";
import { Iterator } from "../Iterator/Iterator";
import { CurrencyT, SymbCurrencyT } from "~/logic/product/ProductRedux";
import { ColorsType } from "~/logic/profile/ProfileRedux";

const { width } = Dimensions.get("window");

export interface CartItemProps {
   idx: number;
   minSize: number;
   maxSize: number;
   price: string;
   productColorsArray: ColorsType;
   productName: string;
   productImage: ImageSourcePropType;
   borderBottom: boolean;
   passiveMode?: boolean;
   disabled?: boolean
   amount: number
   onAmountChange: (amount: number, key: number) => void
   changeAmountFetching: boolean
   currentCurrency: SymbCurrencyT
}

const CartItem: FC<CartItemProps> = ({ idx,
   minSize, maxSize, price, productColorsArray, productName,
   productImage, borderBottom, passiveMode, disabled = false, amount, onAmountChange, changeAmountFetching, currentCurrency }) => {



   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const [isVisible, setIsVisible] = useState(!disabled)
   //const [iterator, setIterator] = useState(1)
   //const [pickerVisible, setPickerVisible] = useState(false)
   const maxValue = 4


   const changeIterator = (idx: number) => (bool: boolean, amount: number) => {


      if (bool) {
         if (amount === maxValue) return
         onAmountChange(amount + 1, idx)
      }
      else {
         if (amount === 0) return
         onAmountChange(amount - 1, idx)

      }
   }


   const onCartItemPress = () => {
      if (!disabled) {
         setIsVisible(!isVisible)
      }
   }

   const item = {
      idx,
      minSize,
      maxSize,
      price,
      productColorsArray,
      productName,
      productImage,
      currentCurrency
   }


   return (
      <View>
         <TouchableOpacity onPress={onCartItemPress}>
            <ItemLayout {...{ item }} borderBottom={borderBottom} passiveMode={!!passiveMode ? passiveMode : false} />
         </TouchableOpacity>
         {isVisible
            && <>
               <View style={s?.footer}>
                  <View>
                     <Text style={s?.footerText}>
                        {t(`addProduct.item`)}
                     </Text>
                  </View>
                  <View>
                     <Iterator disabled={changeAmountFetching} changeIterator={changeIterator(idx)} iterator={amount} />
                  </View>
               </View>
               {/* <View style={s?.footer}>
                  <View style={{ flexDirection: `row` }}>
                     <Text style={s?.footerText}>
                        {t(`ТИП ДОСТАВКИ`)}
                     </Text>
                     <Text style={s?.starText}>*</Text>
                  </View>
                  <View style={s?.pickerWrapper}>

                     <Picker
                        selectedValue={pickerValue}
                        style={s?.picker}
                        onValueChange={(itemValue) => setPickerValue(itemValue)}
                        dropdownIconColor={theme.colors.lightBlue2}
                     >
                        {pickerData.map(d => (
                           <Picker.Item key={d.delievery} label={d.delievery} value={d.delievery} />
                        ))}
                     </Picker>
                  </View> 

               </View> */}
            </>
         }
      </View>
   );
};





CartItem.defaultProps = {
   passiveMode: false
}

const CartItemM = memo(CartItem);
export { CartItemM as CartItem };