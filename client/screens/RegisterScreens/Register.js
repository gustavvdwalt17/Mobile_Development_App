import { View, Text ,StyleSheet,TextInput, TouchableOpacity} from 'react-native'
import React from 'react'
import { useState } from 'react'

const Register = ({navigation}) => {
    //c
const [active,setActive]=useState('user')
  return (
    <View style={{backgroundColor:'#D8EAEF',height:'100%'}} >
    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:50}} >
        <View  ><Text  onPress={()=>setActive('user')}  style={[{marginRight:20,fontSize:22},active==='user' ? styles.blue : styles.gray]}>User</Text></View>
        <View ><Text onPress={()=>setActive('health')}  style={[{fontSize:22},active==='health' ? styles.blue : styles.gray]}>HealthPrac</Text></View>
    </View>



    <View style={{margin:20,marginTop:25}} >
        <Text style={{fontSize:18}} >Step 1 OF 4</Text>
    </View>

    <View style={{margin:20}} >
        <Text style={{fontSize:30,fontWeight:800}} >Cellphone Number</Text>
    </View>
    <View style={{margin:20}}>
        <Text>All your information will be securely stored. We will not share your information with people outside our company.</Text>
    </View>

    <View>
        <Text style={{color:'silver',margin:15}} >  Cell Number</Text>
    <TextInput style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:15,marginTop:5}} />
     <Text style={{margin:15,color:'silver',marginTop:5}} >*Must be a South African cell number.</Text>   
    </View>

<View style={{display:'flex',alignItems:'center',marginTop:50}} >
    <TouchableOpacity style={{backgroundColor:'#375169',width:150,height:50,borderRadius:20}} > 
        <Text style={{marginTop:15,color:'white',textAlign:'center'}} onPress={()=>navigation.navigate('RegisterSc2')} >Next</Text>
    </TouchableOpacity>
</View>

<View style={{alignItems:'center',marginTop:20}} >
    
    <Text onPress={()=>navigation.navigate('Login')} >Already have an Account? Log in</Text>
</View>

    </View>
  )
}
//D8EAEF
export default Register

const styles = StyleSheet.create({


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