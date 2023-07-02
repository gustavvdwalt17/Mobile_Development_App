
import { View, Text, TouchableOpacity,Image, ScrollView,StyleSheet,Modal, Button, ImageBackground } from 'react-native'
import React from 'react'

import shortid from 'shortid';
import axios from 'axios'
import { customAlphabet } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';
import CalendarPicker from 'react-native-calendar-picker'
import { useState,useEffect } from 'react'
import { Alert } from 'react-native';
// import { IP_ADDRESS } from 'react-native-dotenv';
import IP_ADDRESS from '../ipadress'
import { pfp } from '../../assets'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const Appointment = ({navigation}) => {
  const healthid = useSelector((state) => state.loginSt.currentHealthPracAppointment)
  const curruserid = useSelector((state) => state.loginSt.currentUserId)
   const currHealthName = useSelector((state) => state.loginSt.healthPracName)
  const currUserName = useSelector((state) => state.loginSt.userName)
  console.log(healthid,'ididid')
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 10); // Customize the characters and length as needed

const [timesyeh,setTimesyeh]=useState(null)
  const [userSchedule,setUserSchedule]=useState(null)
  const [clickedFormatted,setClickedFormatted]=useState(null)
  const [finalTime,setFinalTime]=useState(null)
  const [modal,setModal]=useState(false)
  const [bookedDates,setBookedDates]=useState(null)
  const [disbleDate,setDisableDate] = useState(['Sunday'])
  const [theTimeUse,setTheTimeUser]=useState([])
  const [theBookedTimes,setTheBookedTimes]=useState([])
  const [currIndex,setCurrIndex]=useState(null)
  const [selectedItem,setSelectedItem]=useState([])
  const [newTimes,setNewTimes]=useState([])
  const [isPressed,setIsPressed]=useState(true)
  const [finalres,setFinalRes]=useState([])
      const disabledDates =[]
      const [isConfirmed,setIsConfirmed]=useState(false)
 
  useEffect(()=>{
  const handlePress = async () =>{
 try {

  //fecth data
    
    const response = await axios.get(`http://${IP_ADDRESS}/fetch/${healthid}`);
    // Handle the response from the server
    const { query1Results, query2Results } = response.data;
    setTimesyeh(query1Results)
    setBookedDates(query2Results)
   
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error);
  }

}
handlePress()
  
  },[])
  useEffect(()=>{
    console.log('2 dependencies')
    let obj ={}

 const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  timesyeh?.map((each)=>{
   days.map((day)=>{
    if (each[day]){
obj[day] = each[day];
    }
   })
  })




// const obj2 = {
//   "Sunday": ["12:00-13:00", "14:00-15:00", "16:00-17:00"],
//   "Monday": ["9:00-10:00", "11:00-12:00", "13:00-14:00"],
//   "Tuesday": ["10:00-11:00", "12:00-13:00", "14:00-15:00"],
//   "Wednesday": ["8:00-9:00", "10:00-11:00", "12:00-13:00"],
//   "Thursday": ["11:00-12:00", "13:00-14:00", "15:00-16:00"],
//   "Friday": ["9:00-10:00", "11:00-12:00", "13:00-14:00"],
//   "Saturday": ["10:00-11:00", "12:00-13:00", "14:00-15:00"]
// };


const convertedData = Object.entries(obj).reduce((result, [day, times]) => {
  const hours = times.split(",");
  if (hours.length > 0) {
    result.push({
      day,
      time: hours,
    });
  }
  return result;
}, []);

  setUserSchedule(convertedData)
  },[bookedDates])
  // },[timesyeh,bookedDates])
//Select specific person then get their schedule and the booked dates for him and do this
//make sure all old dates are removed 

        // console.log('ospressed',isPressed)
//   useEffect(()=>{
//     // console.log('thetimesye',timesyeh)
//   // let currdate = '2023/05/15'
//   // let endDate = '2023/05/30'
//   var today = new Date()
//      const endDate = new Date(2023,month,day + 7)

