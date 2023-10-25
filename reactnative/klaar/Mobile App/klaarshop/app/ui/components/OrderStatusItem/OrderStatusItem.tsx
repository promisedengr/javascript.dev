import { T } from 'lodash/fp';
import React, { memo, FC, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image';
import { OrderByIdT, OrderStatusT, ProductFromOrderT } from '~/logic/orders/OrdersRedux';
import { defineCurrency } from '~/ui/renderHelpers/defineCurrency';
import { CustomButton } from '~/ui/components/CustomButton';
import { useThemeContext, Theme } from '~/ui/theme'
import { colors } from '~/ui/theme/default/colors';
import ArrowDownIcon from '../OurDropdown/assets/arrowDown';
import { Preloader } from '../Preloader/Preloader';
import { theme } from '~/ui/theme/default/theme';

const { width, height } = Dimensions.get('window');

export type OrderStatusItemProps = {
   setStatusFetching: boolean
   isLoading: boolean
   orderId: string
   name: string
   status: OrderStatusT
   products: OrderByIdT
   onPress: (...args: any) => void
   onPayPress: (...args: any) => void
   idx: number
   ordersByIdKeys: string[]
   payDisabled: boolean
   isSeller?: boolean
   isBuyer?: boolean
   onSetStatusPress: (...args: any) => void
}



const OrderStatusItem: FC<OrderStatusItemProps> = (props) => {
   const { name, status, onPress, orderId, idx, setStatusFetching, products, isLoading, ordersByIdKeys = [], onPayPress, payDisabled, isBuyer, isSeller, onSetStatusPress } = props
   const { s } = useThemeContext(createStyle)
   const { t } = useTranslation()

   const statusDefine = (status: OrderStatusT) => {
      switch (status) {
         case `waitPayment`:
            return t(`status.payment`)
         case 'inProgress':
            return t('status.progress')
         // case `waitShipment`:
         //    return t(`status.pending`)
         // case `shipping`:
         //    return t(`status.shipped`)
         case `done`:
            return t(`status.delivered`)
         default:
            return t(`status.unknown`)
      }
   }

   const [isVisible, setisVisible] = useState(false)

   // const onPress = () => {
   //    setisVisible(!isVisible)
   // }

   const _renderItem = ({ item }: { item: ProductFromOrderT }) => {
      return (
         <View style={s?.container}>
            <FastImage source={{ uri: item.product.mainPhoto }} style={s?.img} />
            <View style={s?.productData}>
               <View style={s?.productDataTextWrapper}>
                  <Text style={s?.label}>{`${t(`order.name`)}: `}</Text>
                  <Text style={s?.productDataText}>{item.product.name}</Text>
               </View>
               <View style={s?.productDataTextWrapper}>
                  {item.size && <Text style={s?.label}>{`${t(`order.size`)}: `}</Text>}
                  {item.size && <Text style={s?.productDataText}>{item.size}</Text>}
               </View>
            </View>
            <View style={s?.arrowWrapper}>
               <Text style={s?.priceText}>
                  {`${item.pricePerOne * item.amount} ${defineCurrency(products.currency)}`}
               </Text>
            </View>
         </View>
      )
   }

   const onItemPress = () => {
      if (isVisible) {
         setisVisible(false)
      }
      else {
         console.log(`orderIdItem`, orderId)
         onPress({ orderId, idx })
         setisVisible(true)
      }
   }
   //console.log(`products`, products)

   return (
      <View style={s?.margBot}>
         <TouchableOpacity style={s?.container} onPress={onItemPress}>
            {/* <FastImage source={require('~/screens/PurchaseStatusScreen/assets/PurchaseStatusImage.png')} style={s?.img} /> */}
            <View style={s?.title}>
               <Text style={[s?.titleText, s?.gray7Text]}>
                  {`${t(`order.order`)}: `}
               </Text>
               <Text style={s?.titleText}>
                  {name}
               </Text>
            </View>
            <View style={s?.status}>
               <Text style={s?.statusText}>
                  {statusDefine(status)}
               </Text>
            </View>
            <View style={[s?.arrowWrapper, isVisible ? s?.rotate180 : {}]}>
               <ArrowDownIcon stroke={colors.grape} w={15} h={15} />
            </View>
         </TouchableOpacity>
         {isVisible
            ? (
               (isLoading || !products) && !ordersByIdKeys.includes(`${idx}`)
                  ? <Preloader />
                  : <View>
                     <FlatList
                        style={s?.productsWrapper}
                        data={products.products}
                        keyExtractor={item => `${item._id}`}
                        renderItem={_renderItem}
                     />
                     {status === `waitPayment` && isBuyer
                        ?
                        <TouchableOpacity
                           onPress={payDisabled ? () => false : () => onPayPress(orderId)}
                           style={[s?.payButton, payDisabled ? s?.payButtonDisabled : {}]}>
                           <Text style={s?.payText}>{`${t(`order.pay`)}`}</Text>
                        </TouchableOpacity>
                        : null
                     }
                     {status === `inProgress` && isBuyer &&
                        <View style={s?.endRow}>
                           <View style={[s?.confirmBtn, payDisabled ? s?.payButtonDisabled : {}]}>
                              <CustomButton
                                 onPress={payDisabled ? () => false : () => onSetStatusPress(`done`)}
                                 spinner={setStatusFetching}
                                 spinnerSize={'small'}
                                 spinnerColor={'#fff'}
                                 borderRadius={6}
                                 bgColorActive={theme.colors.blue2}
                                 bgColorUnactive={theme.colors.gray6}
                                 titleFontSize={12}
                                 title={t(`order.confirmDelivery`)}
                                 disabled={payDisabled}
                              />
                           </View>
                        </View>
                     }
                  </View>
            )
            : null}
      </View >
   )
}




const MemorizedComponent = memo(OrderStatusItem)
export { MemorizedComponent as OrderStatusItem }



const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flexDirection: `row`,
         padding: theme.metrics.x3,
         backgroundColor: theme.colors.white,
         alignItems: `center`,
      },
      endRow: {
         width: '100%',
         alignItems: 'flex-end'
      },
      img: {
         borderRadius: theme.metrics.x2,
         width: 50,
         height: 50
      },
      title: {
         flexDirection: `row`
      },
      titleText: {
         fontSize: 18,
         fontWeight: "400"
      },
      gray7Text: {
         color: theme.colors.gray7,
      },
      status: {
         backgroundColor: theme.colors.avocado,
         borderRadius: theme.metrics.x + theme.metrics.x05,
         alignItems: `center`,
         justifyContent: `center`,
         paddingVertical: theme.metrics.x05,
         marginLeft: `3%`,
         minWidth: 100
      },
      statusText: {
         color: theme.colors.white,
      },
      arrowWrapper: {
         flexGrow: 1,
         alignItems: `flex-end`,
      },
      rotate180: {
         transform: [{ rotateX: `180deg` }]
      },
      productData: {
         justifyContent: `center`,
         marginLeft: `10%`

      },
      productDataTextWrapper: {
         flexDirection: `row`
      },
      label: {
         color: theme.colors.gray7,
         fontSize: 14
      },
      productDataText: {
         color: theme.colors.black,
         fontSize: 14
      },
      priceText: {
         color: theme.colors.black,
         marginRight: `4%`,
         fontSize: 16
      },
      productsWrapper: {
         paddingTop: theme.metrics.x3,
         backgroundColor: theme.colors.white,
      },
      margBot: {
         marginBottom: theme.metrics.x2
      },
      confirmBtn: {
         height: 24,
         width: width * 0.4,
         marginRight: 12,
      },
      payButton: {
         paddingHorizontal: theme.metrics.x7,
         paddingVertical: theme.metrics.x,
         alignSelf: `flex-end`,
         marginRight: 12,
         borderRadius: 6,
         backgroundColor: theme.colors.blue2,
         justifyContent: `center`,
         alignItems: `center`,
         marginTop: theme.metrics.x2
      },
      payText: {
         color: theme.colors.white,
         fontSize: 13
      },
      payButtonDisabled: {
         backgroundColor: theme.colors.gray6
      }
   })