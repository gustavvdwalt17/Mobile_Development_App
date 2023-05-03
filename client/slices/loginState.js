import { createSlice } from '@reduxjs/toolkit'


let  initialState= {
    login:true
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    changeLoginState:(state) => {
     
state.login=true
    },
    changeRegiserState:(state) => {

        state.login=false
    }
  },
})

// Action creators are generated for each case reducer function
export const {changeLoginState } = counterSlice.actions
export const {changeRegiserState} = counterSlice.actions
export const loginState = (state) => state.counter.login
export const registerState = (state) => state.counter.login
export default counterSlice.reducer