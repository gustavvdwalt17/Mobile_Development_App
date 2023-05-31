import { View, Text, TouchableOpacity,Image, ScrollView,StyleSheet } from 'react-native'
import React from 'react'
import axios from 'axios'
import CalendarPicker from 'react-native-calendar-picker'
import { useState,useEffect } from 'react'
import { pfp } from '../assets'
const Appointment = () => {

  const [timesyeh,setTimesyeh]=useState(null)
  const [userSchedule,setUserSchedule]=useState(null)
  const [clickedFormatted,setClickedFormatted]=useState(null)
  const [finalTime,setFinalTime]=useState(null)
  useEffect(()=>{
  const handlePress = async () =>{
 try {
  //also fetch appoinemtns and then delete old appointments
    const id = '1'
    const response = await axios.get('http://10.0.0.12:3001/fetch');
    // Handle the response from the server
    setTimesyeh(response.data)
    console.log('done')
    console.log('currentstuff',timesyeh)
    console.log(response.data);
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error);
  }
  // timesyeh.map((each)=>{
  //   console.log(each)
  // })
}
handlePress()
  },[])

//Select specific person then get their schedule and the booked dates for him and do this
//make sure all old dates are removed 
const [disbleDate,setDisableDate] = useState(['Sunday'])
  const [theTimeUse,setTheTimeUser]=useState([])
  const [theBookedTimes,setTheBookedTimes]=useState([])
  const [currIndex,setCurrIndex]=useState(null)
  const [selectedItem,setSelectedItem]=useState([])
  const [newTimes,setNewTimes]=useState([])
  const [isPressed,setIsPressed]=useState(true)
  const [finalres,setFinalRes]=useState([])
      const disabledDates =[]
        console.log('ospressed',isPressed)
  useEffect(()=>{
    console.log('thetimesye',timesyeh)
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
  let obj ={}
 const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timesyeh?.map((each)=>{
   days.map((day)=>{
    if (each[day]){
obj[day] = each[day];
    }
   })
  })
  console.log('daobjjjjjjj',obj)
  console.log(obj['Friday'])

  const convertedData = days.reduce((result, day) => {
    const hours = obj[day] ? JSON.parse(obj[day]) : [];
    if (hours.length > 0) {
      result.push({
        day,
        time: hours,
      });
    
    }
    return result;
  }, []);
  setUserSchedule(convertedData)
    console.log('its converted',convertedData)
// console.log('ussaaaaaaaaaaaa',theBookedTimes,theTimeUse)
  const flattenedArray1 = theTimeUse.flat()
  const flattenedArray2 = theBookedTimes.flat()


// console.log('flattenedArray1',theTimeUse,flattenedArray2)

const combinedArray = flattenedArray1.concat(flattenedArray2)
// console.log(combinedArray)
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

// console.log('thefinalres',finalres)


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
      {year:"2023-6-07",times:["10:00-11:00"]},
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
setClickedFormatted(yearMonthDay)
  if (date!==undefined) {
    const data = new Date(date)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
 let theDay= days[data.getDay()]
console.log('dayday',userSchedule)
console.log(healthPracSchedule.day)
// const mondaySchedule = healthPracSchedule.find(schedule => schedule.day === 'Monday');
// console.log('schelkaa',mondaySchedule) 
// const mondayTimes = mondaySchedule.time;

const datess = new Date(yearMonthDay)

const dayofDate =days[datess.getUTCDay()]

const schedulea=userSchedule?.find(schedule => schedule.day === dayofDate);
if (schedulea!==undefined){
const theTimes = schedulea.time
// console.log('this is the times',theTimes)
console.log('found itttt',theTimes)
setTheTimeUser([theTimes])
// console.log('34523423',theTimes, bookTimes)
}

//found the schedule for onlick,schedulea

  // console.log('thers a date',date)
  console.log('yearmotng',yearMonthDay)
const schedulea2= booked.find(schedule => schedule.year === yearMonthDay);
//now i have the schedule for the day and the booked dates, now i have to make the booked dates as not available and rest available
// console.log('schelkaaasa',schedulea2)
console.log('eher',schedulea2)
if (schedulea2!==undefined){
// if (schedulea2!==undefined){
const bookTimes = schedulea2.times
console.log('booked',bookTimes)
// console.log(bookTimes)

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
// // setDateMatch(yearMonthDay)
// console.log('found',yearMonthDay)
// if (date!=="" && dateMatch!==""){
  // console.log(dateMatch,'asdasd')
const found = booked.find(item=>Object.keys(item)[0]===yearMonthDay)
setFoundDate(found)
// console.log('founder',found)
// }
if (found !==undefined) {

  const extractedTimes = Object.entries(found).map(([_, timeArray]) => timeArray).flat();
  setFoundDate(extractedTimes)
  // console.log(extractedTimes)
// console.log('timeeee',extractedTimes)
}
// console.log('disdis',disbleDate)
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
const handleColorChange=(index,time)=>{

 setIsPressed(!isPressed)
 setCurrIndex(index)
 setFinalTime(time)
// console.log('changing da color')
}
const handleBooking =()=>{
  console.log('dadate',clickedFormatted)
  console.log('dadate',finalTime)
  if (finalTime===null){
    console.log('Please selected a tome')
  }
  let data ={
    date:clickedFormatted,time:finalTime,userid,healthpracID
  }
    const handlePress = async () =>{
//  try {
//     const id = '1'
//     const response = await axios.get('http://10.0.0.12:3001/fetch');
//     // Handle the response from the server
//     setTimesyeh(response.data)
//     console.log('done')
//     console.log('currentstuff',timesyeh)
//     console.log(response.data);
//   } catch (error) {
//     // Handle any error that occurred during the request
//     console.error(error);
//   }
  // timesyeh.map((each)=>{
  //   console.log(each)
  // })
}
}
//appointments per day you want? min and max maybe

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
  <Text style={{marginLeft:10}} >NOTE* - Dates can only be booked 7 days in advance</Text>
  <Text style={{marginLeft:10}} >Appointments are 1 hour in length</Text>
<View style={{marginLeft:10,marginBottom:10}}>
  <Text style={{fontSize:18,fontWeight:500}} >Choose a Date</Text>
</View>

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
  { finalres.length !== 0 ? finalres.map((time,index) =>(
<>
    <TouchableOpacity  
  
    onPress={()=>handleColorChange(index,time)}

    style={[{margin:10,width:60,padding:10,borderRadius:10}, index===currIndex ? styles.notactive:styles.active]}>
       <Text style={{color:'white',textAlign:'center'}}  >
   
        {time}
       </Text>
     </TouchableOpacity>

     </>
   
  )):(

    <View style={{margin:10}} >
       
      <Text>Sorry, no dates available!</Text></View>
  )}

  </ScrollView>

</View>
  <TouchableOpacity onPress={()=>setCurrIndex(null)}  style={{marginLeft:10}} > 
  <Text >Clear Selection</Text>
   </TouchableOpacity>
<View style={{alignItems:'center',marginTop:50}} >  
<TouchableOpacity style={{backgroundColor:'#1F3B5B',width:200,alignItems:'center',justifyContent:'center',padding:10,borderRadius:10}} >
  <Text style={{color:'white'}} onPress={()=>handleBooking()} >  Place Booking</Text>
</TouchableOpacity>
</View>
    </View>
  )
}

export default Appointment

const styles = StyleSheet.create({

  active:{
    backgroundColor:'#1F3B5B'
  },
  notactive:{
backgroundColor:'gray',
borderColor:'silver'
  },
 })