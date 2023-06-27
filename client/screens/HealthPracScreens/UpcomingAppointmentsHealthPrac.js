import { View, Text, Modal,TouchableOpacity,TextInput,Image, Alert,ImageBackground,StyleSheet } from 'react-native'
import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import IP_ADDRESS from '../ipadress'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { trash } from '../../assets'
import { useSelector } from 'react-redux'
const UpcomingAppointmentsHealthPrac = ({navigation}) => {
    const [modal,setModal]=useState(false)
    const [healthName,setHealthName]=useState(null)
    const [healthid,setHealthid]=useState(null)
      const [inputValue, setInputValue] = useState('');
    const [healthPracSchedule,setHealthPracSchedule] = useState(null)
    const [userIdToDelete,setUserIdtoDelete] = useState(null)
    const [appointmentId,setAppointmentId]=useState(null)
      const healthLogged = useSelector((state) => state.loginSt.loggedInhealthPracName) //change  this  doesnt have to do with login
      const healthLoggedId = useSelector((state) => state.loginSt.healthId) //change  this  doesnt have to do with login
  const handleInputChange = (text) => {
    setInputValue(text);
    console.log(inputValue);
  };
    const handlegetAppointments = async () => {
 try {

    const response = await axios.get(`http://${IP_ADDRESS}/appointments/getHealthPrac/${healthLoggedId}`);
   
    console.log('deta',response.data)
    setHealthPracSchedule(response.data)
            // setAppointments(response.data)
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
        handlegetAppointments()
    },[])

    const handleCancelBooking = async ()=>{
 
    }
    const toggleModal = async (state)=>{
         if ((inputValue.length < 10) && (state === 'confirm')) {
          console.log('less')
         Alert.alert(
      'Too Short',
      'Please give a longer reason.',
      [
        {
          text: 'OK',
        
        },
      ],
      { cancelable: true }
   
    );
       return
        }else{
            //delete
        }
        console.log('Toggle modal')
         try {
    const name = await AsyncStorage.getItem('name');
    if (name !== null) {
         console.log('daname',name)
     setHealthName(name)
      // Use the name in your components or perform further operations
    } 
  } catch (error) {
    console.log('Error retrieving name: ', error);
  }
           try {
    const id = await AsyncStorage.getItem('id');
    if (id!== null) {
        console.log('daid',id)
    setHealthid(id)
      // Use the name in your components or perform further operations
    } 
  } catch (error) {
    console.log('Error retrieving name: ', error);
  }

if (state ==='confirm'){
  console.log(healthLoggedId,healthName,healthLogged)
 console.log(userIdToDelete,'deleting')
     try {
  

          let data ={
 userid:userIdToDelete,healthpracID:healthLoggedId,note:inputValue,canceledDate:new Date(),name:healthLogged,id:healthid,useradd:'no',appId:appointmentId,
 dateofAppointment:healthPracSchedule[0].day
  }

    const response = await axios.delete(`http://${IP_ADDRESS}/appointments/delete/${appointmentId}`,{
        data:data
    }); 
   
        navigation.navigate('HealthEntry')
            // setAppointments(response.data)
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
}else{
    setModal(false)
}
    }
  return (
        <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >
    <View style={{marginTop:30,marginLeft:5}}>
<Text style={{fontSize:22,fontWeight:500,color:'white',marginLeft:5}} >Upcoming Appointments for, {healthLogged}</Text>
     {healthPracSchedule?.map((item,index)=>{
       
        const {day,time,patientname,healthpracname,user_id} = item
       {console.log(user_id)}
        return (
            <View key={index} style={{display:'flex',flexDirection:'row',justifyContent:'space-between',backgroundColor:'#CCCCCC',marginTop:10,width:300,padding:10,borderRadius:10,marginLeft:5}}>
                <View>
            <Text style={{fontSize:14,fontWeight:500}} >{healthpracname}</Text>
                <Text>Patient Name: {patientname}</Text>
                <Text>Day: {day}</Text>
                <Text>Time: {time}</Text>         
                </View>
         
                <TouchableOpacity onPress={()=>{
                    setModal(true)
                    setAppointmentId(item.appointment_id)
                        setUserIdtoDelete(user_id)
                  }}
              
                    >
<Image style={{width:30,height:30,marginTop:25,borderRadius:15}} source={trash} />

                    </TouchableOpacity>
           
            </View>
        )
     })}
 <Modal
visible={modal}
 animationType="slide"
  onRequestClose={toggleModal}
      
>

 <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

<Text style={{marginBottom:10}}>Cancel Booking</Text>  
<Text style={{margin:5}}>Please fill in why you want to cancel the Booking to let the Patient know.</Text>  
<TextInput style={{marginBottom:20}} placeholder='cancel reason'   onChangeText={handleInputChange} ></TextInput>
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
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
});
export default UpcomingAppointmentsHealthPrac