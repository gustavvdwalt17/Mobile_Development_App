import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './components/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingItem from './components/OnboardingItem';
import { Continue } from './components/OnboardingItem';
// import Login from './components/Login';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JoinScreen from './screens/JoinScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import Appointment from './screens/Appointment';
import UserScreen from './screens/UserScreen';
import LoginRegister from './screens/LoginRegister';
import RegsterSc2 from './screens/RegisterScreens/RegsterSc2';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './screens/RegisterScreens/Register';
import RegisterSc3 from './screens/RegisterScreens/RegisterSc3';
import RegisterSc4 from './screens/RegisterScreens/RegisterSc4';
import Book from './screens/Book';
import Document from './screens/Document';
import UserDashBoard from './screens/UserDashBoard';
import ScheduleMaker from './screens/ScheduleMaker';
import UpcomingAppointments from './screens/UpcomingAppointments';
const Stack = createNativeStackNavigator()
export default  App = ({navigation})=> {
  const [istrue,setIsTrue] = useState(false)

  const [loading,setLoading] = useState(false)
const Tab = createBottomTabNavigator()
  const checOnboard =  async () => {
  
 let val= await AsyncStorage.getItem('@onboarding') 
if (val){

    setIsTrue(true)
  // AsyncStorage.clear()
  // setIsTrue(true)
}
  }
//  let val= await AsyncStorage.getItem('onboarding') 
//  console.log('val',val)

// useEffect(()=>{
//   // setLoading(true)
//  checOnboard()
// },[])
console.log(istrue)
  return (

    <NavigationContainer>

      <Provider store={store} >
      <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
      > 


      {/* {!istrue ? (
        <>

     
             <Stack.Screen 
      name="Onboarding"
      component={Onboarding}
      
      />
      <Stack.Screen 
      name="OnboardingItem"
      component={OnboardingItem}
      />

      <Stack.Screen 
      name="Continue"
      component={Continue}
      />
         
                    <Stack.Screen 
      name="Join"
      component={JoinScreen}
      
      />
      
                    <Stack.Screen 
      name="Login"
      component={LoginRegister}/>
    
      </>
       
      ) : ( */}
        <>
                                    {/* <Stack.Screen 
      name="User"
      component={UserScreen}
      
      /> */}
                                        <Stack.Screen 
      name="dashr"
      component={UserDashBoard}
      
      />

                                  <Stack.Screen 
      name="appointment"
      component={Appointment}
      
      />
                                          <Stack.Screen 
      name="Scheduler"
      component={ScheduleMaker}
      
      />
                                                <Stack.Screen 
      name="upcoming"
      component={UpcomingAppointments}
      
      />


        


                          {/* <Stack.Screen 
      name="appointment"
      component={Appointment}
      
      /> */}

                            {/* <Stack.Screen 
      name="Document"
      component={Document}
      
      /> */}


         
                    <Stack.Screen 
      name="Join"
      component={JoinScreen}
      
      />
      



                    <Stack.Screen 
      name="Login"
      component={LoginRegister}
      
      />
                          <Stack.Screen 
      name="Register"
      component={Register}
      
      />
                          <Stack.Screen 
      name="RegisterSc2"
      component={RegsterSc2}
      
      />
                          <Stack.Screen 
      name="RegisterSc3"
      component={RegisterSc3}
      
      />
                          <Stack.Screen 
      name="RegisterSc4"
      component={RegisterSc4}
      
      />

{/* 
                            <Stack.Screen 
      name="User"
      component={UserScreen}
      
      /> */}
                            {/* <Stack.Screen 
      name="Book"
      component={Book}
      
      /> */}


      
</>
      {/* )} */}
 

    
 
    </Stack.Navigator>
    </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
