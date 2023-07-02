import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import JoinScreen from './screens/JoinScreen';
import { store } from './store';
import { Provider } from 'react-redux';
import Appointment from './screens/UserScreens/Appointment';
import UserScreen from './screens/UserScreens/UserScreen';
import LoginRegister from './screens/LoginRegister';
import RegsterSc2 from './screens/RegisterScreens/RegsterSc2';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './screens/RegisterScreens/Register';
import RegisterSc3 from './screens/RegisterScreens/RegisterSc3';
import RegisterSc4 from './screens/RegisterScreens/RegisterSc4';
import ViewAllPracs from './screens/UserScreens/ViewAllPracs';
import Document from './screens/HealthPracScreens/Document';
import UserDashBoard from './screens/UserScreens/UserDashBoard';
import ScheduleMaker from './screens/HealthPracScreens/ScheduleMaker';
import UpcomingAppointments from './screens/UserScreens/UpcomingAppointments';
import HealthPracDashboard from './screens/HealthPracScreens/HealthPracDashboard';
import ViewPatients from './screens/HealthPracScreens/ViewPatients';
import Patients from './screens/HealthPracScreens/Patients';
import Scanner from './screens/HealthPracScreens/Scanner';
import ViewSchedule from './screens/HealthPracScreens/ViewSchedule';
import HealthPracEntry from './screens/HealthPracScreens/HealthPracEntry';
import Messages from './screens/UserScreens/Messages';
import UpcomingAppointmentsHealthPrac from './screens/HealthPracScreens/UpcomingAppointmentsHealthPrac';
import HealthPracMessages from './screens/HealthPracScreens/HealthPracMessages';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
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
      name="scan"
      component={Scanner}
      
      /> */}

                                <Stack.Screen 
      name="Join"
      component={JoinScreen}
      
      />

                             <Stack.Screen 
      name="RegisterSc3"
      component={RegisterSc3}
      
      />

      

                                                           <Stack.Screen 
      name="HealthEntry"
      component={HealthPracEntry}
      
      /> 


                                                                 <Stack.Screen 
      name="User"
      component={UserScreen}
      
      />  


  

{/* 

                                                           <Stack.Screen 
      name="HealthEntry"
      component={HealthPracEntry}
      
      />  */}

                                                                    <Stack.Screen 
      name="HealthPracDash"
      component={HealthPracDashboard}
      
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
      name="RegisterSc4"
      component={RegisterSc4}
      
      />




                            <Stack.Screen 
      name="viewallpracs"
      component={ViewAllPracs}
      
      />
      














        




                                                         <Stack.Screen 
      name="HealthPracMsg"
      component={HealthPracMessages}
      
      /> 









                                                   <Stack.Screen 
      name="UpcomingAppointmentsHealthPrac"
      component={UpcomingAppointmentsHealthPrac}
      
      /> 

                                                   <Stack.Screen 
      name="msg"
      component={Messages}
      
      /> 



                                           {/* <Stack.Screen 
      name="User"
      component={UserScreen}
      
      />  */}

                                                              <Stack.Screen 
      name="ViewSchedule"
      component={ViewSchedule}
      
      />

                                                      {/* <Stack.Screen 
      name="HealthPracDash"
      component={HealthPracDashboard}
      
      /> */}
                                                <Stack.Screen 
      name="dashr"
      component={UserDashBoard}
      
      />
                                                   <Stack.Screen 
      name="ViewPatients"
      component={ViewPatients}
      
      />






                    <Stack.Screen 
      name="Login"
      component={LoginRegister}
      
      />
              

                                        {/* <Stack.Screen 
      name="dashr"
      component={UserDashBoard}
      
      /> */}
                                        <Stack.Screen 
      name="appointment"
      component={Appointment}
      
      />
                                        <Stack.Screen 
      name="Patients"
      component={Patients}
      
      />

                                  <Stack.Screen 
      name="Document"
      component={Document}
      
      />
                                              {/* <Stack.Screen 
      name="HealthPracDash"
      component={HealthPracDashboard}
      
      /> */}
                                              {/* <Stack.Screen 
      name="ViewPatients"
      component={ViewPatients}
      
      /> */}


                                  {/* <Stack.Screen 
      name="appointment"
      component={Appointment}
      
      /> */}
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
