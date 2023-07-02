import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import IP_ADDRESS from '../ipadress';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';

const RegisterSc3 = ({ navigation }) => {
 const { isUser } = useSelector((state) => state.loginSt);
  const registerData = useSelector((state) => state.loginSt.registerData);

  const [formData, setFormData] = useState({
    name:'',
    surname:'',
    dob:''
  });
console.log('form',formData)
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [newSelectedDate, setnewSelectedDate] = useState(new Date());
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedewDate, setSelectednewDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
   const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setSelectednewDate(date.toLocaleDateString())

          setFormData((prevFormData) => ({
      ...prevFormData,
      'dob':date.toLocaleDateString(),
    }));
       setShowDatePicker(false);
    }
    setShowDatePicker(false);
  };

  const showDatePickerModal = () => {
     if (!showDatePicker) {
    setShowDatePicker(true);
  }
   
  };
//   const handleDateChange = (event, date) => {
//     if (date) {
//       console.log('ye')
//       setSelectedDate(date);
//       setnewSelectedDate(date.split('T')[0]);
     
//     console.log("ye again")
//      handleInputChange('dob', null, date);
//     }
//  setShowDatePicker(false);
//   setShowDateTimePicker(false);
//   };

//   const showDatePickerModal = () => {
//   setShowDateTimePicker(true);
//   };

  useEffect(() => {
    setFormData(registerData);
  }, [registerData]);

  const handlePress = async () => {
   console.log(formData)


const dateToday = new Date()
const dateSelected = new Date(selectedDate)
console.log(dateToday,dateSelected)
const ageDiff = dateToday - dateSelected
console.log(ageDiff)
const age = ageDiff / (1000 * 60 * 60 * 24 * 365.25);
console.log(age)

if (age < 18){
  console.log('not')
  handleAlerts('Must be Older than 18 to Register')
  return
}
   console.log(formData.name,formData.surname,formData.dob,'gay')
    if (formData.name === '' || formData.name===null ||  formData.surname === '' || formData.surname === null || formData.dob === '' || formData.dob === null) {
       console.log('presssan')
      alert('Please enter all fields');
      return;
    }
    console.log('skipped')
    try {
      const response = await axios.post(`http://${IP_ADDRESS}/verify/register`, formData);
      console.log(response.data.userId, 'dataaaaaaaaaaaaaaaaa');

      navigation.navigate('Login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('An error occurred');
      }
    }
  };

  const handleAlerts = (msg) => {
    Alert.alert('Error', msg, [
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
  };

  const handleInputChange = (fieldName, value, date = null) => {
    // if (date !== null) {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     [fieldName]: date.toLocaleDateString(),
    //   }));
    //   return;
    // }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };
  console.log(formData)
  // const closePicker = () => {
  //   console.log('hii')
  //   setShowDateTimePicker(false)
  //   console.log(showDateTimePicker,'asdasd')
  // }

  return (
    <View style={{ backgroundColor: '#D8EAEF', height: '100%' }}>
      <View style={{ margin: 20, marginTop: 40 }}>
        <Text style={{ fontSize: 18 }}>{isUser ? <Text>Step 3 of 3</Text> : <Text>Step 3 of 4</Text>}</Text>
      </View>

      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: '800' }}>Personal Info</Text>
      </View>
      <View style={{ margin: 20, marginTop: 5 }}>
        <Text>All your information will be securely stored. We will not share your information with people outside our company.</Text>
      </View>

      <View>
        <Text style={{ color: 'silver', margin: 10, marginTop: 2 }}>Name</Text>
        <TextInput onChangeText={(value) => handleInputChange('name', value)} style={{ backgroundColor: 'white', width: 250, height: 50, borderRadius: 10, margin: 10, marginTop: 2, marginTop: 5 }} />

        <Text style={{ color: 'silver', margin: 10, marginTop: 2 }}>Surname</Text>
        <TextInput onChangeText={(value) => handleInputChange('surname', value)} style={{ backgroundColor: 'white', width: 250, height: 50, borderRadius: 10, margin: 10, marginTop: 2, marginTop: 5 }} />

        <Text style={{ color: 'silver', margin: 10, marginTop: 2 }}>DOB</Text>

   <TouchableOpacity style={{ marginLeft: 10, marginTop: 5 }} onPress={()=>showDatePickerModal()}>
        <Ionicons name="calendar" size={34} color="white" />
      </TouchableOpacity>
{showDatePicker && (
  <DateTimePicker
    value={selectedDate || new Date()}
    mode="date"
    display="default"
    onChange={handleDateChange}
  />
)}
      {selectedDate && (
        <Text onChangeText={(value) => handleInputChange('date', value)} >Selected Date: {selectedewDate}</Text>
      )}
     
      </View>

      <View style={{ display: 'flex', alignItems: 'center', marginTop: 50 }}>
        <TouchableOpacity onPress={handlePress} style={{ backgroundColor: '#375169', width: 150, height: 50, borderRadius: 20 }}>
          <Text style={{ marginTop: 15, color: 'white', textAlign: 'center' }}>{isUser ? <Text>Register</Text> : <Text>Next</Text>}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        {/* <Text onPress={()=>navigation.navigate('Login')} >Already have an Account? Log in</Text> */}
      </View>
    </View>
  );
};

export default RegisterSc3;