import { View, Text,Image,TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { telemedicine } from '../assets'
const LoginRegister = () => {
  return (
    <View style={{display:'flex',alignItems:'center', backgroundColor:'#EDEEFFFF',height:'100%'}}>
    <Image source={telemedicine} style={{marginTop:10,resizeMode:'contain',width:350,height:300,borderRadius:10}} />
  
  <View>

<Text style={{fontWeight:800,fontSize:30,margin:10}} >Login</Text>

  </View>
  <View>

  <TextInput style={styles.inputText}  ></TextInput>

  <Text style={{position:'absolute',left:30,top:-3}} >Email</Text>
  <TextInput style={styles.inputText}  ></TextInput>
    <Text style={{position:'absolute',bottom:73,left:30}} >Password</Text>
  </View>
  

  <View style={{backgroundColor:'#26389E',width:200,borderRadius:10,margin:10}} >
   <TouchableOpacity><Text style={{color:'white',textAlign:'center',padding:10}} >Login</Text></TouchableOpacity>
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