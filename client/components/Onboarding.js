import { View, Text,FlatList,Animated,StyleSheet } from 'react-native'
import React from 'react'
import slide from '../slide.js'
import Paginator from './Paginator.js'
import OnboardingItem from './OnboardingItem'
import { useState,useRef } from 'react'
const Onboarding = ({navigation}) => {
  const [currentIndex,setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <View style={styles.container}  >
      <View style={{flex:3}} >
<Animated.FlatList 
data={slide}

renderItem={({item}) => <OnboardingItem item={item} navigation={navigation}


/>

}
horizontal
// showsVerticalScrollIndicator
pagingEnabled
showsHorizontalScrollIndicator={false}
bounces={false}
keyExtractor={(item)=>item.id}
onScroll={
Animated.event(
  [
    {
      nativeEvent:{
        contentOffset:{
          x:scrollX
        }
      }
    }
  ],{
    useNativeDriver:false
  }
)

}
/>
</View>

<Paginator data={slide} scrollX={scrollX} />
    </View>
  )
}

export default Onboarding


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
