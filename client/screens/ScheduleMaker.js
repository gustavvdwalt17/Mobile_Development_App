import { View, Text,StyleSheet,Dimensions,TextInput,Image, TouchableOpacity,Button,FlatList, ScrollView,ImageBackground} from 'react-native'
import React,{useState} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { background } from '../assets';
import { background2 } from '../assets';
import { usher } from '../assets';
import axios from 'axios';
const ScheduleMaker = () => {
  const [selectedSlots, setSelectedSlots] = useState({});
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
      updatedSlots = {
        ...selectedSlots,
        [day]: selectedSlots[day].filter((selectedSlot) => selectedSlot !== slot),
      };
    } else {
      updatedSlots = {
        ...selectedSlots,
    
        [day]: selectedSlots[day] ? [...selectedSlots[day], slot] : [slot],
      };
    }

    setSelectedSlots(updatedSlots);
  };



    const handleTimeSlots = async ()=>{

 try {
  
    const response = await axios.post('http://10.0.0.12:3001/user',selectedSlots);
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
    return (
// w style={{marginLeft:10,marginTop:30}}
<View style={{backgroundColor:'white',height:'100%'}} >
      {/* <ImageBackground
      source={background2}
      style={{width:'100%',resizeMode:'contain',height:'100%'}}
      > */}
        <View
        // style={{marginTop:80}}
        >
  <View style={{display:'flex',flexDirection:'row'}} >
 <Image source={usher}
   style={{resizeMode:'contain',width:100,height:50}}
   />  
    <Text style={{fontSize:24,fontWeight:500}} >Hello Jan, let’s start by getting some more information about you.</Text>
  </View>
  
      <Text>NOTE - Schedules can be changed later on!</Text>
      <Text>Select time slots:</Text>

      {/* Dynamically generate time slot components for each day */}
      <ScrollView
  style={{marginBottom:10}}
      >
      {daysOfWeek.map((day) => (
        <View 
        style={{marginBottom:15}}
        key={day}>
          <Text style={{marginBottom:5,marginLeft:8,fontWeight:500}} >{day}</Text>
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
<TouchableOpacity style={{backgroundColor:'#1F3B5B',width:150,padding:10,borderRadius:8,alignItems:'center'}} onPress={()=>handleTimeSlots()} >
  <Text style={{color:'white'}}  >Continue</Text>
</TouchableOpacity>
</View>
</View>
{/* </ImageBackground> */}
    </View>

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