import { View, Text,Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { pfp } from '../assets'
import { rarrow } from '../assets'

const UserDashBoard = ({navigation}) => {
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
    <View style={{backgroundColor:'white',height:'100%'}}>
    <View style={{display:'flex',flexDirection:'row',margin:30,marginTop:50}} >

      <Image source={pfp} style={{resizeMode:'contain',width:50,height:50}} />
      <Text style={{fontSize:22,marginLeft:10,fontWeight:600}} >Welcome User</Text>
    </View>

    <View>
      <Text style={{margin:20,fontSize:22}}>Upcoming Appointments</Text>


      <View style={{backgroundColor:'#082572',height:150,width:300,borderRadius:10,margin:20}} >
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
        <FlatList
    
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
  
          </View>
)
  

        }}
        />
      </View>
    </View>
    </View>
  )
}

export default UserDashBoard