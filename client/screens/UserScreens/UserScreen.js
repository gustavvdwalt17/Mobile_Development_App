import { View, Text,Image ,StyleSheet} from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import JoinScreen from '../JoinScreen'
import UserDashBoard from './UserDashBoard'
import Appointment from './Appointment'
import { home } from '../../assets'
import Messages from './Messages'
import LoginRegister from '../LoginRegister'
const Tab = createBottomTabNavigator()
const UserScreen = () => {
  let msg =true
    const home = 'home'
    const rando = 'messages'
    const user = 'user'
  return (
// return(
// <View>

//     <Image source={home} resizeMode="contain" />
    
// </View>

// )
    
  <Tab.Navigator
        screenOptions={({ route }) => ({
                activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70},
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === home) {
              iconName = focused ? 'home' : 'home-outline';

            }
            //  else if (rn === detailsName) {
            //   iconName = focused ? 'list' : 'list-outline';

            // } 
            else if (rn === rando) {
                console.log('rando')
              iconName = focused ? 'settings' : 'chatbox-ellipses-outline';
            }
                 else if (rn === user) {
                console.log('rando')
              iconName = focused ? 'person-circle' :'person-circle-outline';
            }

            // You can return any component that you like here!
         {msg && <View style={styles.redDot} />}
         return <Ionicons name={iconName} size={size} color={color} />;
         
          },
        })}
    >

        <Tab.Screen name={home} component={UserDashBoard} options={{headerShown:false}} />
        <Tab.Screen name={rando} component={Messages} options={{headerShown:false}} />
        <Tab.Screen name={user} component={LoginRegister} options={{headerShown:false}} />
        {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}

      </Tab.Navigator>


  )
}

export default UserScreen
const styles = StyleSheet.create({
  redDot: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});