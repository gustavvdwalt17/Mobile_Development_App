import { View, Text,Image, TouchableOpacity,StyleSheet,ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { handleSchedule } from '../../slices/allState'
import { useDispatch } from 'react-redux'
import { edit } from '../../assets'
import IP_ADDRESS from '../ipadress'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const ViewSchedule = ({navigation}) => {
  const dispatch = useDispatch()  
  const [schedule,setSchedule] = useState(null)
    const [schedule2,setSchedule2] = useState(null)

    let obj = {}
    const handlePress= async ()=>{
        try{
    const response = await axios.get(`http://${IP_ADDRESS}/fetchSchedule`);
            setSchedule(response.data)
            console.log('data',response.data)
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        handlePress()
    },[])
useEffect(()=>{
    modelData()
},[schedule])

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const modelData = ()=>{

   schedule?.map((item)=>{
    days.map((day)=>{
        item[day] !== null && (
            obj[day] = item[day]
        )
    })
   })
   setSchedule2(obj)
   dispatch(handleSchedule(obj))
  }



    return (
     <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >
        <Text style={{marginTop:35,marginLeft:10,fontSize:22,fontWeight:500,color:'white'}} >Your Schedule</Text>


    
{schedule?.map((item, index) => {
  return (
    <View key={index} style={{marginTop:30}}>
      {days.map((day, index) => (
        item[day] !== null && (
          <View style={{marginLeft:5,backgroundColor:'#1F3B5B',padding:20,width:300,borderRadius:10,position:'relative',marginBottom:10}} key={index}>
            <Text style={{color:'white',fontSize:18}}>{day}: {item[day]}</Text>
    
          </View>
        )
      ))}
      

    </View>
    
  );

})}
      <TouchableOpacity style={{color:'white',marginLeft:10}} onPress={()=>navigation.navigate('Scheduler')} >

<FontAwesomeIcon name="edit" size={30} color="white" />
      </TouchableOpacity>
    </ImageBackground>


  )
}

export default ViewSchedule

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
});