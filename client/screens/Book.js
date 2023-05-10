import { View, Text,Image,SafeAreaView, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { pfp } from '../assets'
const Book = () => {

    const times = ["8:00","10:00","13:00"]
    const [color,setColor] = useState('#466CA7')
    const changeColor = ()=>{
      console.log('chang')
    }
  return (
    <SafeAreaView style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:50}} >
 <View style={{display:'flex',flexDirection:'row',backgroundColor:'#466CA7',padding:30,borderRadius:10,width:300}}>
<Image source={pfp} style={{width:50,height:50}} />

 <View style={{display:'flex',flexDirection:'column',margin:10,marginTop:0}} >
    <Text style={{color:'white'}}>Dr. Martyn Vyl</Text>
<Text  style={{color:'white'}}>Chiropracter</Text>
<Text style={{color:'white',width:150}} > Dr. Martyn Vyl is a chiropracter and is very good at his job</Text>
</View>

 </View>


<View>
    <Text>Choose Date</Text>


</View>


    <Text>Choose Time</Text>
 <View style={{display:'flex',flexDirection:'row'}} >
    {times.map((time)=>{
      return (
   
         
         <TouchableOpacity onPress={()=>changeColor()} style={{margin:10,width:50,height:40,backgroundColor:'#466CA7'}}>

                 <Text  style={{color:'white',textAlign:'center',marginTop:10}}  >{time}</Text>
         </TouchableOpacity >
   


   
      
      )
    })}

</View>
    </SafeAreaView>
  )
}

export default Book