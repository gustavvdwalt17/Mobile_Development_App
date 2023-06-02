import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { trash } from '../assets'
import { pfp } from '../assets'
const UpcomingAppointments = () => {
const [appointments,setAppointments] = useState(null)

  const handlePress = async () =>{
 try {
    console.log('its runnan')
    const response = await axios.get('http://10.0.0.7:3001/getuserappointments');
   
            console.log(response.data)
            setAppointments(response.data)
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
useEffect(()=>{
handlePress()
},[])


  return (
    <View>

        <View style={{display:'flex',flexDirection:'row',marginTop:30,marginLeft:10}} >
            <Image style={{resizeMode:'contain',width:100,height:100}} source={pfp} ></Image>
            <Text>Upcoming Appointments</Text>
        </View>
        <View style={{backgroundColor:'white',width:300,borderRadius:10,margin:10}} >
    {appointments?.map((item)=>{
        return (
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{padding:10}}>
                     <Text style={{color:'black'}}>Dr. Martin Van Zyl</Text>
                <Text style={{color:'black'}}>Date: {item.day}</Text>
                <Text style={{color:'black'}}>Time: {item.time}</Text>

            </View>
            <TouchableOpacity style={{backgroundColor:'red',width:50,height:50,borderRadius:8,marginTop:15,marginRight:5}} >
                <Image 
                style={{resizeMode:'contain',width:50,height:50}}
                source={trash}></Image>
            </TouchableOpacity>
</View>
        )
    })}
    </View>
    </View>
  )
}

export default UpcomingAppointments