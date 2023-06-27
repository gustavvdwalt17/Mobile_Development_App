import { View, Text,Image, TouchableOpacity,ImageBackground,StyleSheet, ScrollView, TextInput } from 'react-native'
import React, { useEffect,useState } from 'react'
import { pfp } from '../../assets'
import IP_ADDRESS from '../ipadress'
import axios from 'axios'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { addPatientID, dataBlock } from '../../slices/allState'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const ViewPatients = ({navigation}) => {
  const dispatch = useDispatch()
   const healthid = useSelector((state) => state.loginSt.healthId) //change  this  doesnt have to do with login
    const [patients,setPatients]=useState(null)
    const [searchedPatients,setSearchedPatients] = useState('')
    const [searchedValue,setSearchedValue] = useState('')
const fetchData = async () =>{
 try {
    // const id = healthid
    const response = await axios.get(`http://${IP_ADDRESS}/fetchPatients/${healthid}`);

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
  
  
    useEffect(()=>{
  searchUser()
    },[searchedValue])

    const handleUserPress = (id,name,email,dob) =>{
      //get id of user
      const dataTo = {name,email,dob}
      console.log(id)
      dispatch(addPatientID(id))
      //
      dispatch(dataBlock(dataTo))
      navigation.navigate('Document')
    }
  
  
    const searchUser = () => {
// console.log(allPracs,'praccel')
console.log(patients,'hereer')

const newValues = patients?.filter(item => item.name.toLowerCase().includes(searchedValue.toLocaleLowerCase()))


setSearchedPatients(newValues)

// const newValues = allPracs?.filter(item => item.Name.toLowerCase().includes(searchedValue.toLowerCase()))



  }


  return (
        <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >

    <ScrollView 
    
    style={{marginTop:35,marginLeft:5}}>
      


      <Text style={{marginLeft:3,fontSize:22,fontWeight:500,marginBottom:10,color:'white'}} >Your Patients.</Text>
     <View style={{display:'flex',flexDirection:'row'}} >
 
<TextInput onChangeText={value=>setSearchedValue(value)} placeholder='search'  placeholderTextColor="#c0c0c0"   style={styles.input} ></TextInput>
       
       {/* <TouchableOpacity onPress={()=>searchUser()} style={{marginLeft:5,marginTop:20}} >
   <Icon name="search" size={20} color="white"  />
       </TouchableOpacity> */}
    

     </View>


<View style={{width:300,marginLeft:5}} >

{console.log(patients,'patpat')}
{searchedValue === '' ? (
  patients && patients.length > 0 ? (
    patients.map((item, index) => (
      <View
        style={{
          backgroundColor: '#1F3B5B',
          padding: 5,
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          padding: 20,
          marginTop: 10,
        }}
        key={index}
      >
        <View>
          <Image source={pfp} style={{ width: 50, height: 50, borderRadius: 25 }} />
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
          <Text style={{ color: 'white' }}>Name: {item.name} {item.surname} </Text>
          <Text style={{ color: 'white' }}>Email: {item.email}</Text>
        </View>
        <View style={{ position: 'absolute', right: 0, bottom: 0, right: 5 }}>
          <TouchableOpacity onPress={() => handleUserPress(item.user_id, item.name, item.email, item.DOB)} style={{ color: 'white' }}>
            <FontAwesomeIcon name="info-circle" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ))
  ) : (
    <Text style={{color:'white',marginLeft:5,marginTop:10}} >No patients found.</Text>
  )
) : (
  searchedPatients && searchedPatients.length > 0 ? (
    searchedPatients.map((item, index) => (
      <View
        style={{
          backgroundColor: '#1F3B5B',
          padding: 5,
          borderRadius: 5,
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          padding: 20,
          marginTop: 10,
        }}
        key={index}
      >
        <View>
          <Image source={pfp} style={{ width: 50, height: 50, borderRadius: 25 }} />
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 5 }}>
          <Text style={{ color: 'white' }}>Name: {item.name}</Text>
          <Text style={{ color: 'white' }}>Email: {item.email}</Text>
        </View>
        <View style={{ position: 'absolute', right: 0, bottom: 0, right: 5 }}>
          <TouchableOpacity onPress={() => handleUserPress(item.user_id)} style={{ color: 'white' }}>
            <FontAwesomeIcon name="info-circle" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    ))
  ) : (
    <Text  style={{color:'white',marginLeft:5,marginTop:10}}>No patients found.</Text>
  )
)}
    
    
    
    </View>
    {/* <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text>
    <Text>asdasd</Text> */}
    </ScrollView>
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
     input: {
    // backgroundColor: 'silver',
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    color: 'white',
    borderColor:'silver',
       borderWidth: 1,
       width: 300,
       marginLeft:7,
       marginTop:10,
   
  },
});