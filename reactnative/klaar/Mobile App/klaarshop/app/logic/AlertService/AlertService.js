import * as React from 'react';
import { Alert } from 'react-native';
import { store } from '~/store/store';
import { OrdersActions } from '~/logic/orders/OrdersRedux';

export const showError = (message, title = `Oops...`, onClose = () => console.log('AlertService alert closed')) => {
   let errorMsg = message;
   store.dispatch(OrdersActions.showNotifictaion.saga({ isVisible: true, title: errorMsg, type: `error`, time: 2000 }));
   // Alert.alert(
   //    title,
   //    errorMsg,
   //    [
   //       { text: 'OK', onPress: onClose },
   //    ],
   //    { cancelable: false },
   // );
}

export const showSuccess = (message) => {
   let msg = message;
   store.dispatch(OrdersActions.showNotifictaion.saga({ isVisible: true, title: msg, type: `ok`, time: 2000 }));
   // Alert.alert(
   //    'Successfully',
   //    msg,
   //    [
   //       { text: 'OK', onPress: () => { console.log('AlertService alert closed') } },
   //    ],
   //    { cancelable: false },
   // );
   
}

export const showSuccessWithCallback = (message, callback) => {
   let msg = message;
   Alert.alert(
      'Successfully',
      msg,
      [
         { text: 'OK', onPress: () => callback() },
      ],
      { cancelable: false },
   );
}


export const showDialogWithCallBack = (message, callback) => {
   Alert.alert(
      "Confirm action",
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "YES", onPress: () => callback() }
      ]
    );
 }