import { createSlice } from '@reduxjs/toolkit'


export const NavbalanceSlice = createSlice({
  name: 'balance',
  initialState: {
    interest: {
      btc: 0,
      eth: 0,
      usdc: 0,
      sol: 0
    },
    pension: {
      btc: 0,
      eth: 0,
      usdc: 0,
      sol: 0
    },
    interest_apyrate: {
      btc: 0,
      eth: 0,
      usdc: 0,
      sol: 0
    },
    pension_apyrate: {
      btc: 0,
      eth: 0,
      usdc: 0,
      sol: 0
    },
    rate: {
      btc: 0,
      eth: 0,
      usdc: 0,
      sol: 0
    }
  },
  reducers: {
    setiBal: (state, action) => {
      state.interest = action.payload
    },
    setpBal: (state, action) => {
      state.pension = action.payload
    },
    setiApy: (state, action) => {
      state.interest_apyrate = action.payload
    },
    setpApy: (state, action) => {
      state.pension_apyrate = action.payload
    },
    setRate: (state, action) => {
      state.rate = action.payload
    },
    initBalDic: (state, action) => {
      state.interest = { btc: 0, eth: 0, usdc: 0, sol: 0 }
      state.pension = { btc: 0, eth: 0, usdc: 0, sol: 0 }
      state.interest_apyrate = { btc: 0, eth: 0, usdc: 0, sol: 0 }
      state.pension_apyrate = { btc: 0, eth: 0, usdc: 0, sol: 0 }
      state.rate = { btc: 0, eth: 0, usdc: 0, sol: 0 }
    }
  }
})

export const { setiBal, setpBal, setRate, setiApy, setpApy, initBalDic } = NavbalanceSlice.actions

export const getiBal = state => state.balance.interest
export const getpBal = state => state.balance.pension
export const getiApy = state => state.balance.interest_apyrate
export const getpApy = state => state.balance.pension_apyrate
export const getRate = state => state.balance.rate

export default NavbalanceSlice.reducer