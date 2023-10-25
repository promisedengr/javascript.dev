import React, { memo, FC, PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import stripe from 'tipsi-stripe'

import Button from './components/Button'
import { demoCardFormParameters } from './scenes/demodata/demodata';

stripe.setOptions({
   publishableKey: "pk_test_51IBkY9JD6WXzzJcIWEUX5Z5646UznQzLIVwB0hWtM1aj6K4CpSaf5PIv5iu7yEvqt3BuqyTDQk2GUf4zPIGQV2dE004ntqgD7I",
   androidPayMode: `test`
})

export type StripePayProps = {};

export default class CardFormScreen extends PureComponent {
   static title = 'Card Form'

   state = {
      loading: false,
      paymentMethod: null,
   }

   handleCardPayPress = async () => {
      try {
         this.setState({ loading: true, paymentMethod: null })

         const paymentMethod = await stripe.paymentRequestWithCardForm(demoCardFormParameters)
         if(paymentMethod) {
            
         }

         this.setState({ loading: false, paymentMethod })
      } catch (error) {
         this.setState({ loading: false })
      }
   }

   render() {
      const { loading, paymentMethod } = this.state
      console.log(`paymentMethod:`, paymentMethod)

      return (
         <View style={styles.container}>
            <Text style={styles.header}>Card Form Example</Text>
            <Text style={styles.instruction}>Click button to show Card Form dialog.</Text>
            <Button
               text="Enter you card and pay"
               loading={loading}
               onPress={this.handleCardPayPress}
            />
            <View style={styles.paymentMethod} >
               {paymentMethod && (
                  <Text style={styles.instruction}>Payment Method: {JSON.stringify(paymentMethod.tokenId)}</Text>
               )}
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   header: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
   },
   instruction: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
   },
   paymentMethod: {
      height: 20,
   },
})



const MemorizedComponent = memo(CardFormScreen)
export { MemorizedComponent as StripePay }

  // const { } = props
   // //const { s } = useThemeContext(createStyle)

   // const STRIPE_PUBLIC_KEY = `pk_test_51IGhqNGIQWOtBeWDz745olP9zv77IEIqy5U8pBYbV9UyZSKB3mUx2GVFLp6jSdl1t1UHgzz8lpc2JPCUqsQdkS7O00cZCAjPeK`
   // const CHECKOUT_SESSION_ID = `cs_test_a1DUgo6Ty4LGtTctqEhU5IeQRKd2JhjHrokD0z9jrj7Nov7V2BWGwqrObx`

   // return (
   //    <StripeCheckout
   //       stripePublicKey={STRIPE_PUBLIC_KEY}
   //       checkoutSessionInput={{
   //          sessionId: CHECKOUT_SESSION_ID,
   //       }}
   //       onSuccess={({ checkoutSessionId }) => {
   //          console.log(`Stripe checkout session succeeded. session id: ${checkoutSessionId}.`);
   //       }}
   //       onCancel={() => {
   //          console.log(`Stripe checkout session cancelled.`);
   //       }}
   //    />
   // )