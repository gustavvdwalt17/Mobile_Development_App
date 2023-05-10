import { View, Text,Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import JoinScreen from './JoinScreen'
import UserDashBoard from './UserDashBoard'

import { home } from '../assets'
const Tab = createBottomTabNavigator()
const UserScreen = () => {
    const home = 'homee'
    const rando = 'random'
  return (
// return(
// <View>

//     <Image source={home} resizeMode="contain" />
    
// </View>

// )
    
  <Tab.Navigator
        screenOptions={({ route }) => ({
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
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={home} component={UserDashBoard} options={{headerShown:false}} />
        {/* <Tab.Screen name={rando} component={Random} options={{headerShown:false}} /> */}
        {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}

      </Tab.Navigator>


  )
}

export default UserScreen