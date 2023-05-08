import { View, Text, StyleSheet,Image,Button,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import { login } from '../assets'
import { doctor } from '../assets'
import { useDispatch, useSelector } from 'react-redux'
import { changeLoginState, changeRegiserState } from '../slices/loginState'
const JoinScreen = ({navigation}) => {
  // const {login} = useSelector((state) => state.loginSt)
  // const login = useSelector((state) => state.loginSt.login)
  const dispatch = useDispatch()
  const handlePress = () => {
    console.log('press is handled')
    // dispatch(changeLoginState())
    navigation.navigate('Login')
  }
  const handlePressReg = () => {

    // dispatch(changeRegiserState())
    navigation.navigate('Register')
  }
  return (
    <View style={{backgroundColor:'#EDEEFFFF',height:'100%'}} >
    <View style={styles.container} >
     <View>
      <Image source={doctor} style={{width:300,height:350,resizeMode:'contain'}} ></Image>
     </View>


  
    </View>
       <View>
      <Text style={{fontWeight:800,fontSize:25,textAlign:'center',marginTop:50}} >Our App is the Best App that exists on planet earth</Text>
    <Text  style={{textAlign:'center',color:'gray',marginTop:10}} >lorum ipsum ipela isad asood asi oasd</Text>
     </View>


     <View style={{marginTop:50,display:'flex',flexDirection:'row'}} >

<TouchableOpacity onPress={handlePress}
style={{backgroundColor:'#26389E',padding:15,borderRadius:5,width:150,margin:14}}
> 
  <Text style={{color:'white'}} > Login</Text>
  </TouchableOpacity>
<TouchableOpacity   onPress={handlePressReg}
style={{backgroundColor:'#26389E',padding:15,borderRadius:5,width:150,margin:14}}
>
   <Text  style={{color:'white'}} >Register</Text>
   </TouchableOpacity>

     </View>
    </View>
  )
}

export default JoinScreen


const styles = StyleSheet.create({

  container:{
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'white',
    margin:10,
    borderRadius:10,

    },
    image:{
    resizeMode:'contain'
    },
    button:{
      width:100,
      margin:10
    }
})