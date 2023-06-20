import { View, Text,Image } from 'react-native'
import React, { useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Document from './Document'
import HealthPracDashboard from './HealthPracDashboard'
import { home } from '../../assets'
import HealthPracMessages from './HealthPracMessages'
import ViewSchedule from './ViewSchedule'
import LoginRegister from '../LoginRegister'
const Tab = createBottomTabNavigator()
const HealthPracEntry = () => {
    const home = 'home'
    const rando = 'messages'
    const user = 'user'
  return (   
  <Tab.Navigator
        screenOptions={({
            
            
            route }) => ({
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
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
            }
            else if (rn === 'schedule'){
               iconName = focused ? 'calendar' : 'calendar-outline';
            }
                             else if (rn === user) {
                console.log('rando')
              iconName = focused ? 'person-circle' :'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
  >

        <Tab.Screen name={home} component={HealthPracDashboard} options={{headerShown:false}} />   
        <Tab.Screen name={rando} component={HealthPracMessages} options={{headerShown:false}} />
    
        <Tab.Screen name={user} component={LoginRegister} options={{headerShown:false}} />
        {/* <Tab.Screen name={settingsName} component={SettingsScreen} /> */}

      </Tab.Navigator>


  )
}

export default HealthPracEntry