import { View, Text,Image, TouchableOpacity, FlatList,ScrollView,ImageBackground } from 'react-native'
import React,{useEffect,useState} from 'react'
import { pfp } from '../assets'
import { rarrow } from '../assets'
import axios from 'axios'
import { background } from '../assets'
const UserDashBoard = ({navigation}) => {
  useEffect(()=>{
    handlePress()
  },[])
  const [healthPrac,setHealthPrac]=useState([])

  const handlePress = async () =>{
 try {
  
    const response = await axios.get('http://10.0.0.4:3001/user');
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
}
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
  return (
    <ImageBackground
    source={require('../assets/background_2.jpg')}
    style={{width:'100%', height:'100%'}}
    // styles={{ flex: 1,
    //   height: 100,
      
    // resizeMode: 'contain'}}
    >
      {/* <Image source={background} ></Image> */}
    <View style={{backgroundColor:'white',height:'100%'}}>
    <View style={{display:'flex',flexDirection:'row',margin:30,marginTop:50}} >

      <Image source={pfp} style={{resizeMode:'contain',width:50,height:50}} />
      <Text style={{fontSize:22,marginLeft:10,fontWeight:600}} >Welcome User</Text>
    </View>

    <View>
      <Text style={{margin:20,fontSize:22}}>Upcoming Appointments</Text>


      <View style={{backgroundColor:'#1F3B5B',height:150,width:300,borderRadius:10,margin:20}} >
        <Text style={{color:'white',margin:5}} >View Upcoming Appointments</Text>
        <Text style={{color:'white',margin:5}} >12/04/2023</Text>


        <TouchableOpacity style={{width:50,height:50,borderRadius:25,backgroundColor:'white',position:'absolute',right:10,bottom:10,}}>
          <View style={{alignItems:'center',marginTop:15}} >
       <Image source={rarrow} style={{resizeMode:'contain',width:20,height:20}} />
          </View>
     
        </TouchableOpacity>
      </View>
    </View>

    <View>
      <Text style={{fontSize:20,margin:20,fontWeight:600}}>Find a Practitioner</Text>

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
        { healthPrac !==[] && healthPrac.map((item) => (


        <View style={{backgroundColor:'#1F3B5B',margin:10,padding:20,borderRadius:10}}>
          <View style={{display:'flex',flexDirection:'row'}} >
        <Image source={pfp} style={{width:30,height:30}} />
        <View style={{display:'flex',flexDirection:'row'}}>
            <Text style={{marginLeft:10,color:'white'}}>{item.Name}</Text>
            <Text style={{marginLeft:5,color:'white'}}>{item.Surname}</Text> 
        </View>

          </View>

          <TouchableOpacity onPress={()=>navigation.navigate('appointment')} style={{backgroundColor:'white',margin:10,marginTop:20,width:180,padding:10,borderRadius:10}}>
            <Text style={{color:'black',textAlign:'center'}} >Book consultation</Text>
          </TouchableOpacity>
  {console.log('healthpraccccccccie',healthPrac)}
          </View>
      // <View style={{backgroundColor:'#E4E3E3',margin:10,padding:20,borderRadius:10}}>
      //       <View style={{display:'flex',flexDirection:'row'}}>
      //    <Text>{item.Name}</Text>    
      //       <Text>{item.Surname}</Text>
      //       </View>
   
      //       <Text>{item.Email}</Text>
      //     </View>
        ))}
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
    </View>
    </ImageBackground>
  )
}

export default UserDashBoard