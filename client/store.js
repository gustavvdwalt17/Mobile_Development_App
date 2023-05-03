import { configureStore } from '@reduxjs/toolkit'
import loginState from './slices/loginState'
export const store = configureStore({
  reducer: {loginSt:loginState},
})