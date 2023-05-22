import { View, Text, TouchableOpacity,Image, ScrollView } from 'react-native'
import React from 'react'
import CalendarPicker from 'react-native-calendar-picker'
import { useState,useEffect } from 'react'
import { pfp } from '../assets'
const Appointment = () => {
  const [disbleDate,setDisableDate] = useState([])
  const [theTimeUse,setTheTimeUser]=useState([])
  const [theBookedTimes,setTheBookedTimes]=useState([])
  const [newTimes,setNewTimes]=useState([])
  const [finalres,setFinalRes]=useState([])
      const disabledDates =[]
  useEffect(()=>{
  // let currdate = '2023/05/15'
  // let endDate = '2023/05/30'
  var today = new Date()
     const endDate = new Date(2023,month,day + 7)

 while (today <= endDate) {
   if (today.getDay() == 6 || today.getDay() == 0) {
      // disabledDates.push(currdate);
    let newDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
   disbleDate.push(newDate);
  }
   today.setDate(today.getDate() + 1); // Move to the next day

 }
    // for (let date = day;date<=maxDate; day.setDate(day.getDate() + 1)){
    //   console.log('1')
    // }
},[])
useEffect(()=>{

console.log('ussaaaaaaaaaaaa',theBookedTimes,theTimeUse)
  const flattenedArray1 = theTimeUse.flat()
  const flattenedArray2 = theBookedTimes.flat()


console.log('flattenedArray1',theTimeUse,flattenedArray2)

const combinedArray = flattenedArray1.concat(flattenedArray2)
console.log(combinedArray)
// Step 3: Create a Set to store unique times and an array for the result
const uniqueTimesSet = new Set();
const result = [];

// Step 4: Iterate over the combined array
for (const time of combinedArray) {
  // Check if the time is already in the Set
  if (!flattenedArray1.includes(time) || !flattenedArray2.includes(time)) {
    // Add the time to the Set and result array
    uniqueTimesSet.add(time);
    result.push(time);
  }
}
setFinalRes(result)

console.log('thefinalres',finalres)


},[theBookedTimes])
    const [date,setDate] = useState('')
    const [dateMatch,setDateMatch]=useState('')
    const [foundDate,setFoundDate]  = useState('')
    const minDate = new Date()
    const month = minDate.getMonth()
    const day = minDate.getUTCDate()

//     useEffect(()=>{
// const isWeekend = () => {
//     const day = date.getDay();
//     return day === 0 || day === 6; // Sunday is 0, Saturday is 6
//   };

//   const disabledDates = () => {
//     return isWeekend(date);
//   };
//     },[])


//Fetcg data from database based on which health prac is chosen
    
  const healthPracSchedule = [ //healthid
    {day:'Monday',time:["9:00","10:00","12:00","14:00","16:00"]},
    {day:'Tuesday',time:["8:00","10:00","12:00","14:00","16:00"]},
    {day:'Wednesday',time:["8:00","10:00","12:00","14:00","16:00"]},
    {day:'Thursday',time:["8:00","10:00","12:00","14:00","16:00"]},
    {day:'Friday',time:["8:00","10:00","12:00","14:00","16:00","18:00","19:00"]},
  ]
const booked = [ //healthid,userid
      {year:"2023/5/15",times:["8:00","10:00","12:00"]},
      {year:"2023-5-19",times:["9:00","10:00","16:00"]},
      {year:"2023-5-22",times:["9:00","10:00","16:00"]},
      
    ]
  
    const maxDate = new Date(2023,month,day + 7)



useEffect(()=>{
checkDates()
},[date])

function checkDates(){
  setTheBookedTimes([])
  setTheTimeUser([])
  setFoundDate('')
  setDateMatch('')
  //  if (date !==undefined ){
    // let newDate = date.toString().substring(0, 10);

let dateString = date.toString()
let dateArray = dateString.split(" ");
let month = dateArray[1];
let day = dateArray[2];

let year = dateArray[3];
let yearMonthDay = `${year}-${getMonthNumber(month)}-${day}`;
  if (date!==undefined) {
    const data = new Date(date)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 let theDay= days[data.getDay()]

const mondaySchedule = healthPracSchedule.find(schedule => schedule.day === 'Monday');
console.log('schelkaa',mondaySchedule) 
const mondayTimes = mondaySchedule.time;

const datess = new Date(yearMonthDay)

const dayofDate =days[datess.getUTCDay()]

const schedulea= healthPracSchedule.find(schedule => schedule.day === dayofDate);
if (schedulea!==undefined){
const theTimes = schedulea.time
console.log('this is the times',theTimes)
setTheTimeUser([theTimes])
// console.log('34523423',theTimes, bookTimes)
}

//found the schedule for onlick,schedulea

  console.log('thers a date',date)
const schedulea2= booked.find(schedule => schedule.year === yearMonthDay);
//now i have the schedule for the day and the booked dates, now i have to make the booked dates as not available and rest available
console.log('schelkaaasa',schedulea2)

if (schedulea2!==undefined){
// if (schedulea2!==undefined){
const bookTimes = schedulea2.times
console.log(bookTimes)

setTheBookedTimes([bookTimes])

}


// console.log('34523423',theTimes, bookTimes)
// }





  //mondaytimes = times for monday
  //year monthday = what click on
//get date which picks on day
//check schedule for that day

//get the day and then for clicked date check what dates is still available
// const thedaybre = 
  // const checkDate =(yearMonthDay.slice(yearMonthDay.lastIndexOf("/") + 1))
  // console.log('checkdate',checkDate)
  
}
// setDateMatch(yearMonthDay)
console.log('found',yearMonthDay)
// if (date!=="" && dateMatch!==""){
  // console.log(dateMatch,'asdasd')
const found = booked.find(item=>Object.keys(item)[0]===yearMonthDay)
setFoundDate(found)
console.log('founder',found)
// }
if (found !==undefined) {

  const extractedTimes = Object.entries(found).map(([_, timeArray]) => timeArray).flat();
  setFoundDate(extractedTimes)
  console.log(extractedTimes)
// console.log('timeeee',extractedTimes)
}
console.log('disdis',disbleDate)
// Output: "2023/5/18"
// setDateMatch( yearMonthDay)
// Helper function to get the month number from its name
function getMonthNumber(monthName) {
  const months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  return months[monthName]
}
  //  }
}




  return (
    <View>


      <View style={{padding:20,display:'flex',flexDirection:'row',marginTop:30,marginLeft:10,marginRight:10,borderRadius:10,backgroundColor:'#466CA7'}}>
        <Image source={pfp} style={{width:50,height:50,marginRight:10}} ></Image>
     
     <View style={{display:'flex',flexDirection:'column'}} >
 <Text style={{color:'white'}} >Dr. Martin Van Zyl</Text>
 <Text style={{color:'white'}}>Chiropractor</Text>
 <Text style={{color:'white',width:250}}>Dr. Martin Vyl is a Chiropracter and is very good at his job</Text>
     </View>
       
      </View>
<View style={{marginTop:50}}>

  <Text>Choose a Date</Text>
        <CalendarPicker
  onDateChange={day => {
    setDate(day)
  }}
//   allowRangeSelection={true}
  minDate={minDate}
  maxDate={maxDate}
   disabledDates={disbleDate}
   

        />
</View>

    {/* <CalendarPicker/> */}

<View style={{display:'flex',flexDirection:'row'}} >
<ScrollView
showsHorizontalScrollIndicator={false}
horizontal={true}
>  
  { finalres !==[] ? finalres.map((time) =>(

    <TouchableOpacity style={{backgroundColor:'blue',margin:10,width:60,padding:10}}>
       <Text style={{color:'white',textAlign:'center'}}  >
        {time}
       </Text>
     </TouchableOpacity>
   
  )):(
    <View><Text>No Bookings</Text></View>
  )}
  </ScrollView>

</View>

<TouchableOpacity style={{backgroundColor:'#1F3B5B',width:200,alignItems:'center',justifyContent:'center',padding:10,borderRadius:10}} >
  <Text style={{color:'white'}} >  Place Booking</Text>
</TouchableOpacity>
    </View>
  )
}

export default Appointment