//  while (today <= endDate) {
//    if (today.getDay() == 6 || today.getDay() == 0) {
//       // disabledDates.push(currdate);
//     let newDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
//    disbleDate.push(newDate);
//   }
//    today.setDate(today.getDate() + 1); // Move to the next day

//  }
//     // for (let date = day;date<=maxDate; day.setDate(day.getDate() + 1)){
//     //   console.log('1')
//     // }
// },[])
const getFinalres= ()=>{
  console.log('finaresult')
  const flattenedArray1 = theTimeUse.flat()
  const flattenedArray2 = theBookedTimes.flat()
  //flat 1 is the schedule, flat 2 is the appointmets



const combinedArray = flattenedArray1.concat(flattenedArray2)

// Create a Set to store unique times and an array for the result
const uniqueTimesSet = new Set();
const result = [];
// Step 4: Iterate over the combined array
for (const time of flattenedArray1) {
 
  // Check if the time is already in the Set
  if (!flattenedArray2.includes(time)) {
    // Add the time to the Set and result array
    uniqueTimesSet.add(time);
    result.push(time);
  }
}
let arrayVal = []


result.map((time)=>{
 let disVal = time.split('-')[0]
 let anodaSlit = disVal.split(':')[0]
 arrayVal.push(parseInt(anodaSlit))
})

const sortedArrayVal = arrayVal.sort((a, b) => a - b)

const finalArrayValue = []
for (let i=0; i<sortedArrayVal.length; i++) {

for (const s in  result){

  if (result[s].split(":")[0].toString() === sortedArrayVal[i].toString()){
    console.log('pushing',result[s])
    finalArrayValue.push(result[s])
  }
}
// console.log(finalArrayValue,'foneeee')
}
//LEAVE THIS sORTING MAYBE?????????????????



setFinalRes( finalArrayValue)




return result

}
useEffect(()=>{
//   let obj ={}
//  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   timesyeh?.map((each)=>{
//    days.map((day)=>{
//     if (each[day]){
// obj[day] = each[day];
//     }
//    })
//   })
//   console.log('daobjjjjjjj',obj)
//   // console.log(obj['Friday'])

//   const convertedData = days.reduce((result, day) => {
//     const hours = obj[day] ? JSON.parse(obj[day]) : [];
//     if (hours.length > 0) {
//       result.push({
//         day,
//         time: hours,
//       });
    
//     }
//     return result;
//   }, []);
//   setUserSchedule(convertedData)
    // console.log('its converted',convertedData)


getFinalres()

// console.log('thefinalres',finalres)


},[theBookedTimes])

    const [date,setDate] = useState('')
    const [dateMatch,setDateMatch]=useState('')
    const [foundDate,setFoundDate]  = useState('')
    const minDate = new Date()
    const month = minDate.getMonth()
    const day = minDate.getUTCDate()


//   const healthPracSchedule = [ //healthpracs schedule
//     {day:'Monday',time:["9:00","10:00","12:00","14:00","16:00"]},
//     {day:'Tuesday',time:["8:00","10:00","12:00","14:00","16:00"]},
//     {day:'Wednesday',time:["8:00","10:00","12:00","14:00","16:00"]},
//     {day:'Thursday',time:["8:00","10:00","12:00","14:00","16:00"]},
//     {day:'Friday',time:["8:00","10:00","12:00","14:00","16:00","18:00","19:00"]},
//   ]
// const booked = [ //dates already booked
//       {year:"2023-6-07",times:["10:00-11:00"]},
//       {year:"2023-5-19",times:["9:00","10:00","16:00"]},
//       {year:"2023-5-22",times:["9:00","10:00","16:00"]},
      
//     ]
  
    const maxDate = new Date(2023,month,day + 7)






























    useEffect(()=>{
checkDates()
},[date])

