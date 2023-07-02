import { View, Text,FlatList,StyleSheet, TouchableOpacity,Image,ImageBackground, TextInput ,ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { pfp } from '../../assets';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { currHealthIdApp, theHealthName } from '../../slices/allState';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewAllPracs = ({navigation}) => {
  const dispatch = useDispatch()
// const allPracs = useSelector((state) => state.loginSt.allPracs)
  const allPracs = useSelector((state) => {

    return state.loginSt.allPracs;
  });
const copyPracs = allPracs
const [thePracs,setThepracs] = useState(allPracs)
const [searchedValue,setSearchedValue] = useState('')
  useEffect(()=>{
 searchUser()
  },[searchedValue])

let total = 0
allPracs.forEach((item)=>{
total +=1
})

let final = Math.ceil(total /2)

  const navApp = (id,name) =>{
  dispatch(currHealthIdApp(id))
  dispatch(theHealthName(name))

  navigation.navigate('appointment')
  }

  const searchUser = () => {
// console.log(allPracs,'praccel')


const newValues = allPracs?.filter(item => item.Name.toLowerCase().includes(searchedValue.toLocaleLowerCase()))

if (newValues.length<1){
  const newValues = allPracs?.filter(item => item.Specialty.toLowerCase().includes(searchedValue.toLocaleLowerCase()))
setThepracs(newValues)
}else{
setThepracs(newValues)
}
// const newValues = allPracs?.filter(item => item.Name.toLowerCase().includes(searchedValue.toLowerCase()))



  }
  const renderRow = ({ item }) => (
    <View style={styles.row}>
        <View style={{display:'flex',flexDirection:'row'}} >
            <View>
    <Image source={pfp} style={{width:50,height:50,borderRadius:25,marginTop:10}} ></Image>
            </View>
    <View>

    <Text style={styles.title}>{item.Name}</Text>
 


    </View>
    
  
        </View>
           <Text style={{marginLeft:10,marginTop:5}} >Specialty: {item.Specialty}</Text>
      <TouchableOpacity onPress={()=>navApp(item.HealthPracID,item.Name)}  style={{marginTop:50,backgroundColor:'#1F3B5B',padding:10,borderRadius:10}} >
        <Text style={{color:'white'}} >Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
      <ImageBackground 

       source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
>
<ScrollView 
// stickyHeaderIndices={[1]}
style={{marginTop:35}} >


    
    <Text style={{marginLeft:10,fontSize:22,fontWeight:500,color:'white'}}>All Health Practitioners.</Text>    
     <View style={{display:'flex',flexDirection:'row'}} >
 
<TextInput onChangeText={value=>setSearchedValue(value)} placeholder='search'  placeholderTextColor="#c0c0c0"   style={styles.input} ></TextInput>
       
       {/* <TouchableOpacity onPress={()=>searchUser()} style={{marginLeft:5,marginTop:20}} >
   <Icon name="search" size={20} color="white"  />
       </TouchableOpacity> */}
    

     </View>

    <Text style={{color:'silver',marginLeft:10}} >Search by name or speciality...</Text>  
      <FlatList
   
        data={searchedValue === '' ? allPracs : thePracs}
        renderItem={renderRow}
        keyExtractor={(item) => item.HealthPracID}
        numColumns={2}
        // Set the maximum number of rows you want to display
        // by multiplying the number of columns with the desired number of rows
        // In this example, it will display up to 3 rows
        maxToRenderPerBatch={2 * final}
      />


      </ScrollView>

     </ImageBackground>

  );
};

const styles = StyleSheet.create({

  row: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
    backgroundColor:'#CCCCCC',
    borderRadius:10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginTop: 15
  },
  title: {
    fontSize: 16,
    color:'black',
   marginTop:20,
   marginLeft: 10,

  },
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
       marginLeft:10,
       marginTop:10,
   
  },
});

export default ViewAllPracs;