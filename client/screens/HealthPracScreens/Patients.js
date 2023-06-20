import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking,Image } from 'react-native';
import axios from 'axios';
import { pdf } from '../../assets';
import IP_ADDRESS from '../ipadress'
import { v4 as uuidv4 } from 'uuid';
const Patients = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}/files`);
      setFiles(response.data);
      console.log(response.data)
    } catch (error) {
      console.log('Error fetching files:', error);
    }
  };

  const handleDownload = (filename) => {
    const fileUrl = `http://10.0.0.5:3001/download/${filename}`;
    Linking.openURL(fileUrl)
      .then(() => {
        console.log('File download initiated');
      })
      .catch((error) => {
        console.log('Error opening file:', error);
      });
  };

  return (
    <View>

        <View style={{backgroundColor:'#1F3B5B',marginTop:40,marginLeft:10,width:300,borderRadius:10,padding:10}} >
            <Text style={{color:'white'}} >Patient: Piet Pompies</Text>
            <Text  style={{color:'white'}}>Number: 029 128 3821</Text>
        </View>
      <Text>User Documents:</Text>
      {console.log(files)}
{files.map((filename) => (
  <View key={filename}>
    <Image style={{ resizeMode: 'contain', width: 50, height: 50 }} source={pdf} />
    <TouchableOpacity onPress={() => handleDownload(filename)}>
      <Text>{filename}</Text>
    </TouchableOpacity>
  </View>
))}

      {/* <View><Text>Uploaddddddddddddddddddd</Text></View> */}
    </View>
  );
};

export default Patients;