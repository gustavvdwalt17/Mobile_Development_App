import { View, Text,Image, TouchableOpacity,StyleSheet, FlatList,ScrollView,ImageBackground } from 'react-native'
import React,{useEffect,useState} from 'react'
import { pfp } from '../../assets'
import { rarrow } from '../../assets'
import axios from 'axios'
import { phone2 } from '../../assets'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { phone } from '../../assets'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IP_ADDRESS from '../ipadress'
import { addPracs, currHealthIdApp, curruserId, theHealthName } from '../../slices/allState'
import { useSelector } from 'react-redux'
// import { background } from '../../assets'
// import { backgroundImg } from '../../assets'
const UserDashBoard = ({navigation}) => {
   const currUserName = useSelector((state) => state.loginSt.userName)
  

  const dispatch = useDispatch()
  const [healthPrac,setHealthPrac]=useState([])
  const [currentUserId,setCurrentUserId]=useState(null)
  const handlePress = async () =>{
 try {

    const response = await axios.get(`http://${IP_ADDRESS}/getpracs`);
        setHealthPrac(response.data)
        let theData = response.data
    // console.log('returned daya',theData);

    // console.log('healthPrats',healthPrac)
  } catch (error) {
    // Handle any error that occurred during the request
    console.error(error.message);
    // if (error.response) {
    //   console.log(error.response.data);
    //   // console.log(error.response.status);
    //   // console.log(error.response.headers);
    // }
  }

  const asyncstore =async () => {
    console.log(currentUserId)
try {
  const userId = await AsyncStorage.getItem('user_id');

  
  if (userId !== null) {

   setCurrentUserId(userId);

    dispatch(curruserId(userId))
    // Use the user ID for further processing or display
  } else {
    console.log('User ID not found in AsyncStorage');
  }
} catch (error) {
  console.log('Error retrieving data:', error);
}
  }

 asyncstore() 


}
  useEffect(()=>{
    handlePress()
  },[])
let tempData = [
  {
 id:'1',
img:'',
name:'Dr. Martin Vyl',
title:'chiropractor',
},
  {
 id:'2',
img:'',
name:'Dr. Martin Vyl',
title:'chiropractor',
},
  {
 id:'3',
img:'',
name:'Dr. Martin Vyl',
title:'chiropractor',
},
  {
 id:'4',
img:'',
name:'Dr. Martin Vyl',
title:'chiropractor',
},
  {
 id:'5',
img:'',
name:'Dr. Martin Vyl',
title:'chiropractor',
},

]


const handleNav = () => {
dispatch(addPracs(healthPrac))
navigation.navigate('viewallpracs')
}

const handleNavApp = (id,name,surname) => {

  let newname = name + " " + surname
  console.log(newname)
  dispatch(currHealthIdApp(id))
  dispatch(theHealthName(newname))
  navigation.navigate('appointment')
}
  return (

    <ImageBackground 

       source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
>


      {/* <Image source={backgroundImg} style={{zIndex:0}} ></Image> */}
 {/* <Image style={{}} source={phone} ></Image> */}
      {/* <Image source={background} ></Image> */}
    {/* <View style={{backgroundColor:'#0A2540',zIndex:1}}> */}
    <View style={{display:'flex',flexDirection:'row',margin:30,marginTop:50}} >

      <Image source={pfp} style={{resizeMode:'contain',width:50,height:50,borderRadius:25}} />
      <Text style={{fontSize:22,marginLeft:10,fontWeight:600,color:'white'}} >Welcome, {currUserName}</Text>
    </View>

    <View >
      <Text style={{margin:20,fontSize:22,color:'white'}}>Upcoming Appointments</Text>


      <View style={{backgroundColor:'#CCCCCC',height:150,width:300,borderRadius:10,margin:20}} >
        <Text style={{color:'black',margin:5}} >View Upcoming Appointments</Text>
        {/* <Text style={{color:'white',margin:5}} >12/04/2023</Text> */}


        <TouchableOpacity style={{width:50,height:50,borderRadius:25,backgroundColor:'white',position:'absolute',right:10,bottom:10,}}
        onPress={()=>navigation.navigate('upcoming')}
        >
          <View style={{alignItems:'center',marginTop:15}} >
       <Image source={rarrow} style={{resizeMode:'contain',width:20,height:20}} />
          </View>
     
        </TouchableOpacity>
      </View>
    </View>

    <View>
      <Text style={{fontSize:20,margin:20,fontWeight:600,color:'white'}}>Find a Practitioner</Text>

      <View>
        

{/* {healthPrac !==[] && healthPrac.map((item,index)=>{
  return (
    <View key={index} >

      <Text>{item.Email}
      {console.log('daitem',item)}
      </Text>
    </View>
  )
})}     */}
{/* <FlatList
  data={healthPrac}
  keyExtractor={(item) => item.HealthPracID.toString()}
  renderItem={({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>{item.name}</Text>
    </View>
  )}
  horizontal={true}
/> */}
    <View>
      <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}>
        {console.log(healthPrac,'every health')}
        { healthPrac !==[] && healthPrac.slice(0,3).map((item,index) => (

          
        <View style={{backgroundColor:'#CCCCCC',margin:10,padding:20,borderRadius:10}} key={index}>
          <View style={{display:'flex',flexDirection:'row'}} >
        <Image source={pfp} style={{width:30,height:30,borderRadius:15}} />
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{marginLeft:10,color:'black'}}>{item.Name}</Text>
            <Text style={{marginLeft:5,color:'black'}}>{item.Surname}</Text> 
        </View>

          </View>

          <TouchableOpacity onPress={()=>handleNavApp(item.HealthPracID,item.Name,item.Surname)} style={{backgroundColor:'#1F3B5B',margin:10,marginTop:20,width:180,padding:10,borderRadius:10}}>
            <Text style={{color:'white',textAlign:'center'}} >Book consultation</Text>
          </TouchableOpacity>

          </View>
      // <View style={{backgroundColor:'#E4E3E3',margin:10,padding:20,borderRadius:10}}>
      //       <View style={{display:'flex',flexDirection:'row'}}>
      //    <Text>{item.Name}</Text>    
      //       <Text>{item.Surname}</Text>
      //       </View>
   
      //       <Text>{item.Email}</Text>
      //     </View>
        ))}
        <TouchableOpacity onPress={()=>handleNav()} >
    <Text style={{color:'white',marginRight:5,marginTop:10}} >View All </Text>
<Text><Ionicons name="arrow-forward" size={24} color="white" /></Text>
        </TouchableOpacity>
  
      </ScrollView>

    </View>

        {/* <FlatList
    
        data={tempData}
          keyExtractor={(item)=>item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item})=>{
return (
        <View style={{backgroundColor:'#E4E3E3',margin:10,padding:20,borderRadius:10}}>
          <View style={{display:'flex',flexDirection:'row'}} >
        <Image source={pfp} style={{width:30,height:30}} />
        <View style={{display:'flex',flexDirection:'column'}}>
            <Text style={{marginLeft:10}}>{item.name}</Text>
            <Text style={{marginLeft:10}}>{item.title}</Text> 
        </View>

          </View>

          <TouchableOpacity style={{backgroundColor:'#082572',margin:10,marginTop:20,width:180,padding:10,borderRadius:10}}>
            <Text style={{color:'white',textAlign:'center'}} onPress={()=>navigation.navigate('Book')}>Book consultation</Text>
          </TouchableOpacity>
  {console.log('healthpraccccccccie',healthPrac)}
          </View>
)
  

        }}
        /> */}
          
      </View>
    </View>
    {/* </View> */}
</ImageBackground>
  )
}

export default UserDashBoard

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
});