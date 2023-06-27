import { View, Text, Image, TouchableOpacity,Modal,ImageBackground,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { trash } from '../../assets'
import IP_ADDRESS from '../ipadress'
import { pfp } from '../../assets'
import { useSelector } from 'react-redux'

const UpcomingAppointments = ({navigation}) => {
    const curruserid = useSelector((state) => state.loginSt.currentUserId)
    const healthid = useSelector((state) => state.loginSt.currentHealthPracAppointment)
const [appointments,setAppointments] = useState(null)
const [modal,setModal] = useState(false)
const [appointmentId,setAppointmentId] = useState(null)
const [healthPracId,sethealthPracId] = useState(null)
const [deletedappointments,setDeletedAppointments] = useState(null)
const [dateOfApp,setDateOfApp] = useState(null)
   const currUserName = useSelector((state) => state.loginSt.userName)
  const toggleModal = async (state) =>{
   if (state === 'confirm'){
     try {
          let data ={ //FIX THIS CAUSE CURRENT USERID MAY NOT EXISTS
 userid:curruserid,healthpracID:healthPracId ,canceledDate:new Date(),useradd:'yes',appId:appointmentId,name:currUserName,dop:dateOfApp
//  dateofAppointment:healthPracSchedule[0].day
  }

    const response = await axios.delete(`http://${IP_ADDRESS}/appointments/delete/${appointmentId}`,{data:data});
    console.log(response.data,'returned')
       setDeletedAppointments(response.data)
      setModal(false)
      
       // setAppointments(response.data)
// navigation.navigate('User')
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
    setModal(false)
   }
  }
  const handlePress = async () =>{

 try {
    
    const response = await axios.get(`http://${IP_ADDRESS}/appointments/getUser/${curruserid}`);
   
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
useEffect(()=>{
handlePress()
},[deletedappointments])

  return (
       <ImageBackground 

       source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
>

       <Modal
visible={modal}
 animationType="slide"
  onRequestClose={toggleModal}
      
>

 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

<Text style={{marginBottom:10}}>Cancel Booking</Text>  

  <View
  style={{display:'flex',flexDirection:'row'}}
  >
<TouchableOpacity style={{marginLeft:10,backgroundColor:'black',padding:10,borderRadius:5,width:100}} onPress={()=>toggleModal('confirm')}>
<Text style={{color:'white',textAlign:'center'}}>Confirm</Text>
</TouchableOpacity>
 

  <TouchableOpacity style={{marginLeft:10,backgroundColor:'black',padding:10,borderRadius:5,width:100}} onPress={()=>toggleModal('cancel')} >
  <Text style={{color:'white',textAlign:'center'}} >Cancel</Text>
</TouchableOpacity>
      

  </View>

</View>


</Modal>

        <View style={{display:'flex',flexDirection:'row',marginTop:30,marginLeft:10}} >
            <Image style={{resizeMode:'contain',width:60,height:60,borderRadius:30}} source={pfp} ></Image>
            <Text style={{color:'white',fontSize:18,marginLeft:5,width:300}} >Upcoming Appointments for {currUserName}.</Text>
        </View>
        <View style={{width:330,borderRadius:10,margin:10}} >
          {console.log('Appointments',appointments)}
    {appointments?.map((item,index)=>{
        return (
            <View key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:10,backgroundColor:'white',borderRadius:10}}>
            <View style={{padding:10}}>
                     <Text style={{color:'black'}}>HealthPractitioner: {item.healthpracname}</Text>
                <Text style={{color:'black'}}>Date: {item.day}</Text>
                <Text style={{color:'black'}}>Time: {item.time}</Text>

            </View>
            <TouchableOpacity style={{width:50,height:50,borderRadius:8,marginTop:15,marginRight:5}} onPress={()=>{
              
              setModal(true)
                sethealthPracId(item.HealthPracID) 
            setAppointmentId(item.appointment_id)
            setDateOfApp(item.day)
            }} >
                <Image 
                style={{resizeMode:'contain',width:50,height:50,borderRadius:50}}
                source={trash}></Image>
            </TouchableOpacity>
</View>
        )
    })}
    
    </View>

</ImageBackground>
  )
}

export default UpcomingAppointments
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },


 })