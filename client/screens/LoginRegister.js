import { View, Text,Image,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { telemedicine } from '../assets'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { StackActions } from '@react-navigation/native';
import loginState, { changeLoginState, changeRegiserState, currHealthIdApp, curruserId, registerState, theHealthNamelogged, theUserName } from '../slices/allState'
import IP_ADDRESS from './ipadress'
import Icon from 'react-native-vector-icons/Ionicons';
const LoginRegister = ({navigation}) => {

 const curruserid = useSelector((state) => state.loginSt.currentUserId)
const [active,setActive]=useState('user')
const [loginValues,setLoginValues]=useState({email:'',password:''})
  const healthid = useSelector((state) => state.loginSt.currentHealthPracAppointment)
  const [showPasswords,setShowPassword]=useState(false)
  // const {login} = useSelector((state) => state.loginSt)
const dispatch = useDispatch()

useEffect(()=>{
console.log(loginValues)
},[loginValues])
const handlePress = async () =>{

  if (active ==='user'){
 try {
  const data = {
    loginVals:loginValues,
    who:active
  }
    console.log('lesgooooooooooooo')
    const response = await axios.post(`http://${IP_ADDRESS}/verify/login`,   data);
    // Handle the response from the server

  console.log('success',response.data.theId)
  console.log('success',response.data.name)

    try {
    await AsyncStorage.setItem('user_id',response.data.theId.toString());
    console.log('Data stored successfully');
  } catch (error) {
    console.log('Error storing data: ', error);
  }


    dispatch(theUserName(response.data.name))


     navigation.navigate('User')


  } catch (error) {
    console.log('Error:', error); 
    // Handle any error that occurred during the request
if (error.response && error.response.data && error.response.data.error) {
    alert(error.response.data.error);
  } else {
    alert('An error occurred');
    console.log(error.response.data.error);
  }
  }
  }else{
    //healthprac login
 try {
  const data = {
    loginVals:loginValues,
    who:active
  }
   
    const response = await axios.post(`http://${IP_ADDRESS}/verify/login`,   data);
    // Handle the response from the server

  console.log('success',response.data.theId)
  dispatch(curruserId('1'))
    try {
    await AsyncStorage.setItem('healthId',response.data.theId.toString());
    console.log('Data stored successfully');
  } catch (error) {
    console.log('Error storing data: ', error);
  }

  dispatch(theHealthNamelogged(response.data.name))

     navigation.navigate('HealthEntry')


  } catch (error) {
    console.log('Error:', error); 
    // Handle any error that occurred during the request
if (error.response && error.response.data && error.response.data.error) {
    alert(error.response.data.error);
  } else {
    alert('An error occurred');
    console.log(error.response.data.error);
  }
  }

    //  navigation.navigate('HealthEntry')
    // console.log('healthyyy')
  }

// navigation.navigate('User')
}

const logoutUser = async()=>{
  console.log(curruserid,'as')
    if (curruserid || healthid) {
      // Replace the current screen with the Login screen
     
     
      try{
 console.log('clearing',curruserid)
        await AsyncStorage.clear()
  dispatch(curruserId(null))
      dispatch(currHealthIdApp(null))
  } catch (error) {
    console.log('Error clearing AsyncStorage: ', error);

  }
      navigation.dispatch(StackActions.replace('Login'));

      // Prevent going back to the previous screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
}
  return (
    <View style={{display:'flex',alignItems:'center', backgroundColor:'#D8EAEF',height:'100%',position:'relative'}}>
    <Image source={telemedicine} style={{marginTop:10,resizeMode:'contain',width:350,height:300,borderRadius:10}} />
  


{/* <Text style={{fontWeight:800,fontSize:30,margin:10}} >{login ? <Text>Login</Text> :  <Text>Register</Text>   }</Text> */}

{curruserid ===null  && healthid ===null ?
<>

<Text style={{fontWeight:800,fontSize:30,margin:10}} >Login</Text>




 <View  >
  <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginBottom:20}}  >
 
 
 <TouchableOpacity style={{marginRight:10}} onPress={()=>{setActive('user')}} >
 <Text style={[active === 'user' ? styles.blue : styles.gray]}>User</Text>
 </TouchableOpacity>
 <TouchableOpacity style={{marginLeft:10}} onPress={()=>{setActive('health')}}   >
 <Text style={[active === 'user' ? styles.gray : styles.blue]}>Health Practitioner</Text>
 </TouchableOpacity>
 
  </View>


 <View >
  <View>

  <TextInput onChangeText={(val)=>setLoginValues({...loginValues,['email']:val})}  style={styles.inputText}  ></TextInput>

  <Text  style={{position:'absolute',left:30,top:-3}} >Email</Text>
 <View style={{ position: 'relative' }} >
 <TextInput secureTextEntry={showPasswords}   onChangeText={(val)=>setLoginValues({...loginValues,['password']:val})}    style={styles.inputText}  ></TextInput>
 </View>
 
    
    <TouchableOpacity style={{position:'absolute',right:0,bottom:32,right:25}}  onPress={()=>setShowPassword(!showPasswords)} >
    <Icon name={showPasswords ? 'eye-off-outline' : 'eye-outline'} size={20} />
    </TouchableOpacity>

    <Text style={{position:'absolute',bottom:73,left:30}} >Password</Text>
  </View>
  


</View>
<View style={{alignItems:'center'}} >
  <View style={{backgroundColor:'#26389E',width:200,borderRadius:20,margin:10}} >
  <TouchableOpacity onPress={()=>handlePress()}> 
    <Text style={{color:'white',textAlign:'center',padding:10}}>
  Log in
  </Text> 
  </TouchableOpacity>
  
   {/* <TouchableOpacity>{login  ? <Text style={{color:'white',textAlign:'center',padding:10}} onPress={()=>navigation.navigate('User')}>Login</Text>  : <Text style={{color:'white',textAlign:'center',padding:10}}>Register</Text> }</TouchableOpacity> */}
  </View>
</View>
<View style={{display:'flex',flexDirection:'row',justifyContent:'center'}} >
  {/* <Text  style={{color:'#a6a6a6' }} >{login ? <Text>Don't have an Account?</Text> : <Text>Already have an Account?</Text>   }</Text> */}

  <TouchableOpacity onPress={()=>navigation.navigate('Register')}  >
    <Text style={{marginLeft:5}}>Don't have an Account? Register</Text>

  </TouchableOpacity>


</View>

  

 </View>

</>

: (
<>




  <TouchableOpacity style={{position:'absolute',bottom:5,right:10}} onPress={()=>logoutUser()}  >
    <View style={{display:'flex',flexDirection:'row'}} >
<Text style={{color:'red',margin:5}} >Logout</Text>
 <Text  >

 <Ionicons name="exit-outline" size={30} color="red" />
 
 
 
 </Text> 
    </View>


  </TouchableOpacity>
</>
 )}
    </View>
  )
}

export default LoginRegister

const styles = StyleSheet.create({

 inputText:{
  backgroundColor:'white',
  color:'black',
  margin:20,
  width:300,
  borderColor:'silver',
  borderRadius:10,
  height:50,
  position:'relative'
 },
 blue:{
  borderBottomColor:'#26389E',
  fontSize:20,

  borderBottomWidth:2,
  marginLeft:15,
 },
 gray:{
    borderBottomColor:'gray',
    borderBottomWidth:2,
    fontSize:20,
      marginLeft:15,

 }
})