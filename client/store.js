import { configureStore } from '@reduxjs/toolkit'
import loginState from './slices/allState'
export const store = configureStore({
  reducer: {loginSt:loginState},
})