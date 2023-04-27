import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './components/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingItem from './components/OnboardingItem';
import { Continue } from './components/OnboardingItem';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator()
export default  App = ({navigation})=> {
  const [istrue,setIsTrue] = useState(false)
  const [loading,setLoading] = useState(false)
  const checOnboard =  async () => {
 let val= await AsyncStorage.getItem('@onboarding') 
if (val){
  AsyncStorage.clear()
  // setIsTrue(true)
}
  }
//  let val= await AsyncStorage.getItem('onboarding') 
//  console.log('val',val)

useEffect(()=>{
 checOnboard()
},[])
console.log(istrue)
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown:false
      }}
      > 
    {/* <View style={styles.container}> */}

      {istrue ? (
                <Stack.Screen 
      name="Login"
      component={Login}
      
      />
       
      ) : (
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
      name="Login"
      component={Login}
      
      />
      
</>
      )}
 

    
    {/* </View> */}
    </Stack.Navigator>
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
