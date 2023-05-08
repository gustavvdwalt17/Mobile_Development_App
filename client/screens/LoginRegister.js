import { View, Text,Image,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { telemedicine } from '../assets'
import { useDispatch, useSelector } from 'react-redux'
import loginState, { changeLoginState, changeRegiserState, registerState } from '../slices/loginState'
const LoginRegister = ({navigation}) => {
//c
const [active,setActive]=useState('user')
  const {login} = useSelector((state) => state.loginSt)
const dispatch = useDispatch()
  return (
    <View style={{display:'flex',alignItems:'center', backgroundColor:'#D8EAEF',height:'100%'}}>
    <Image source={telemedicine} style={{marginTop:10,resizeMode:'contain',width:350,height:300,borderRadius:10}} />
  


<Text style={{fontWeight:800,fontSize:30,margin:10}} >{login ? <Text>Login</Text> :  <Text>Register</Text>   }</Text>

{!login &&(
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:20}} >

  <View style={[active === 'user' ? styles.blue : styles.gray]} >
  
  
  <Text  onPress={()=>setActive('user')} >User</Text>

  </View>


<View style={[active === 'health' ? styles.blue : styles.gray]}>

<Text onPress={()=>setActive('health')} >HealthPrac</Text>


</View>
  

  </View>
)}
{login && (


 <View  >


 <View >
  <View>

  <TextInput style={styles.inputText}  ></TextInput>

  <Text style={{position:'absolute',left:30,top:-3}} >Email</Text>
  <TextInput style={styles.inputText}  ></TextInput>
    <Text style={{position:'absolute',bottom:73,left:30}} >Password</Text>
  </View>
  

{/* {!login && (
<View>
    <TextInput style={styles.inputText}  />

     <Text style={{position:'absolute',left:30,top:-3}}  >Confirm Password</Text>
</View>


)} */}
</View>
<View style={{alignItems:'center'}} >
  <View style={{backgroundColor:'#26389E',width:200,borderRadius:20,margin:10}} >
   <TouchableOpacity>{login  ? <Text style={{color:'white',textAlign:'center',padding:10}}>Login</Text>  : <Text style={{color:'white',textAlign:'center',padding:10}}>Register</Text> }</TouchableOpacity>
  </View>
</View>
<View style={{display:'flex',flexDirection:'row',justifyContent:'center'}} >
  <Text  style={{color:'#a6a6a6' }} >{login ? <Text>Don't have an Account?</Text> : <Text>Already have an Account?</Text>   }</Text>

  <TouchableOpacity  >
  {login ?   <Text style={{marginLeft:5,color:'blue'}} onPress={()=>navigation.navigate('Register')} >Create an Account</Text> :  <Text onPress={()=>dispatch(changeLoginState())}  style={{marginLeft:5,color:'blue'}}>Login into Account</Text>  }

  </TouchableOpacity>

</View>
 </View>
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
  borderBottomColor:'blue',

  borderBottomWidth:2,
  marginLeft:15,
 },
 gray:{
    borderBottomColor:'gray',
    borderBottomWidth:2,
      marginLeft:15,

 }
})