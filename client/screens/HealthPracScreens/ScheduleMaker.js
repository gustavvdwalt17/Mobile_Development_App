import { View, Text,StyleSheet,Dimensions,TextInput,Image, TouchableOpacity,Button,FlatList, ScrollView,ImageBackground,ImageBackgroundBase,Modal} from 'react-native'
import React,{useState,useEffect} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { background } from '../../assets';
import { background2 } from '../../assets';
import IP_ADDRESS from '../ipadress'
import { useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import { usher } from '../../assets';
import axios from 'axios';
const ScheduleMaker = ({navigation}) => {
  const [isSchedule,isSetSchedule] = useState(false)
  const [modal,setModal]=useState(false)
  const [confirmed,setconfirmed]=useState(false)
    const healthid = useSelector((state) => state.loginSt.healthId) //change  this  doesnt have to do with login
  console.log(healthid,'here is the correctr id')

    // const schedule = useSelector(state => state.counter.scheduleState);
  // const {schedule} = useSelector((state) => state.loginSt)
    const schedule = useSelector((state) => state.loginSt.schedule)
  useEffect(()=>{
console.log('sched',schedule.length)
if (schedule !==undefined || schedule!==null ||schedule.length === 0 || schedule.length === undefined ) {
 console.log('true')
  isSetSchedule(false)
}else{
  isSetSchedule(true)
}

  },[schedule])
  // const handlePress = async()=>{
  //   try{

  //   }catch(err){

  //   }
  // }
  // useEffect(()=>{
  //   handlePress()
  // },[])

  const [selectedSlots, setSelectedSlots] = useState(schedule ? schedule : {});
console.log(selectedSlots,'slotss')
  //    const arr = 
//   {
//     Wednesday:'[10:00-11:00]'
//   }
//  setSelectedSlots({...selectedSlots,arr})
const timeSlots = {
    slot1: '8:00-9:00',
    
  slot2: '10:00-11:00',
  slot3: '11:00-12:00',
  slot4: '12:00-13:00',
  // Add more slots as needed
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Function to handle slot selection
const handleSlotSelection = (day, slot) => {
  const isSlotSelected = selectedSlots[day] && selectedSlots[day].includes(slot);
  let updatedSlots;

  if (isSlotSelected) {
    // Slot is already selected, remove it from the array or string
    const existingSlots = Array.isArray(selectedSlots[day])
      ? selectedSlots[day]
      : selectedSlots[day].split(','); // Convert string to an array
    updatedSlots = {
      ...selectedSlots,
      [day]: existingSlots.filter((selectedSlot) => selectedSlot !== slot),
    };
  } else {
    // Slot is not selected, add it to the array or string
    const existingSlots = Array.isArray(selectedSlots[day])
      ? selectedSlots[day]
      : selectedSlots[day]?.split(',') || []; // Convert string to an array, or create an empty array
    updatedSlots = {
      ...selectedSlots,
      [day]: [...existingSlots, slot],
    };
  }

  setSelectedSlots(updatedSlots);
};

    const handleTimeSlots = async ()=>{
    if (isSchedule){
          try {
            console.log('updating')
            let isTrue = true
            console.log(selectedSlots)
    const response = await axios.post(`http://${IP_ADDRESS}/user`,{selectedSlots,isTrue, healthid});
    //     // setHealthPrac(response.data)
    //   let theData = response.data
    // console.log('returned daya',theData);
            // navigation.navigate('HealthEntry')
    // console.log('healthPrats',healthPrac)
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error.message);
    // if (error.response) {
    //   console.log(error.response.data);
    //   // console.log(error.response.status);
    //   // console.log(error.response.headers);
    // }
  }
    }else{
       try {
        let isTrue = false
    console.log(healthid,'heal')
    const response = await axios.post(`http://${IP_ADDRESS}/user`,{selectedSlots,isTrue, healthid});
        // setHealthPrac(response.data)
      let theData = response.data
    // console.log('returned daya',theData);

    // console.log('healthPrats',healthPrac)
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error.message);
    // if (error.response) {
    //   console.log(error.response.data);
    //   // console.log(error.response.status);
    //   // console.log(error.response.headers);
    // }
  }
    }

    }


    const toggleModal = (state)=>{


if (state==='confirm'){
  
handleTimeSlots()
setconfirmed(true)
}
else{
setModal(false)
}
}
    return (
// w style={{marginLeft:10,marginTop:30}}
     <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >
      {/* <ImageBackground
      source={background2}
      style={{width:'100%',resizeMode:'contain',height:'100%'}}
      > */}
        <View
        // style={{marginTop:80}}
        >

          <Modal
          visible={modal}
          animationType="slide"
    onRequestClose={toggleModal}
          >

<View style={{display:'flex',flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
  {/* handleTimeSlots() */}



     {!confirmed ? (
 
 <>
     <Text>Confirm Update</Text>
 <View style={{display:'flex',flexDirection:'row',marginTop:5}} >


  <TouchableOpacity  style={{ marginLeft: 10, backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 }} onPress={() => toggleModal('confirm')}>
    <Text style={{ color: 'white', textAlign: 'center', color: 'white' }}>Confirm</Text>
  </TouchableOpacity>
    <TouchableOpacity style={{ marginLeft: 10, backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 }} onPress={() => toggleModal('false')}>
    <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
  </TouchableOpacity>
  </View>
  </>
) : (
  <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
  <Text style={{fontSize:20}} >Schedule Updated</Text>
    <TouchableOpacity style={{ display:'flex' , backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 ,marginTop:10}} onPress={() => {

        setconfirmed(false)
        setModal(false)
      navigation.dispatch(StackActions.replace('HealthEntry'));

      // Prevent going back to the previous screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'HealthEntry' }],
      });
    }}>
    <Text style={{ color: 'white', textAlign: 'center' }}>Go Home</Text>
  </TouchableOpacity>

</View>
  //    {/* <View style={{display:'flex',flexDirection:'row'}} >
  // <TouchableOpacity style={{ marginLeft: 10, backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 }} onPress={() => toggleModal('confirm')}>
  //   <Text style={{ color: 'white', textAlign: 'center', color: 'white' }}>Confirm</Text>
  // </TouchableOpacity>
  //   <TouchableOpacity style={{ marginLeft: 10, backgroundColor: 'black', padding: 10, borderRadius: 5, width: 100 }} onPress={() => toggleModal('false')}>
  //   <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
  // </TouchableOpacity>
  //    </View> */}
)}
</View>
 
          </Modal>
  {/* <View style={{display:'flex',flexDirection:'row'}} >
 <Image source={usher}
   style={{resizeMode:'contain',width:100,height:50}}
   />  
    <Text style={{fontSize:24,fontWeight:500}} >Hello Jan, let’s start by getting some more information about you.</Text>
  </View> */}
  
      {/* <Text>NOTE - Schedules can be changed later on!</Text> */}
      <Text style={{marginTop:35,marginLeft:8,fontSize:22,fontWeight:500,marginBottom:10,color:'white'}} >Select time slots:</Text>

      {/* Dynamically generate time slot components for each day */}
      <ScrollView
  style={{marginBottom:10}}
      >
      {daysOfWeek.map((day) => (
        <View 
        style={{marginBottom:15}}
        key={day}>
          <Text style={{marginBottom:5,marginLeft:8,fontWeight:500,color:'white'}} >{day}</Text>
          <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          >
          {Object.keys(timeSlots).map((slotKey) => (
            <TouchableOpacity

              key={slotKey}
              onPress={() => handleSlotSelection(day, timeSlots[slotKey])}
              style={{
                backgroundColor: selectedSlots[day]?.includes(timeSlots[slotKey]) ? 'gray' : '#1F3B5B',
                marginLeft: 5,
                padding:8,borderRadius:10
              }}
            >
              <Text style={{color:'white'}} >{timeSlots[slotKey]}</Text>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>
      ))}
</ScrollView>


      {/* <Text>Selected Slots:</Text>

      {Object.keys(selectedSlots).map((day) => (
        <Text key={day}>
          {day}: {selectedSlots[day].join(', ')}
        </Text>
      ))} */}

<View style={{alignItems:'center'}} >
<TouchableOpacity style={{backgroundColor:'#1F3B5B',width:150,padding:10,borderRadius:8,alignItems:'center'}} onPress={()=>setModal(true)} >
  <Text style={{color:'white'}}  > {isSchedule ? <Text>Update</Text>: <Text>Continue</Text>} </Text>
</TouchableOpacity>
</View>
</View>
{/* </ImageBackground> */}
        </ImageBackground >


//     <ScrollView
//     showsVerticalScrollIndicator={false}
//     >
//    <View style={{marginTop:50}} >

//     <Text>Hello (Placeholder), let’s start by getting some more information about you.</Text>
//    </View>
// <View style={[styles.container,{marginTop:20}]}>
// <View style={styles.line}/>
// </View>

// <View>
//     <Text>What days do you work?</Text>

//     <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
//         {days.map((day)=>{
//             return (
//                 <TouchableOpacity style={{margin:5,padding:10,backgroundColor:'#1F3B5B',borderRadius:10}} >
//                     <Text style={{color:'white'}} >{day}</Text>
//                     <View>
//   <Text>Start Time</Text>
//       <TextInput value={selectedTime} placeholder="Select Time" />
//       <ScrollView
//       horizontal={true}
//         showsHorizontalScrollIndicator={false}
// >
//         {Object.entries(timeOptions).map(([key, value]) => (
//           // {value === activeTimes && ()} 
   
//           <TouchableOpacity
//             key={key}
//             onPress={() => handleTimeChange(value)}
//             style={{
//               padding: 10,
//               marginHorizontal: 5,
//               backgroundColor: selectedTime === value ? 'lightblue' : 'transparent',
//             }}
//           >
//             <Text style={{ fontWeight: selectedTime === value ? 'bold' : 'normal' }}>{value}</Text>
//           </TouchableOpacity>
//         ))}
        
//       </ScrollView>
//     </View>
//     <View>
//   <Text>End Time</Text>
//       <TextInput value={selectedTime2} placeholder="Select Time" />
//       <ScrollView 
//          horizontal={true}
//         showsHorizontalScrollIndicator={false}
//       >
//         {Object.entries(timeOptions).map(([key, value]) => (
//           <TouchableOpacity
//             key={key}
//             onPress={() => handleTimeChange2(value)}
//             style={{
//               padding: 10,
//               marginHorizontal: 5,
//               backgroundColor: selectedTime2 === value ? 'lightblue' : 'transparent',
//             }}
//           >
//             <Text style={{ fontWeight: selectedTime2 === value ? 'bold' : 'normal' }}>{value}</Text>
//           </TouchableOpacity>
//         ))}
        
//       </ScrollView>
//     </View>
//                 </TouchableOpacity>
//             )
//         })}
//     </View>
// </View>
// <View style={[styles.container,{marginTop:20}]}>
// <View style={styles.line}/>
// </View>
// {/* <View>
//   <Text>Start Time</Text>
//       <TextInput value={selectedTime} placeholder="Select Time" />
//       <ScrollView
//       horizontal={true}
//         showsHorizontalScrollIndicator={false}
// >
//         {Object.entries(timeOptions).map(([key, value]) => (
//           <TouchableOpacity
//             key={key}
//             onPress={() => handleTimeChange(value)}
//             style={{
//               padding: 10,
//               marginHorizontal: 5,
//               backgroundColor: selectedTime === value ? 'lightblue' : 'transparent',
//             }}
//           >
//             <Text style={{ fontWeight: selectedTime === value ? 'bold' : 'normal' }}>{value}</Text>
//           </TouchableOpacity>
//         ))}
        
//       </ScrollView>
//     </View>
//     <View>
//   <Text>End Time</Text>
//       <TextInput value={selectedTime2} placeholder="Select Time" />
//       <ScrollView 
//          horizontal={true}
//         showsHorizontalScrollIndicator={false}
//       >
//         {Object.entries(timeOptions).map(([key, value]) => (
//           <TouchableOpacity
//             key={key}
//             onPress={() => handleTimeChange2(value)}
//             style={{
//               padding: 10,
//               marginHorizontal: 5,
//               backgroundColor: selectedTime2 === value ? 'lightblue' : 'transparent',
//             }}
//           >
//             <Text style={{ fontWeight: selectedTime2 === value ? 'bold' : 'normal' }}>{value}</Text>
//           </TouchableOpacity>
//         ))}
        
//       </ScrollView>
//     </View> */}
//     </ScrollView>
  )
}

export default ScheduleMaker
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dayContainer: {
    marginBottom: 16,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  slotButton: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedSlotItem: {
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedSlotText: {
    color: 'white',
  },

  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },

});
// const styles = StyleSheet.create({
//       container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   line: {
//     height: 1,
//     width: Dimensions.get('window').width * 0.9,
//     backgroundColor: 'black',

//   },
// });