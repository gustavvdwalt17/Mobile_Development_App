import { View, Text, useWindowDimensions,StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import JoinScreen from '../../screens/JoinScreen'
const OnboardingItem = ({item,navigation}) => {
  const  {width} = useWindowDimensions()

  return (
    <View style={[styles.container,{width}]}>
 <Image source={item.img} style={[styles.image,{width,resizeMode:'contain'}]}  ></Image>

 <View style={{flex:0.3}} >
 <Text style={styles.title} >{item.title}</Text>
 <Text style={styles.desc} >{item.desc}</Text>

 { item.id === '4' && <Continue navigation={navigation} />}
 </View>
    </View>
  )
}
export const Continue =  ({navigation}) =>{

  const handlePress = async () => {

    try{
    await AsyncStorage.setItem('@onboarding','true')
    }catch(error){
      console.log(error)
    }


      
      navigation.navigate('Join')
  }
  return (
    <View style={styles.continue} >
      <TouchableOpacity>

        <Text style={{color:'white',textAlign:'center',
      marginTop:13}}  onPress={handlePress }   >Next</Text>
      </TouchableOpacity>

    </View>
  )
}
export default OnboardingItem

const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  image:{
flex:0.7,
justifyContent:'center'

  },
  title:{
    fontWeight:'800',
    fontSize:28,
    marginBottom:10,

    color:'#493d8a',
    textAlign:'center'
  },
  continue:{
    backgroundColor:'darkblue',
    width:50,
    height:50,
        marginTop:12,
    borderRadius:25,

  }
})