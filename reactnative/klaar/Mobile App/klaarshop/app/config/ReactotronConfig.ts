import apisaucePlugin from 'reactotron-apisauce';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import AsyncStorage from '@react-native-community/async-storage'

export const reactotron = Reactotron
  .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    // controls connection & communication settings
    host: '192.168.1.102',
    name: 'klaarshop',
  })
  .useReactNative({
    // add all built-in react native plugins
    asyncStorage: false,
    editor: true,
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },

    errors: {
      // forward all errors to Reactotron
      // ignore all error frames from react-native (for example)
      veto: (frame: {fileName: string}) =>
        frame.fileName.indexOf('/node_modules/react-native/') >= 0,
    },
  })
  
  .use(sagaPlugin({}))
  .use(reactotronRedux())
  .use(
    apisaucePlugin({
      // ignoreContentTypes: /^(image)\/.*$/i   // <--- a way to skip printing the body of some requests (default is any image)
    }),
  ) // <-- here we go!!!
  .connect(); // let's connect!
