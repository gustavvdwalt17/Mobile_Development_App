import { View, Text,StyleSheet,Animated,useWindowDimensions } from 'react-native'
import React from 'react'

const Paginator = ({data,scrollX}) => {
const {width} = useWindowDimensions()

  return (
    <View style={{flexDirection:'row',height:64,justifyContent:'center'}} >


            {data.map((_,i) => {
              console.log(i)
        const inputRange = [(i-1)*width,i*width,(i+1) *width]

            const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange:[20,30,20],
        extrapolate:'clamp'
    })



     return(<Animated.View style={[styles.dot ,{width:dotWidth}]} key={i.toString()}  />
 
     )

 
    })}
   </View>
  )
}

export default Paginator

const styles = StyleSheet.create({

    dot:{
   
    height:10,
    borderRadius:5,
    backgroundColor:'#493d8a',
    marginHorizontal:8    
    }
})