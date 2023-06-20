import { View, Text,FlatList,StyleSheet, TouchableOpacity,Image,ImageBackground } from 'react-native'
import React from 'react'
import { pfp } from '../../assets';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { currHealthIdApp, theHealthName } from '../../slices/allState';
const ViewAllPracs = ({navigation}) => {
  const dispatch = useDispatch()
const allPracs = useSelector((state) => state.loginSt.allPracs)
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
<View style={{marginTop:35}} >


        <Text style={{marginLeft:10,fontSize:22,fontWeight:500,color:'white'}}>All Health Practitioners.</Text>
      <FlatList
        data={allPracs}
        renderItem={renderRow}
        keyExtractor={(item) => item.HealthPracID}
        numColumns={2}
        // Set the maximum number of rows you want to display
        // by multiplying the number of columns with the desired number of rows
        // In this example, it will display up to 3 rows
        maxToRenderPerBatch={2 * final}
      />
      </View>
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
   marginTop: 15,
   marginLeft: 15

  },
    backgroundImage: {
    flex: 1,

    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
});

export default ViewAllPracs;