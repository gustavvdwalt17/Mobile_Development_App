import { View, Text, StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
const RegsterSc2 = ({navigation}) => {
        const {isUser} = useSelector((state)=> state.loginSt)
  return (
    <View style={{backgroundColor:'#D8EAEF',height:'100%'}} >
    {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:50}} >
        <View style={styles.blue}  ><Text style={{marginRight:20,fontSize:22}}>User</Text></View>
        <View style={styles.gray}><Text style={{fontSize:22}}>HealthPrac</Text></View>
    </View> */}



    <View style={{margin:20,marginTop:40}} >
        <Text style={{fontSize:18}} > {isUser ? <Text>Step 2 OF 3</Text>: <Text>Step 2 OF 4</Text>}  </Text>
    </View>

    <View style={{margin:20}} >
        <Text style={{fontSize:30,fontWeight:800}} >Email and Password</Text>
    </View>
    <View style={{margin:20,marginTop:5}}>
        <Text>All your information will be securely stored. We will not share your information with people outside our company.</Text>
    </View>

    <View>
        <Text style={{color:'silver',margin:10,marginTop:2}} >  Cell Number</Text>
    <TextInput style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />
   
        <Text style={{color:'silver',margin:10,marginTop:2}} >  Email</Text>
    <TextInput style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />
   
        <Text style={{color:'silver',margin:10,marginTop:2}} > Password</Text>
    <TextInput style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />
   
        <Text style={{color:'silver',margin:10,marginTop:2}} >  Confirm Password</Text>
    <TextInput style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:15,marginTop:5}} />
   
    </View>

<View style={{display:'flex',alignItems:'center',marginTop:50}} >
    <TouchableOpacity style={{backgroundColor:'#375169',width:150,height:50,borderRadius:20}} > 
        <Text style={{marginTop:15,color:'white',textAlign:'center'}} onPress={()=>navigation.navigate('RegisterSc3')} >Next</Text>
    </TouchableOpacity>
</View>

<View style={{alignItems:'center',marginTop:20}} >
    
    {/* <Text onPress={()=>navigation.navigate('Login')} >Already have an Account? Log in</Text> */}
</View>

    </View>
  )
}
//D8EAEF
export default RegsterSc2

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

