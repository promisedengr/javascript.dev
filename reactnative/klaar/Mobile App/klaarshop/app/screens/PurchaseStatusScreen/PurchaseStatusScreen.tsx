import React, { memo, FC, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import stripe from 'tipsi-stripe'
import { useThemeContext, Theme } from '~/ui/theme'
import { theme } from '~/ui/theme/default/theme'
import { Header } from '~/ui/components/Header'
import { OrderStatusItem } from '~/ui/components/OrderStatusItem/OrderStatusItem'
import { navigationService } from '../NavigationService'
import { Navigation } from 'react-native-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { ProfileActions } from '~/logic/profile/ProfileRedux'
import { profileSelector } from '~/logic/profile/ProfileSelectors'
import { Preloader } from '~/ui/components/Preloader/Preloader'
import { dateDayMonthYear } from '~/store/restHelper'
import { OrdersActions, OrderStatusT } from '~/logic/orders/OrdersRedux'
import { ordersSelector } from '~/logic/orders/OrdersSelectors'
import { Notification } from '~/ui/components/Notification/Notification';
import { goToScreenWithProps } from '~/logic/goToScreen';

stripe.setOptions({
   publishableKey: "pk_test_51IBkY9JD6WXzzJcIWEUX5Z5646UznQzLIVwB0hWtM1aj6K4CpSaf5PIv5iu7yEvqt3BuqyTDQk2GUf4zPIGQV2dE004ntqgD7I",
   androidPayMode: `test`
})

export type PurchaseStatusScreenProps = {};

const PurchaseStatusScreen: FC<PurchaseStatusScreenProps> = (props) => {

   const { } = props
   const dispatch = useDispatch()

   const {
      getSelfOrders: {
         data: selfOrdersData,
         fetching: selfOrdersFetching
      },
      getSelfProfile: {
         data: selfProfileData,
         fetching: selfProfileFetching
      }
   } = useSelector(profileSelector)

   const {
      arrayOrdersById,
      getById: {
         fetching: byIdFetching
      },
      payOrder: {
         fetching: payOrderFetching
      },
      setOrderStatus: {
         fetching: setStatusFetching
      }
   } = useSelector(ordersSelector)

   useEffect(() => {
      dispatch(ProfileActions.getSelfOrders.request({ index: `0` }))
      return () => {
         dispatch(OrdersActions.arrayOrdersById(`delete`))
      }
   }, [])


   const [loadMore, setLoadMore] = useState(false);
   const [itemsIndex, setItemsIndex] = useState(15);
   const [modal, setModal] = useState(false);
   const [orderIdx, setOrderIdx] = useState('');

   if (!selfOrdersFetching && loadMore) {
      //console.log(`LoadMore toggle`)
      setLoadMore(false)
   }

   const { s } = useThemeContext(createStyle)
   const { t } = useTranslation()

   const onBackPress = () => Navigation.pop(navigationService.getCurrentScreenId());

   const dateFormater_DD_MM = (timeStamp: number) => {
      const date = dateDayMonthYear(timeStamp * 1000)
      return `${date[2]} ${date[1]}`
   }

   const addDate = () => {
      let datesArr: string[] = []

      const newMessagesListData: any = selfOrdersData
         ? { ...selfOrdersData, orders: [...selfOrdersData.orders] }
         : undefined

      if (newMessagesListData && newMessagesListData.orders) {
         for (let i = 0; i < newMessagesListData?.orders.length; i++) {
            if (!datesArr.includes(dateFormater_DD_MM(newMessagesListData?.orders[i].apperDate))) {
               newMessagesListData.orders[i] = {
                  ...newMessagesListData.orders[i],
                  elem: (<View style={s?.date}>
                     <Text style={s?.dateText}>
                        {dateFormater_DD_MM(newMessagesListData?.orders[i].apperDate)}
                     </Text>
                  </View>)
               }
               datesArr.push(dateFormater_DD_MM(newMessagesListData?.orders[i].apperDate))
            }
         }
      }

      return newMessagesListData
   }

   const newSelfOrdersData = addDate()


   const onPayPress = async (orderId: string) => {

      const demoCardFormParameters = {
         // Only iOS support this options
         smsAutofillDisabled: true,
         requiredBillingAddressFields: 'zip',
         prefilledInformation: {
            billingAddress: {
               name: 'Gunilla Haugeh',
               line1: 'Canary Place',
               line2: '3',
               city: 'Macon',
               state: 'Georgia',
               country: 'US',
               postalCode: '31217',
               email: 'ghaugeh0@printfriendly.com',
            },
         },
      }


      try {

         const { tokenId } = await stripe.paymentRequestWithCardForm(demoCardFormParameters)
         dispatch(OrdersActions.payOrder.request({ orderId, orderToken: tokenId }))

      } catch (error) {
         console.log(error)
         if (error.message === `Cancelled by user`) {

         }
      }
   }

   const onLoadMore = () => {
      setItemsIndex(itemsIndex + 15)

      dispatch(ProfileActions.getSelfOrders.request({ index: `${itemsIndex}` }))
   }

   const onEndReached = () => {
      if (!loadMore && (selfOrdersData!.orders.length % 15 === 0)) {
         onLoadMore()
         setLoadMore(true)
      }
   }


   const ordersByIdKeys = Object.keys(arrayOrdersById)
   console.log(arrayOrdersById, 'here')

   const onItemPress = (payload: { orderId: string, idx: number }) => {

      if (!ordersByIdKeys.includes(`${payload.idx}`)) {
         dispatch(OrdersActions.getById.request(payload));
         setModal(true);
         setOrderIdx(payload.idx);
      }
   }

   const footerLoader = (loading: boolean) => (
      loading
         ? <View style={{ paddingVertical: 10 }}><Preloader /></View>
         : selfOrdersData && (selfOrdersData?.orders.length % 15 === 0) ? <View style={{ height: 50 }} /> : null
   )

   const onSetStatusPress = (orderId: string, newStatus: OrderStatusT) => {
      dispatch(OrdersActions.setOrderStatus.request({ orderId, newStatus }))
   }

   const onAccept = () => {
      setModal(false);
      let product = arrayOrdersById[orderIdx].products[0].product;
      goToScreenWithProps('WriteReviewScreen', {
         productId: product._id,
         photo: product.mainPhoto,
         fn: product.name,
         ln: ''
      });
   }

   const onClose = () => {
      setModal(false);
   }

   const _renderItem = ({ item, index }: { item: typeof selfOrdersData.orders[0] & { elem: JSX.Element }, index: number }) => {

      return (
         <>
            {item.elem ? item.elem : null}
            <OrderStatusItem
               isBuyer={item.buyer._id === selfProfileData?._id}
               isSeller={item.seller._id === selfProfileData?._id}
               payDisabled={payOrderFetching}
               ordersByIdKeys={ordersByIdKeys}
               isLoading={byIdFetching || setStatusFetching}
               setStatusFetching={setStatusFetching}
               orderId={item._id}
               idx={index}
               onSetStatusPress={(status: OrderStatusT) => onSetStatusPress(item._id, status)}
               onPayPress={onPayPress}
               onPress={onItemPress}
               name={`#${item._id.slice(item._id.length - 5, item._id.length)}`.toUpperCase()}
               status={item.status}
               products={ordersByIdKeys.includes(`${index}`) ? arrayOrdersById[`${index}`] : undefined} />
         </>
      )
   }

   return (
      <View style={s?.container}>
         <Notification status={modal} onAccept={onAccept} onClose={onClose} />
         <Header
            headerLeft={`arrow`}
            onPressBack={onBackPress}
            bgColor={theme.colors.transparent}
            headerTitleFontSize={17}
            headerTitle={t('profile.purchaseStatus')}
            borderBottomWidth={0}
         />
         {(selfOrdersFetching || !selfOrdersData) && !loadMore
            ? <Preloader />
            : <FlatList
               showsVerticalScrollIndicator={false}
               onEndReached={onEndReached}
               data={newSelfOrdersData!.orders}
               renderItem={_renderItem}
               keyExtractor={item => item._id}
               onEndReachedThreshold={0.1}
               ListFooterComponent={footerLoader(selfOrdersFetching && loadMore)} />
         }
      </View>
   )
}

const MemorizedComponent = memo(PurchaseStatusScreen)
export { MemorizedComponent as PurchaseStatusScreen }

const createStyle = (theme: Theme) =>
   StyleSheet.create({
      container: {
         flex: 1
      },
      date: {
         alignItems: `center`,
         justifyContent: `center`,
         paddingVertical: theme.metrics.x2
      },
      dateText: {
         color: theme.colors.gray7,
         fontWeight: "600",
         fontSize: 14
      }
   })