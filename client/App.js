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
import LoginRegister from './screens/LoginRegister';
const Stack = createNativeStackNavigator()
export default  App = ({navigation})=> {
  const [istrue,setIsTrue] = useState(false)

  const [loading,setLoading] = useState(false)

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

useEffect(()=>{
  // setLoading(true)
 checOnboard()
},[])
console.log(istrue)
  return (

    <NavigationContainer>

      <Provider store={store} >
      <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
      > 


      {!istrue ? (
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
       
      ) : (
        <>
        
         
                    <Stack.Screen 
      name="Join"
      component={JoinScreen}
      
      />
      
                    <Stack.Screen 
      name="Login"
      component={LoginRegister}
      
      />
      
</>
      )}
 

    
 
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
