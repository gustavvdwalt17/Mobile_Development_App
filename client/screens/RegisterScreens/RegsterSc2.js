import { View, Text, StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons';
import { dataForRegister } from '../../slices/allState'
const RegsterSc2 = ({navigation}) => {
    const dispatch = useDispatch()

   
        const {isUser} = useSelector((state)=> state.loginSt)
          const registerData = useSelector((state) => state.loginSt.registerData)
            const [formData,setFormData] = useState(null)
            const [showPasswords,setShowPasswords] = useState(false)
   useEffect(()=>{
  setFormData(registerData)
   },[registerData])
        
       const handleInputChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value
    }));
    console.log(formData)
  };

  const handleNav = () => {

     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for email validation

     if (emailRegex.test(formData.email)) {
        if (formData.password===null || formData.confirmPassword===null){
            handleAlerts('Please enter a password')
            return
        }
        if (formData.password.length<8){
             handleAlerts('password must be at least 8 characters')
            return
        }
        if (formData.password !== formData.confirmPassword){
             handleAlerts('Passwords do not match')
            return
        }
        
    dispatch(dataForRegister(formData))
    navigation.navigate('RegisterSc3')
    // Valid email address
    //validate the password next
  } else {
    // Invalid email address

    handleAlerts('Email is incorrect')
    return
  }

};
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

 
    
        <Text style={{color:'silver',margin:10,marginTop:2}} >  Email</Text>
    <TextInput onChangeText={(value)=> handleInputChange('email',value)} style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:2,marginTop:5}} />



<View style={{ position: 'relative' }}>

    <Text style={{ color: 'silver', margin: 10, marginTop: 2 }}>Password</Text>

    <TextInput secureTextEntry={showPasswords} onChangeText={(value) => handleInputChange('password', value)} style={{ backgroundColor: 'white', width: 250, height: 50, borderRadius: 10, margin: 10, marginTop: 2, marginTop: 5 }} />



  <TouchableOpacity style={{ position: 'absolute', right: 80, top: 55, marginRight: 25 }} onPress={() => setShowPasswords(!showPasswords)}>
    <Icon name={showPasswords ? 'eye-off-outline' : 'eye-outline'} size={20} />
  </TouchableOpacity>



</View>
    
    
    <View style={{ position: 'relative' }}>
        <Text style={{color:'silver',margin:10,marginTop:2}} >  Confirm Password</Text>
    <TextInput secureTextEntry={showPasswords} onChangeText={(value)=> handleInputChange('confirmPassword',value)}  style={{backgroundColor:'white',width:250,height:50,borderRadius:10,margin:10,marginTop:5}} />
       
    <TouchableOpacity style={{ position: 'absolute', right: 80, top: 55, marginRight: 25 }}onPress={()=>setShowPasswords(!showPasswords)} >
    <Icon name={showPasswords ? 'eye-off-outline' : 'eye-outline'} size={20} />
    </TouchableOpacity>

    </View>


<View style={{display:'flex',alignItems:'center',marginTop:50}} >
    <TouchableOpacity  onPress={()=>handleNav()} style={{backgroundColor:'#375169',width:150,height:50,borderRadius:20}} > 
        <Text style={{marginTop:15,color:'white',textAlign:'center'}} >Next</Text>
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

