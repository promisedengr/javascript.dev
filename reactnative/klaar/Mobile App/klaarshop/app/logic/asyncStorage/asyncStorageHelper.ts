import AsyncStorage from '@react-native-community/async-storage';

export const storeTokenToAsyncStorage = async (token: string) => {
   try {
      await AsyncStorage.setItem('@user_token', token)
   } catch (e) {
      console.log(e)
   }
}

export const getTokenFromAsyncStorage = async () => {
   try {
      const token = await AsyncStorage.getItem('@user_token')
      if (token !== null) {
         return token
      } else {
         return null
      }
   } catch (e) {
      console.log(e)
   }
}

export const storeCurrencyToAsyncStorage = async (currency: string) => {
   try {
      await AsyncStorage.setItem('@user_currency', currency)
   } catch (e) {
      console.log(e)
   }
}

export const getCurrencyFromAsyncStorage = async () => {
   try {
      const currency = await AsyncStorage.getItem('@user_currency')
      if (currency !== null) {
         return currency
      } else {
         return null
      }
   } catch (e) {
      console.log(e)
   }
}

export const storeLanguageToAsyncStorage = async (language: string) => {
   try {
      await AsyncStorage.setItem('@user_language', language)
   } catch (e) {
      console.log(e)
   }
}

export const getLanguageFromAsyncStorage = async () => {
   try {
      const language = await AsyncStorage.getItem('@user_language')
      if (language !== null) {
         return language
      } else {
         return null
      }
   } catch (e) {
      console.log(e)
   }
}

export const deleteTokenFromAsyncStorage = async () => {
   try {
      await AsyncStorage.removeItem('@user_token');
   } catch (e) {
      console.log(e)
   }
}

export const storeUserIdToAsyncStorage = async (userId: string) => {
   try {
      await AsyncStorage.setItem('@user_id', userId)
   } catch (e) {
      console.log(e)
   }
}

export const getUserIdFromAsyncStorage = async () => {
   try {
      const userId = await AsyncStorage.getItem('@user_id')
      if (userId !== null) {
         return userId
      } else {
         return null
      }
   } catch (e) {
      console.log(e)
   }
}

export const deleteUserIdFromAsyncStorage = async () => {
   try {
      await AsyncStorage.removeItem('@user_id');
   } catch (e) {
      console.log(e)
   }
}