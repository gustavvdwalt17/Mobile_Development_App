
import React, { useState } from "react"







const theTimeUse =['']
const theBookedTimes=['']
// const [finalres,setFinalRes]=useState(null)
export const getFinalres= ()=>{
  const flattenedArray1 = theTimeUse.flat()
  const flattenedArray2 = theBookedTimes.flat()
  //flat 1 is the schedule, flat 2 is the appointmets
  console.log('flattenedArray1',flattenedArray1,'flattenedArray2',flattenedArray2)


const combinedArray = flattenedArray1.concat(flattenedArray2)

// Create a Set to store unique times and an array for the result
const uniqueTimesSet = new Set();
const result = [];
// Step 4: Iterate over the combined array
for (const time of flattenedArray1) {
  console.log('curentlloopp',time)
  // Check if the time is already in the Set
  if (!flattenedArray2.includes(time)) {
    // Add the time to the Set and result array
    uniqueTimesSet.add(time);
    result.push(time);
  }
}
// setFinalRes(result)
return result

}

export function addNum(a,b){
    return a+b
}