function checkDates(){
  console.log('checking dates')
 
  setTheBookedTimes([])
  setTheTimeUser([])
  setFoundDate('')
  setDateMatch('')

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


const datess = new Date(yearMonthDay)

const dayofDate =days[datess.getUTCDay()]


 const schedulea=userSchedule?.find(schedule => schedule.day === dayofDate);
if (schedulea!==undefined){

const theTimes = schedulea.time



setTheTimeUser([theTimes])

}

//found the schedule for onlick,schedulea


const schedulea2= bookedDates?.filter(schedule => schedule.day === yearMonthDay);
//filters based on booked dates for that day
if (schedulea2!==undefined){

const times = [];

schedulea2.forEach(appointment => {
  const time = appointment.time;
  times.push(time);
});


setTheBookedTimes(times)

}







  //mondaytimes = times for monday
  //year monthday = what click on
//get date which picks on day
//check schedule for that day

//get the day and then for clicked date check what dates is still available

}

const found = bookedDates?.find(item=>Object.keys(item)[0]===yearMonthDay)

setFoundDate(found)

if (found !==undefined) {

  const extractedTimes = Object.entries(found).map(([_, timeArray]) => timeArray).flat();
  setFoundDate(extractedTimes)

}

// Output: "2023/5/18"

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
  setModal(true)
  // console.log('dadate',clickedFormatted)
  // console.log('dadate',finalTime)

//   if (finalTime===null){
//     console.log('Please selected a tome')
//   }
//   let data ={
//     date:clickedFormatted,time:finalTime,userid:1,healthpracID:1
//   }
//     const handlePresser = async () =>{
//  try {
   
//     const response = await axios.post('http://10.0.0.12:3001/appointment',data);
//     // Handle the response from the server

//     console.log(response.data);
//   } catch (error) {
//     // Handle any error that occurred during the request
//     console.error(error.message);
//   }

// }
// handlePresser()
}
//appointments per day you want? min and max maybe
const toggleModal = (state)=>{


if (state==='confirm'){
  if (finalTime === '' || finalTime===undefined || finalTime===null){
    console.log('Please select')
              Alert.alert(
      'Error',
      'Please Select a TimeSlot',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
   
    );
       return
  }

    let data ={
    date:clickedFormatted,time:finalTime,userid:curruserid,healthpracID:healthid,name:currHealthName,patientName:currUserName
  }
    const handlePresser = async () =>{
 try {
   
    const response = await axios.post(`http://${IP_ADDRESS}/appointments/make`,data);
    // Handle the response from the server

  
    // navigation.navigate('dashr')
    setIsConfirmed(true)

  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error.message);
  }

}
handlePresser()


}else{
setModal(false)
}
}

  // useEffect(() => {
  //   // This code will run whenever the isConfirmed state changes
  //   // You can perform any side effects or additional logic here
  //   console.log('isConfirmed:', isConfirmed);
  // }, [isConfirmed]);



  return (
    <ImageBackground 

       source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
>

      <View style={{padding:20,display:'flex',flexDirection:'row',marginTop:30,marginLeft:10,marginRight:10,borderRadius:10,backgroundColor:'#1F3B5B'}}>
        <Image source={pfp} style={{width:50,height:50,marginRight:10}} ></Image>
     
     <View style={{display:'flex',flexDirection:'column'}} >
 <Text style={{color:'white'}} >{currHealthName}</Text>
 <Text style={{color:'white'}}>Chiropractor</Text>
 <Text style={{color:'white',width:250}}>Dr. {currHealthName} is a Chiropracter and is very good at his job</Text>
     </View>
       
      </View>
<View style={{marginTop:20}}>
  <View style={{marginBottom:10,display:'flex',flexDirection:'row',marginLeft:8}} >
     <FontAwesomeIcon name="info-circle" size={25} color="white" />
 <View style={{marginLeft:10}} >

    <Text style={{marginLeft:0,color:'white'}} >Dates can only be booked 7 days in advance.</Text>
  <Text style={{marginLeft:0,color:'white'}} >Appointments are 1 hour in length.</Text> 
 </View>
   
  </View>
 
<View style={{marginLeft:10,color:'white',marginBottom:10}}>
  <Text style={{fontSize:18,color:'white',fontWeight:500}} >Choose a Date</Text>
</View>


<Modal
visible={modal}
 animationType="slide"
  onRequestClose={toggleModal}
      
>

 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

<Text style={{marginBottom:10,color:'white'}}>Please Confirm Booking</Text>  
  <View
  style={{display:'flex',flexDirection:'row'}}
  >

{!isConfirmed ? (
  <>
  <TouchableOpacity style={{ marginLeft: 10, backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 }} onPress={() => toggleModal('confirm')}>
    <Text style={{ color: 'white', textAlign: 'center', color: 'white' }}>Confirm</Text>
  </TouchableOpacity>
    <TouchableOpacity style={{ marginLeft: 10, backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 }} onPress={() => toggleModal('false')}>
    <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
  </TouchableOpacity>
  </>
) : (
  <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Text style={{fontSize:20}} >Thanks for making an Appointment!</Text>
    <TouchableOpacity style={{ display:'flex' , backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 ,marginTop:10}} onPress={() => {

        setIsConfirmed(false)
        setModal(false)
      navigation.dispatch(StackActions.replace('User'));

      // Prevent going back to the previous screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'User' }],
      });
    }}>
    <Text style={{ color: 'white', textAlign: 'center' }}>Go Home</Text>
  </TouchableOpacity>

</View>
)}

      

  </View>

