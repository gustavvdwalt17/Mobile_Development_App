import { View, Text,Image, TouchableOpacity,ImageBackground,StyleSheet } from 'react-native'
import React, { useEffect,useState } from 'react'
import { pfp } from '../../assets'
import IP_ADDRESS from '../ipadress'
import axios from 'axios'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { addPatientID } from '../../slices/allState'
import { useDispatch } from 'react-redux'
const ViewPatients = ({navigation}) => {
  const dispatch = useDispatch()
    const [patients,setPatients]=useState(null)
const fetchData = async () =>{
 try {
    const id = '1'
    const response = await axios.get(`http://${IP_ADDRESS}/fetchPatients`,id);

    console.log(response.data)
    setPatients(response.data)
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error);
  }
}

    useEffect(()=>{


        fetchData()
    },[])


    const handleUserPress = (id) =>{
      //get id of user
      console.log(id)
      dispatch(addPatientID(id))

      navigation.navigate('Document')
    }
  return (
        <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >
    <View style={{marginTop:35,marginLeft:5,width:300}}>

      <Text style={{marginLeft:3,fontSize:22,fontWeight:500,marginBottom:10,color:'white'}} >Patients</Text>
    {patients?.map((item,index)=>{
        return (
            <View style={{backgroundColor:'#1F3B5B',padding:5,borderRadius:5,display:'flex',flexDirection:'row',position:'relative',padding:20,marginTop:10}} key={index} >
              
              <View>
                <Image source={pfp}  style={{width:50,height:50,borderRadius:25}} ></Image>
              </View>
              <View style={{display:'flex',flexDirection:'column',marginLeft:5}} >
                <Text style={{color:'white'}}>Name: {item.name}</Text>
                <Text style={{color:'white'}}>Email: {item.email}</Text>
              </View>
              <View  style={{position:'absolute',right:0,bottom:0,right:5}}  >
     <TouchableOpacity onPress={()=>handleUserPress(item.user_id)} style={{color:'white'}} >
        <FontAwesomeIcon name="info-circle" size={25} color="white" />
     </TouchableOpacity>
              </View>
          

            </View>
        )
    })}
    </View>
    </ImageBackground>
  )
}

export default ViewPatients

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
});