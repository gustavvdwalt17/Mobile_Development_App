import { View, Text,Image,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { telemedicine } from '../assets'
import { useDispatch, useSelector } from 'react-redux'
import loginState, { changeLoginState, changeRegiserState, registerState } from '../slices/loginState'
const LoginRegister = () => {
//
  const {login} = useSelector((state) => state.loginSt)
const dispatch = useDispatch()
  return (
    <View style={{display:'flex',alignItems:'center', backgroundColor:'#EDEEFFFF',height:'100%'}}>
    <Image source={telemedicine} style={{marginTop:10,resizeMode:'contain',width:350,height:300,borderRadius:10}} />
  
  <View>

<Text style={{fontWeight:800,fontSize:30,margin:10}} >{login ? <Text>Login</Text> :  <Text>Register</Text>   }</Text>

  </View>
  <View>

  <TextInput style={styles.inputText}  ></TextInput>

  <Text style={{position:'absolute',left:30,top:-3}} >Email</Text>
  <TextInput style={styles.inputText}  ></TextInput>
    <Text style={{position:'absolute',bottom:73,left:30}} >Password</Text>
  </View>
  

{!login && (
<View>
    <TextInput style={styles.inputText}  />

     <Text style={{position:'absolute',left:30,top:-3}}  >Confirm Password</Text>
</View>
)}

  <View style={{backgroundColor:'#26389E',width:200,borderRadius:10,margin:10}} >
   <TouchableOpacity>{login  ? <Text style={{color:'white',textAlign:'center',padding:10}}>Login</Text>  : <Text style={{color:'white',textAlign:'center',padding:10}}>Register</Text> }</TouchableOpacity>
  </View>

<View style={{display:'flex',flexDirection:'row'}} >
  <Text  style={{color:'#a6a6a6' }} >{login ? <Text>Don't have an Account?</Text> : <Text>Already have an Account?</Text>   }</Text>

  <TouchableOpacity>
  {login ?   <Text style={{marginLeft:5,color:'blue'}} onPress={()=>dispatch(changeRegiserState())} >Create an Account</Text> :  <Text onPress={()=>dispatch(changeLoginState())}  style={{marginLeft:5,color:'blue'}}>Login into Account</Text>  }

  </TouchableOpacity>

</View>

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
 }
})