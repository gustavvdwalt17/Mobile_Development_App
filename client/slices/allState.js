import { createSlice } from '@reduxjs/toolkit'


let  initialState= {
    isUser:true,
    schedule:null,
    allPracs:null,
    patientId:null,
    registerData:null,
    currentHealthPracAppointment:1,
    currentUserId:null,
    healthPracName:null
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
},
handleSchedule: (state, action) => {
  console.log(action.payload,'dapaylaod')
state.schedule = action.payload
},
addPracs: (state, action) => {

// state.allPracs.push(action.payload)
state.allPracs = action.payload
  },
addPatientID: (state, action) => {

// state.allPracs.push(action.payload)
state.patientId = action.payload
  },
  dataForRegister: (state, action) => {
console.log(action.payload,'settin')
// state.allPracs.push(action.payload)
state.registerData = action.payload
  },
  currHealthIdApp: (state, action) => {
console.log(action.payload,'pay')
// state.allPracs.push(action.payload)
state.currentHealthPracAppointment = action.payload
  },
  curruserId: (state, action) => {
console.log(action.payload,'pay')
// state.allPracs.push(action.payload)
state.currentUserId = action.payload
  },
  theHealthName: (state, action) => {
console.log(action.payload,'paylodaaa')
// state.allPracs.push(action.payload)
state.healthPracName= action.payload
  },

  },
})

// Action creators are generated for each case reducer function
// export const {changeLoginState } = counterSlice.actions
// export const {changeRegiserState} = counterSlice.actions
export const {healthPracorUser} = counterSlice.actions
export const {handleSchedule} = counterSlice.actions
export const {addPracs} = counterSlice.actions
export const {addPatientID} = counterSlice.actions
export const {dataForRegister} = counterSlice.actions
export const {currHealthIdApp} = counterSlice.actions
export const {curruserId} = counterSlice.actions
export const {theHealthName} = counterSlice.actions
export const isUserState = (state) => state.counter.isUser
export const scheduleState = (state) => state.counter.schedule
export const pracsState = (state) => state.counter.allPracs
export const patientID = (state) => state.counter.patientId
export const registerdata = (state) => state.counter.registerData
export const dahealthId = (state) => state.counter.currentHealthPracAppointment
export const theCurrentUserId = (state) => state.counter.currentUserId
export const selectHealthname = (state) => state.counter.healthPracName
// export const loginState = (state) => state.counter.login
// export const registerState = (state) => state.counter.login
export default counterSlice.reducer