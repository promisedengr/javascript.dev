import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import {
   TouchableOpacity,
   View,
   Text,
   SafeAreaView,
   KeyboardAvoidingView,
   StatusBar,
   Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import stripe from 'tipsi-stripe'
import { Header } from '~/ui/components/Header';
import { useThemeContext } from '~/ui/theme';
import { gradients, colors } from '~/ui/theme/default/colors';
import { navigationService } from '../NavigationService';
import { createStyle } from './CartScreenStyles';
import { CartItem } from '~/ui/components/CartItem';
import BucketIcon from './assets/bucket';
import { Button } from '~/ui/components/Button';
import { PaymentActions } from '~/logic/payment/PaymentRedux';
import { paymentSelector } from '~/logic/payment/PaymentSelectors';
import { TextInput } from '~/ui/components/TextInput';
import { OurDropdown } from '~/ui/components/OurDropdown';
import { Checkbox } from '~/ui/components/Checkbox';
import CommentIcon from './assets/CommentIcon';
import { cartSelector } from '~/logic/cart/CartSelectors';
import { Preloader } from '~/ui/components/Preloader/Preloader';
import { CartActions, ChangeProductsAmountPayload } from '~/logic/cart/CartRedux';
import { OrdersActions } from '~/logic/orders/OrdersRedux';
import { ordersSelector } from '~/logic/orders/OrdersSelectors';
import { profileSelector } from '~/logic/profile/ProfileSelectors';
import { userSelector } from '~/logic/user/UserSelectors';
import { defineCurrency, definePrice } from '~/ui/renderHelpers/defineCurrency';
import { usePriceDefine } from '~/Hooks/usePriceDefine';

// stripe.setOptions({
//    publishableKey: "pk_test_51IBkY9JD6WXzzJcIWEUX5Z5646UznQzLIVwB0hWtM1aj6K4CpSaf5PIv5iu7yEvqt3BuqyTDQk2GUf4zPIGQV2dE004ntqgD7I",
//    androidPayMode: `test`
// })

type CartScreenProps = {};

const CartScreen: React.FC<CartScreenProps> = (props) => {


   const dispatch = useDispatch();

   const {
      step,
      productsToOrder
   } = useSelector(paymentSelector);

   const {
      createFromCart: {
         data: createFromCartData,
         fetching: createFromCartFetching
      },
      lastOrder
   } = useSelector(ordersSelector);

   const {
      getCartList: {
         data: cartData,
         fetching: cartFetching
      },
      changeProductsAmount: {
         fetching: changeAmountFetching
      }

   } = useSelector(cartSelector)

   const {
      currentCurrency
   } = useSelector(userSelector)

   const {
      deliveryAddresses: {
         data: deliveryAddresses
      }
   } = useSelector(profileSelector)

   const currencyPriceFormat = usePriceDefine()

   const { s } = useThemeContext(createStyle);
   const { t } = useTranslation();

   const [cityValue, setcityValue] = useState();
   const [cityData, setCityData] = useState([
      { value: "New York", label: "New York" },
      { value: "Washington", label: "Washington" },
      { value: "Chicago", label: "Chicago" }
   ]);
   const [streetValue, setstreetValue] = useState('');
   const [houseNumValue, sethouseNumValue] = useState('');
   const [appartValue, setappartValue] = useState('');
   const [regionValue, setregionValue] = useState();
   const [regionData, setRegionData] = useState([
      { value: "New York", label: "New York" },
      { value: "Ohio", label: "Ohio" },
      { value: "Kansas", label: "Kansas" },
   ]);
   const [mailIdxValue, setmailIdxValue] = useState('');

   // const [checked1, setChecked1] = useState(false); // Policy check
   const [hideErrors, setHideErrors] = useState(true);
   //const [allChecked, setAllChecked] = useState(false)

   const cartItems = cartData ? cartData.products : []


   // const [cartItems, setCartItems] = useState(cartData ? cartData.products.map(d => d.product) : []);

   const checkStepTwoValidation = !!cityValue && !!streetValue && !!houseNumValue && !!appartValue && !!regionValue && !!mailIdxValue

   useEffect(() => {
      //console.log('here', deliveryAddresses)
      //
      if (deliveryAddresses?.deliveryAddresses && deliveryAddresses.deliveryAddresses.length > 0) {
         const deliveryTo = deliveryAddresses.deliveryAddresses[0];
         setcityValue(deliveryTo.city);
         setCityData([{ value: deliveryTo.city, label: deliveryTo.city }]);
         setregionValue(deliveryTo.region);
         setRegionData([{ value: deliveryTo.region, label: deliveryTo.region }]);
         setstreetValue(deliveryTo.street);
         sethouseNumValue(deliveryTo.houseNumber);
         setappartValue(deliveryTo.squareNumberOrOffice);
         setmailIdxValue(deliveryTo.mailIndex);
      }
      //
      dispatch(CartActions.cartScreenName({ name: navigationService.getCurrentScreenId() }))
      if (!cartFetching) {
         dispatch(CartActions.getCartList.request())
      }
      return () => {
         dispatch(PaymentActions.changeStep('cart1'))
         dispatch(CartActions.cartScreenName({ name: `` }))
         dispatch(OrdersActions.lastOrder({ waiting: false, lastOrderId: `` }))
      }
   }, [])

   const goToOrdering = async () => {
      setHideErrors(false);

      if (checkStepTwoValidation) {
         dispatch(OrdersActions.lastOrder({ waiting: true, lastOrderId: `` }))
         dispatch(OrdersActions.createFromCart.request({
            region: regionValue,
            city: cityValue,
            street: streetValue,
            houseNumber: houseNumValue,
            squareNumberOrOffice: appartValue,
            mailIndex: mailIdxValue,
         }))
      }
   };

   const toggleAllChecks = () => {
      // setAllChecked(!allChecked)
      if (cartItems) {
         if (productsToOrder.length === 0) {
            const newProductsToOrder = cartItems.map((d, idx) => idx)
            dispatch(PaymentActions.updateProductsToOrder(newProductsToOrder))
         }
         else {
            dispatch(PaymentActions.updateProductsToOrder([]))
         }
      }
   }

   const onPressBack = () => {
      if (step === 'cart1') {
         Navigation.pop(navigationService.getCurrentScreenId())
      }
      if (step === 'cart2') {
         dispatch(CartActions.getCartList.request())
         dispatch(PaymentActions.changeStep('cart1'))
      }
   }

   // const onSwapHandler = (index: number) => {
   //     const newCartItems = [...cartItems];
   //     newCartItems.splice(index, 1);
   //     setCartItems(newCartItems);
   //     // console.log(`Length: `, newCartItems.length)
   //     // console.log(`Index: `, index)
   // }

   const onBucketPress = () => {
      if (cartItems.length === productsToOrder.length) {
         dispatch(CartActions.removeAllProducts.request())
      }
      else {
         productsToOrder.map(p => dispatch(CartActions.removeProduct.request({ index: `${p}` })))
      }
   }

   let price = 0
   if (cartItems) {

      for (let i = 0; i < cartItems.length; i++) {
         const d = cartItems[i];
         const pr = currencyPriceFormat({ price: d.pricePerOne, currency: d.product.currency });
         price += pr * d.amount;
      }
   }

   const transferPrice = currentCurrency === `rub` ? 10 : 0.14

   // const totalPrice = cartItems && cartItems.length === 0 ? 0 : price + transferPrice
   const totalPrice = cartItems && cartItems.length === 0 ? 0 : price
   //without transfer - free delivery
   const onCommentClick = () => {
      console.log(`onCommentClick`)
   }

   const onAmountChange =
      (amount: number, key: number) => {

         const payload: ChangeProductsAmountPayload = {
            data: {}
         }
         payload.data[key] = amount

         dispatch(CartActions.changeProductsAmount.request(payload))
      }



   const headerTitle = step === `cart1` ? `${t('toolbar.cart')} (${cartItems ? cartItems.length : 0})` : t(`addProduct.delivery`)

   return (
      <View style={s?.container}>
         <Header
            onPressBack={onPressBack}
            bgColor={colors.transparent}
            headerTitle={headerTitle}
            headerLeft={'arrow'}
            headerRight={
               step === `cart1`
                  ? (
                     cartData && cartData.products.length > 0
                        ? <View style={s?.headerRight}>
                           <Checkbox
                              onPress={() => toggleAllChecks()}
                              size={22}
                              isChecked={productsToOrder.length === cartItems.length}
                              borderColor={colors.lightGray}
                              checkedColor={colors.lightBlue2}
                              circle={true}
                              borderWidth={1}
                           />
                           <TouchableOpacity onPress={onBucketPress}>
                              <BucketIcon />
                           </TouchableOpacity>
                        </View>
                        : []
                  )
                  : (
                     []
                     // <TouchableOpacity onPress={() => onCommentClick()} >
                     //    <CommentIcon />
                     // </TouchableOpacity>
                  )
            }
         />
         {cartFetching || !cartItems
            ? <Preloader />
            : <>{step === 'cart1' &&
               <ScrollView style={s?.scrollViewStyle} contentContainerStyle={s?.scrollViewContainerStyle}>
                  <View style={s?.inputWidth}>
                     {cartItems.map((item, index) => {

                        const currentPrice = currencyPriceFormat({ price: item.pricePerOne, currency: item.product.currency })

                        return (
                           <View key={index}>
                              <CartItem idx={index}
                                 borderBottom={index === cartItems.length - 1}
                                 minSize={item.product.sizes[0]}
                                 maxSize={item.product.sizes[item.product.sizes.length - 1]}
                                 productColorsArray={item.product.colors}
                                 price={`${currentPrice * item.amount}`}
                                 productName={item.product.name}
                                 productImage={{ uri: item.product.mainPhoto }}
                                 amount={item.amount}
                                 onAmountChange={onAmountChange}
                                 changeAmountFetching={changeAmountFetching}

                                 currentCurrency={defineCurrency(currentCurrency)}
                              />
                           </View>
                        )
                     })}
                     {cartData && cartData.products.length > 0 &&
                        <View style={s?.footerValue}>
                           <Text style={s?.footerTextValue}>
                              {t(`toolbar.price`)}
                           </Text>
                           <Text style={s?.footerTextValue}>
                              {`${totalPrice.toString().replace(`.`, `,`)}${defineCurrency(currentCurrency)}`}
                           </Text>
                        </View>
                     }
                  </View>
                  {cartData && cartData.products.length > 0 ? 
                     <View style={[s?.alignItemsCenter, s?.marginTopx4]}>
                        
                        <View style={s?.buttonContainer}>
                           <Button
                              onPress={() => dispatch(PaymentActions.changeStep('cart2'))}
                              title={t('toolbar.pay')}
                              disabled={cartItems.length === 0 || cartFetching || !cartData}
                           />
                        </View>
                     </View>
                     : null
                  }
               </ScrollView>
            }
               {step === 'cart2' && <>
                  <ScrollView style={s?.inputsContainer}>
                     <KeyboardAvoidingView
                        behavior={'padding'}
                        style={{ flex: 1 }}
                     >
                        <View style={[s?.inputMargin, s?.inputWidth, { zIndex: 4 }]}>
                           <OurDropdown
                              inputLabel={t('profile.town')}
                              required={true}
                              value={cityValue}
                              setValue={setcityValue}
                              onChangeValue={(text) => setcityValue(text)}
                              data={cityData}
                              setItems={setCityData}
                              bgColor={'#fff'}
                           />
                        </View>
                        <View style={[s?.inputMargin, s?.inputWidth, { zIndex: 3 }]}>
                           <OurDropdown
                              inputLabel={t('profile.region')}
                              required={true}
                              value={regionValue}
                              setValue={setregionValue}
                              onChangeValue={(text) => setregionValue(text)}
                              data={regionData}
                              setItems={setRegionData}
                              bgColor={'#fff'}
                           />
                        </View>
                        <View style={[s?.inputMargin, s?.inputWidth]}>
                           <TextInput value={streetValue} inputLabel={t('profile.street')}
                              validationOk={hideErrors || !!streetValue} required
                              onChangeText={(text) => setstreetValue(text)}
                           />
                        </View>
                        <View style={[s?.inputMargin, s?.inputWidth]}>
                           <TextInput
                              validationOk={houseNumValue?.length > 0 && !!+houseNumValue}
                              value={houseNumValue} inputLabel={t('profile.houseNumber')} required
                              onChangeText={(text) => sethouseNumValue(text)}
                           />
                        </View>
                        <View style={[s?.inputMargin, s?.inputWidth]}>
                           <TextInput
                              validationOk={appartValue?.length > 0 && !!+appartValue}
                              value={appartValue} inputLabel={t('profile.ap')} required
                              onChangeText={(text) => setappartValue(text)}
                           />
                        </View>
                        <View style={[s?.inputMargin, s?.inputWidth]}>
                           <TextInput
                              validationOk={mailIdxValue?.length > 4}
                              value={mailIdxValue} inputLabel={t('profile.postcode')} required
                              onChangeText={(text) => setmailIdxValue(text)}
                           />
                        </View>
                     </KeyboardAvoidingView>
                  </ScrollView>


                  <View style={[s?.alignItemsCenter, s?.marginTopx4]}>
                     <View style={s?.buttonContainer}>
                        <Button
                           onPress={goToOrdering}
                           title={t('toolbar.pay')}
                           disabled={!checkStepTwoValidation || lastOrder.waiting || createFromCartFetching}
                           spinner={lastOrder.waiting || createFromCartFetching}
                        />
                     </View>
                  </View>
               </>
               }</>}
         {/* {step === `cart2` &&
            <StripePay />
         } */}
      </View>
   )
}
const MCartScreen = memo(CartScreen)
export { MCartScreen as CartScreen };

{/* <View style={s?.policyContainer}>
<Checkbox
    onPress={() => { setChecked1(!checked1) }}
    size={18}
    isChecked={checked1}
    borderColor={colors.lightGray}
    checkedColor={colors.orange}
    circle={true}
    borderWidth={1}
/>
<Text style={s?.policyText}>
    {t('Я соглашаюсь с ')}
    <Text style={s?.orangeText}>
        {t('политикой конфиденциальности')}
    </Text>
</Text>
</View> */}