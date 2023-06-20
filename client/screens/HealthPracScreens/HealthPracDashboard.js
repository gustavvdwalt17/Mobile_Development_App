import { View, Text,TouchableOpacity,Image, ImageBackground,StyleSheet } from 'react-native'
import React,{useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { rarrow } from '../../assets'
import { useSelector } from 'react-redux'
import { pfp } from '../../assets'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
const HealthPracDashboard = ({navigation}) => {
   const healthid = useSelector((state) => state.loginSt.currentHealthPracAppointment) //change  this  doesnt have to do with login
//      const setNameInAsyncStorage = async (name) => {
//   try {
//     await AsyncStorage.setItem('name', name);
//     console.log('Name stored successfully!');
//   } catch (error) {
//     console.log('Error storing name: ', error);
//   }
// };
//      const setIdInAsyncStorage = async (id) => {
//   try {
//     await AsyncStorage.setItem('id',id);
//     console.log('Name stored successfully!');
//   } catch (error) {
//     console.log('Error storing name: ', error);
//   }
// };//https://www.freepik.com/free-photos-vectors/app-background/5
  const asyncstore =async () => {
  
try {
  const userId = await AsyncStorage.getItem('healthId');

  
  if (userId !== null) {
console.log('idididi',userId)
  //  setCurrentUserId(userId);

  //   dispatch(curruserId(userId))
    // Use the user ID for further processing or display
  } else {
    console.log('User ID not found in AsyncStorage');
  }
} catch (error) {
  console.log('Error retrieving data:', error);
}
  }


useEffect(()=>{
 asyncstore() 
},[])
   const home = 'homee'
    const rando = 'random'
  return (
    <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >
<View style={{display:'flex',flexDirection:'row',marginTop:35,marginLeft:10}} >
<Image source={pfp}  style={{width:50,height:50,borderRadius:25}} ></Image>

 <Text style={{marginLeft:5,fontSize:22,fontWeight:500,color:'white'}}  >Welcome Practitioner</Text>
</View>

        
        <Text  style={{margin:5,fontWeight:600,color:'white',marginTop:10,marginLeft:10}}>What would you like to do today?</Text>
    <View style={{backgroundColor:'#1F3B5B',margin:10,width:300,height:100,borderRadius:10}}>
        
       <Text style={{color:'white',margin:5}} >Manage Appointments</Text> 
              <TouchableOpacity onPress={()=>navigation.navigate('UpcomingAppointmentsHealthPrac')} style={{width:50,height:50,borderRadius:25,backgroundColor:'white',position:'absolute',right:10,bottom:10,}}
        // onPress={()=>navigation.navigate('upcoming')}
        >
          <View style={{alignItems:'center',marginTop:15}} >
       <Image source={rarrow} style={{resizeMode:'contain',width:20,height:20}} />
          </View>
     
        </TouchableOpacity>
        </View>
    <View style={{backgroundColor:'#1F3B5B',margin:10,width:300,height:100,borderRadius:10}}>
        
       <Text style={{color:'white',margin:5}}>Check Schedule</Text> 
               <TouchableOpacity onPress={()=>navigation.navigate('ViewSchedule')}  style={{width:50,height:50,borderRadius:25,backgroundColor:'white',position:'absolute',right:10,bottom:10,}}
        // onPress={()=>navigation.navigate('upcoming')}
        >
          <View style={{alignItems:'center',marginTop:15}} >
       <Image source={rarrow} style={{resizeMode:'contain',width:20,height:20}} />
          </View>
     
        </TouchableOpacity>
        </View>

    <View style={{backgroundColor:'#1F3B5B',margin:10,width:300,height:100,borderRadius:10}}>
        
       <Text style={{color:'white',margin:5}}>View Patients</Text> 
              <TouchableOpacity style={{width:50,height:50,borderRadius:25,backgroundColor:'white',position:'absolute',right:10,bottom:10,}}
        onPress={()=>navigation.navigate('ViewPatients')}
        >
          <View style={{alignItems:'center',marginTop:15}}  >
       <Image source={rarrow} style={{resizeMode:'contain',width:20,height:20}} />
          </View>
     
        </TouchableOpacity>
        </View>
        

    </ImageBackground>
  )
}

export default HealthPracDashboard

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
});