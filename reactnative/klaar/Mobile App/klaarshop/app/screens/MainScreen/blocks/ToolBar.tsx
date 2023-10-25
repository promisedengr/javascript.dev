import React, { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { useThemeContext, Theme } from '~/ui/theme';
import { colors } from '~/ui/theme/default/colors';
import BeautyIcon from '../assets/BeautyIcon';
import ClothIcon from '../assets/ClothIcon';
import ForChildrenIcon from '../assets/ForChildrenIcon';
import ShoesIcon from '../assets/ShoesIcon';
import WatchIcon from '../assets/WatchIcon';
import HomeIcon from '../assets/HomeIcon';
import ChildCartIcon from '../assets/ChildCartIcon';
import MirrorIcon from '../assets/MirrorIcon';
import TicketIcon from '../assets/TicketIcon';
import BagIcon from '../assets/Bag';
import { CategoryT } from '../MainScreen';

interface Props {
   onIconPress: (arg: CategoryT) => void
   categories?: CategoryT[]
   activeCategory: string
}

const { width: w } = Dimensions.get(`screen`)

const ToolBar: FC<Props> = (props) => {

   const { onIconPress, categories = [], activeCategory } = props

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const iconHandler = (name: string, color: string) => {
      switch (name) {
         case 'All': return <HomeIcon color={color} />
         case 'bags': return <BagIcon color={color} />
         case 'beauty': return <MirrorIcon color={color} />
         case 'clothes': return <ClothIcon color={color} />
         case 'kids': return <ChildCartIcon color={color} />
         case 'shoes': return <ShoesIcon color={color} />
         case 'tickets': return <TicketIcon color={color} />
         case 'watches': return <WatchIcon color={color} />
      }
   }

   return (
      <ScrollView horizontal
         showsHorizontalScrollIndicator={false}
         style={s?.container}
         contentContainerStyle={s?.scrollContent}
      >
         {categories.map((d, idx) => (
            <TouchableOpacity onPress={() => onIconPress(d)} key={d.id} style={[s?.iconsWrapper, idx === 0 ? s?.w0 : s?.w1]}>
               <View>
                  {iconHandler(d.name, activeCategory === d.name ? colors.mainBlue : `#000`)}
               </View>
               <Text style={[s?.titleText, activeCategory === d.name ? s?.active : {}]}>
                  {t(`toolbar.${d.name}.${d.name}`)}
               </Text>
            </TouchableOpacity>
         ))}
      </ScrollView>
   )
}

export { ToolBar }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flexDirection: `row`,
      },
      scrollContent: {
         justifyContent: `space-evenly`,
         flexGrow: 1
      },
      iconsWrapper: {
         justifyContent: `center`,
         alignItems: `center`,
         // paddingHorizontal: theme.metrics.x4
      },
      w0: {
         paddingHorizontal: theme.metrics.x4
      },
      w1: {
         width: w * 0.22
      },
      titleText: {
         fontSize: 14,
         color: theme.colors.silver,
         fontWeight: "400",
         paddingTop: theme.metrics.x2
      },
      active: {
         color: theme.colors.mainBlue
      }
   })