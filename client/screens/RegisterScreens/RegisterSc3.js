import { View, Text, StyleSheet,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'
import CalendarPicker from 'react-native-calendar-picker';
const RegisterSc3 = ({navigation}) => {
  return (
    <View style={{backgroundColor:'#D8EAEF',height:'100%'}} >
    {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:50}} >
        <View style={styles.blue}  ><Text style={{marginRight:20,fontSize:22}}>User</Text></View>
        <View style={styles.gray}><Text style={{fontSize:22}}>HealthPrac</Text></View>
    </View> */}



    <View style={{margin:20,marginTop:40}} >
        <Text style={{fontSize:18}} >Step 3 OF 4</Text>
    </View>

    <View style={{margin:20}} >
        <Text style={{fontSize:30,fontWeight:800}} >Personal Info</Text>
    </View>
    <View style={{margin:20,marginTop:5}}>
        <Text>All your information will be securely stored. We will not share your information with people outside our company.</Text>
    </View>

    <View>
        <Text style={{color:'silver',margin:10,marginTop:2}} > Name</Text>
    <TextInput style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />
   
        <Text style={{color:'silver',margin:10,marginTop:2}} >  Surnamel</Text>
    <TextInput style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />
   
        <Text style={{color:'silver',margin:10,marginTop:2}} > DOB</Text>
        <TouchableOpacity style={{margin:10}}><Text>Choose Date</Text></TouchableOpacity>
{/* 
 <CalendarPicker
  />
        */}

   
   
    </View>

<View style={{display:'flex',alignItems:'center',marginTop:50}} >
    <TouchableOpacity style={{backgroundColor:'#375169',width:150,height:50,borderRadius:20}} > 
        <Text style={{marginTop:15,color:'white',textAlign:'center'}} onPress={()=>navigation.navigate('RegisterSc4')} >Next</Text>
    </TouchableOpacity>
</View>

<View style={{alignItems:'center',marginTop:20}} >
    
    {/* <Text onPress={()=>navigation.navigate('Login')} >Already have an Account? Log in</Text> */}
</View>

    </View>
  )
}

export default RegisterSc3