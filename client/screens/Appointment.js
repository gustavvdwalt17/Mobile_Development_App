import { View, Text } from 'react-native'
import React from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { useState } from 'react'

const Appointment = () => {
    const [date,setDate] = useState('')
    const minDate = new Date()
    const month = minDate.getMonth()
    const day = minDate.getUTCDate()
  
    const maxDate = new Date(2023,month,day + 7)


    console.log('date',date)
  return (
    <View>

        <CalendarPicker
  onDateChange={day => {
    setDate(day)
  }}
//   allowRangeSelection={true}
  minDate={minDate}
  maxDate={maxDate}
        />
    {/* <CalendarPicker/> */}
    </View>
  )
}

export default Appointment