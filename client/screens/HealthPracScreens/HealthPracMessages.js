import { View, Text, ScrollView,Image, TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import axios from 'axios'
import { trash } from '../../assets'
import { StackActions } from '@react-navigation/native';
import IP_ADDRESS from '../ipadress'
import { useSelector } from 'react-redux';
const  HealthPracMessages = ({navigation}) => {




  const [messages,setMessages] = useState(null)
    const [deleted,setDeleted] = useState(null)
    const healthid = useSelector((state) => state.loginSt.healthId) //change  this  doesnt have to do with login
    const handleMessages = async () =>{
    try {
              console.log('de data')
  //also fetch appoinemtns and then delete old appointments
    const id = '1'
let datea = {
      id:healthid,
      useradd:'yes'
}
    const response = await axios.get(`http://${IP_ADDRESS}/fetchmsg`,{params:datea});
    // Handle the response from the server
    const newData = response.data;
       const newItems = response.data.map((item) => {
  const date = new Date(item.DateCancelled);
  const formattedDate = date.toISOString().split('T')[0];

  return {
    ...item,
    DateCancelled: formattedDate,
  };
});
        setMessages(newItems)
  } catch (error) {

    console.error(error);
  }
    }
useEffect(()=>{
handleMessages()
},[])
useEffect(()=>{
handleMessages()
},[deleted])

const handleMsgDelete = async(id) => {
      try {
    
  //also fetch appoinemtns and then delete old appointments

    const response = await axios.delete(`http://${IP_ADDRESS}/delete/msg/${id}`);
    
    setDeleted(response.data)
    //  const updatedMessages = messages.filter(item=>item.id!==id)
    // setMessages(updatedMessages)
   
    // Handle the response from the server
    // const data = response.data;
    //     console.log('de data',data)
    //     setMessages(response.data)
  } catch (error) {

    console.error(error);
    return
  }
}
  return (
    <ScrollView style={{backgroundColor:'black',height:'100%'}}>
   <View style={{marginTop:35}} >

        <Text style={{color:'white',fontSize:22,fontWeight:500}}>Cancelled Appointments from Patient:</Text>
       
   </View>
       
       <View style={{marginTop:35}} >
          {console.log(messages,'assad')}
        {messages?.map((msg,index)=>{
    
    const {note,Date,userName,DateCancelled,AppointmentDate } = msg
            return (
                <View key={index}>
         <Text style={{color:'white',marginLeft:10,marginBottom:5}} >{DateCancelled}</Text>     
     
     
       <View  style={{display:'flex',backgroundColor:'gray',marginLeft:10,width:300,borderRadius:8,padding:5,marginBottom:10,borderBottomRightRadius:15}} >
            {/* <Text style={{color:'white'}} >{Date}</Text> */}
     
     <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}} >
     <View>
      <Text style={{color:'white'}}>User Name:{userName}</Text>
      <Text style={{color:'white'}}>Appointment Date: {AppointmentDate}</Text>
      
      {/* <Text style={{color:'white'}}>Cancel Date:2023/02/32</Text> */}
</View>
<TouchableOpacity onPress={()=>handleMsgDelete(msg.idMessages)}>
  <Image  source={trash} style={{width:30,height:30,borderRadius:50,marginTop:15}} ></Image>
</TouchableOpacity>
</View>
        </View>

        
            </View>
            )
        })}
 </View>

    </ScrollView>
  )
}

export default  HealthPracMessages