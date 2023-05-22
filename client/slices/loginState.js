import { createSlice } from '@reduxjs/toolkit'


let  initialState= {
    isUser:true
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
//     changeLoginState:(state) => {
     
// state.login=true
//     },
//     changeRegiserState:(state) => {

//         state.login=false
//     }
healthPracorUser: (state,action) => {
  if (action.payload ==='user'){
    state.isUser = true
  }else{
    state.isUser=false
  }
//  if (action.payload === true){
// state.isUser = true
//  }else{
//   state.isUser=false
//  }
}
  },
})

// Action creators are generated for each case reducer function
// export const {changeLoginState } = counterSlice.actions
// export const {changeRegiserState} = counterSlice.actions
export const {healthPracorUser} = counterSlice.actions
export const isUserState = (state) => state.counter.isUser
// export const loginState = (state) => state.counter.login
// export const registerState = (state) => state.counter.login
export default counterSlice.reducer