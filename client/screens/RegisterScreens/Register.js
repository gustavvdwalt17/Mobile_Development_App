import { View, Text ,StyleSheet,TextInput, TouchableOpacity,Alert} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { dataForRegister, healthPracorUser, registerdata } from '../../slices/allState'
import { useEffect } from 'react'
const Register = ({navigation}) => {
    const dispatch = useDispatch()
    //c
const [active,setActive]=useState('user')
const [isUser,setIsUser]=useState('true')
  const [formData, setFormData] = useState({
    phone: null,
    email: null,
    password: null,
    confirmPassword: null,
    name: null,
    surname: null,
    dob: null
  });
// useEffect(()=>{
   
//        dispatch(healthPracorUser(isUser))
// },[active])


const handlePress = () => {
      const saNumberRegex = /^(?:\+27|0)[1-9]\d{8}$/; 
    if (formData.phone ==='' ){
          Alert.alert(
      'Bru',
      'Incorrect phone number',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
    return
    }

   
   

   if (saNumberRegex.test(formData.phone)) {
    // Valid South African number
   dispatch(dataForRegister(formData))
    navigation.navigate('RegisterSc2')
  } else {
    // Invalid South African number
              Alert.alert(
      'Error',
      'Incorrect phone number',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false }
    );
    return
  }
    //VERIFY NUMBER
    // dispatch(healthPracorUser(active))
  
}
  const handleInputChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value
    }));
    console.log(formData)
  };
  return (
    <View style={{backgroundColor:'#D8EAEF',height:'100%'}} >
    <View style={{display:'flex',flexDirection:'row',justifyContent:'center',marginTop:50}} >
        {/* <View  ><Text  onPress={()=>setActive('user')}  style={[{marginRight:20,fontSize:22},active==='user' ? styles.blue : styles.gray]}>User</Text></View>
        <View ><Text onPress={()=>setActive('health')}  style={[{fontSize:22},active==='health' ? styles.blue : styles.gray]}>HealthPrac</Text></View> */}
    </View>



    <View style={{margin:20,marginTop:25}} >
        {/* <Text style={{fontSize:18}} >{active==='user' ? <Text>Step 1 of 3</Text> : <Text>Step 1 of 4</Text>}</Text> */}
        <Text style={{fontSize:18}} >Step 1 of 3</Text> 
    </View>

    <View style={{margin:20}} >
        <Text style={{fontSize:30,fontWeight:800}}
      
        >Cellphone Number</Text>
    </View>
    <View style={{margin:20}}>
        <Text>All your information will be securely stored. We will not share your information with people outside our company.</Text>
    </View>

    <View>
        <Text style={{color:'silver',margin:15}} >  Cell Number</Text>
    <TextInput    onChangeText={(value) => handleInputChange('phone', value)} style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:15,marginTop:5}} />
     <Text style={{margin:15,color:'silver',marginTop:5}} >*Must be a South African cell number.</Text>   
    </View>

<View style={{display:'flex',alignItems:'center',marginTop:50}} >
    <TouchableOpacity  onPress={()=>handlePress()} style={{backgroundColor:'#375169',width:150,height:50,borderRadius:20}} > 
        <Text style={{marginTop:15,color:'white',textAlign:'center'}} >Next</Text>
    </TouchableOpacity>
</View>

<TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{alignItems:'center',marginTop:20}} >
    
    <Text  >Already have an Account? Log in</Text>
</TouchableOpacity>

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