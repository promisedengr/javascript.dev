import { configureStore } from '@reduxjs/toolkit'

import NavbalanceSlice from './NavbalanceSlice'
import JwtSlice from './JwtSlice'

export default configureStore({
  reducer: {
    balance: NavbalanceSlice,
    jwt: JwtSlice
  }
})