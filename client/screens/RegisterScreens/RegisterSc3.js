import { View, Text, StyleSheet,TextInput,TouchableOpacity,Button } from 'react-native'
import React,{useState,useEffect} from 'react'
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import IP_ADDRESS from '../ipadress';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';
const RegisterSc3 = ({navigation}) => {
    const {isUser} = useSelector((state)=> state.loginSt)
      const registerData = useSelector((state) => state.loginSt.registerData)

        const [formData,setFormData] = useState(null)

        const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (date) {
      // setSelectedDate(date);
      handleInputChange('dob',null,date)
    }
    setShowDatePicker(false);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

   useEffect(()=>{
  setFormData(registerData)
   },[registerData])
    
   
   
   
   
   const handlePress = async() => {


      if  (formData.name ===null ||formData.name ==="" || formData.surname ===null || formData.surname ==="") {
        handleAlerts('Please enter all fields')
        return
      }
//   const userDob = formData.dob
// const userDobTimestamp = userDob.getTime();
//   // Calculate current date
//   const currentDate = new Date();

//   // Subtract 18 years from current date
//   const minAllowedDob = new Date();
//   const minAllowedDobTimestamp = minAllowedDob.getTime();

//   minAllowedDob.setFullYear(currentDate.getFullYear() - 18);
// console.log(userDob <= minAllowedDob)
// console.log(userDob , minAllowedDob)
//   // Compare user's dob with minimum allowed dob
//  if (userDobTimestamp <=  minAllowedDobTimestamp ){
//   handleAlerts('Must be at least 18 years old')
//   return
//  }

 try {
   
    const response = await axios.post(`http://${IP_ADDRESS}/verify/register`,formData);
    // Handle the response from the server
    console.log(response.data.userId,'dataaaaaaaaaaaaaaaaa')


//set stuff in locallStorage

    navigation.navigate('Login')
  
  } catch (error) {
    // Handle any error that occurred during the request
  if (error.response && error.response.data && error.response.data.error) {
    alert(error.response.data.error);
  } else {
    alert('An error occurred');
  }
  }

  // navigation.navigate('User')
     }
const handleAlerts = (msg) => {
                      Alert.alert(
      'Error',
      msg,
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
   
}
   const handleInputChange = (fieldName, value,date = null) => {

    if (date !==null){

     setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: date.toLocaleDateString()
    }));
    console.log('asdasdasd',formData)
    return
      
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value
    }));
    console.log('asdasdasd',formData)
  };

  return (
    <View style={{backgroundColor:'#D8EAEF',height:'100%'}} >
    {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:50}} >
        <View style={styles.blue}  ><Text style={{marginRight:20,fontSize:22}}>User</Text></View>
        <View style={styles.gray}><Text style={{fontSize:22}}>HealthPrac</Text></View>
    </View> */}



    <View style={{margin:20,marginTop:40}} >
        <Text style={{fontSize:18}} >{isUser ? <Text>Step 3 of 3</Text> : <Text>Step 3 of 4</Text>}</Text>
    </View>

    <View style={{margin:20}} >
        <Text style={{fontSize:30,fontWeight:800}} >Personal Info</Text>
    </View>
    <View style={{margin:20,marginTop:5}}>
        <Text>All your information will be securely stored. We will not share your information with people outside our company.</Text>
    </View>

    <View>
        <Text style={{color:'silver',margin:10,marginTop:2}} > Name</Text>
    <TextInput onChangeText={(value)=> handleInputChange('name',value)} style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />
   
        <Text style={{color:'silver',margin:10,marginTop:2}} >  Surname</Text>
    <TextInput onChangeText={(value)=> handleInputChange('surname',value)}  style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />
   
        {/* <Text style={{color:'silver',margin:10,marginTop:2}} > DOB</Text>
   
          <TouchableOpacity style={{marginLeft:10,marginTop:5}} onPress={showDatePickerModal}>
        <Ionicons name="calendar" size={34} color="black" />
      </TouchableOpacity> */}
  {/* {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
       <Text style={{marginLeft:10,marginTop:5}}>Selected Date: {selectedDate.toLocaleDateString()}</Text> */}
{/* 
 <CalendarPicker
  />
        */}

   
   
    </View>

<View style={{display:'flex',alignItems:'center',marginTop:50}} >
    <TouchableOpacity  onPress={()=>handlePress()} style={{backgroundColor:'#375169',width:150,height:50,borderRadius:20}} > 
        <Text style={{marginTop:15,color:'white',textAlign:'center'}}  >{isUser ? <Text>Register</Text>: <Text>Next</Text>}</Text>
    </TouchableOpacity>
</View>

<View style={{alignItems:'center',marginTop:20}} >
    
    {/* <Text onPress={()=>navigation.navigate('Login')} >Already have an Account? Log in</Text> */}
</View>

    </View>
  )
}

export default RegisterSc3