</View>


</Modal>
<View style={{backgroundColor:'white',borderRadius:10}} >
        <CalendarPicker
  onDateChange={day => {
    setDate(day)
  }}
  
//   allowRangeSelection={true}
  minDate={minDate}
  maxDate={maxDate}
   disabledDates={disbleDate}
 headerTextStyle={styles.headerText}
        />
</View>
  
</View>

    {/* <CalendarPicker/> */}

<View style={{display:'flex',flexDirection:'row'}} >
<ScrollView
showsHorizontalScrollIndicator={false}
horizontal={true}
>  
{console.log(finalres,'finale')}
{finalres.length !== 0 ? (
  finalres.map((time, index) => (
    <React.Fragment key={shortid.generate()}>
      <TouchableOpacity
        onPress={() => handleColorChange(index, time)}
        style={[
          { margin: 10, width: 100, padding: 10, borderRadius: 10 },
          index === currIndex ? styles.notactive : styles.active
        ]}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>{time}</Text>
      </TouchableOpacity>
    </React.Fragment>
  ))
) : (
  <View key={shortid.generate()} style={{ margin: 10 }}>
    <Text style={{ color: 'white' }}>Sorry, no dates available!</Text>
  </View>
)}

  {/* { finalres.length !== 0 ? finalres.map((time,index) =>(
<>
    <TouchableOpacity  
key={shortid.generate()}
    onPress={()=>handleColorChange(index,time)}

    style={[{margin:10,width:100,padding:10,borderRadius:10}, index===currIndex ? styles.notactive:styles.active]}>
       <Text style={{color:'white',textAlign:'center'}}  >

        {time}
       </Text>
     </TouchableOpacity>

     </>
   
  )):(

    <View key={shortid.generate()} style={{margin:10}} >
       
      <Text style={{color:'white'}}>Sorry, no dates available!</Text></View>
  )} */}

  </ScrollView>

</View>
  <TouchableOpacity onPress={()=>setCurrIndex(null)}  style={{marginLeft:10}} > 
  <Text style={{color:'white'}} >Clear Selection</Text>
   </TouchableOpacity>
<View style={{alignItems:'center',marginTop:50}} >  
<TouchableOpacity onPress={()=>handleBooking()}  style={{backgroundColor:'#1F3B5B',width:200,alignItems:'center',justifyContent:'center',padding:10,borderRadius:10}} >
  <Text style={{color:'white'}} >  Place Booking</Text>
</TouchableOpacity>
</View>
 </ImageBackground>
  )
}


export default Appointment

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
  active:{
    backgroundColor:'#1F3B5B'
  },
  notactive:{
backgroundColor:'gray',
borderColor:'silver'
  },  headerText: {
    color: 'white', // Set the color of the header text to white
  },

 })
