import { createSlice } from '@reduxjs/toolkit'


export const JwtSlice = createSlice({
  name: 'jwt',
  initialState: {
    auth: false,
    token: '',
    isAdmin: 0,
    avata: ''
  },
  reducers: {
    reduxLogin: (state, action) => {
      state.auth = true
    },
    reduxLogout: (state, action) => {
      state.auth = false
      state.isAdmin = 0
    },
    setReduxToken: (state, action) => {
      state.token = action.payload
    },
    setReduxAvata: (state, action) => {
      state.avata = action.payload
    },
    setReduxAdminState: (state, action) => {
      state.isAdmin = action.payload
    }
  }
})

export const { reduxLogin, reduxLogout, setReduxToken, setReduxAdminState, setReduxAvata } = JwtSlice.actions

export const auth = state => state.jwt.auth
export const token = state => state.jwt.token
export const avata = state => state.jwt.avata
export const reduxIsAdmin = state => state.jwt.isAdmin

export default JwtSlice.reducer