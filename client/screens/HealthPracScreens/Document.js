import React,{useState,useEffect} from 'react';
import { pdf } from '../../assets';
import { Button, View,Text,Image,TouchableOpacity,StyleSheet,ImageBackground } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { pfp } from '../../assets';
import IP_ADDRESS from '../ipadress'
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';
const Document = () => {
      const patientId = useSelector((state) => state.loginSt.patientId)
  const [rep,setRep] = useState(null)
   const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);
  useEffect(() => {
    fetchFiles();
  }, [rep]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://${IP_ADDRESS}/files/${patientId}`);
      setFiles(response.data);
      console.log(response.data)
    } catch (error) {
      console.log('Error fetching files:', error);
    }
  };

  const handleDownload = (filename) => {
    const fileUrl = `http://${IP_ADDRESS}/download/${filename}`;
    Linking.openURL(fileUrl)
      .then(() => {
        console.log('File download initiated');
      })
      .catch((error) => {
        console.log('Error opening file:', error);
      });
  };
  const pickDocument = async (id) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      // Document selected, send it to the backend
      uploadDocument(result,id);
    }
  } catch (error) {
    console.error('Error selecting document: ', error);
  }
};
const uploadDocument = async (documentUri,userId) => {
  try {
    const formData = new FormData();
console.log('typeeeeeeeeee',documentUri.mimeType)
console.log('typeeeeeeeeee',documentUri.mimeType)
    formData.append('document', {
   
      uri: documentUri.uri,
      name: documentUri.name, // Set the desired filename
      type: documentUri.mimeType, // Set the document type
    });
    
    console.log(formData._parts)
    const fileObject = formData._parts[0][1]; // Access the file object
// console.log(fileObject);
formData.append('userId',userId)
    const response = await axios.post(`http://${IP_ADDRESS}/upload`,formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('de res',response.message)
        setRep(response.message)

    console.log('Document uploaded successfully');
  } catch (error) {
    console.error('Error uploading document: ', error);
  }
};
  return (
   

       
        <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >
        
    <View

style={{backgroundColor:'#1F3B5B',marginTop:40,marginLeft:10,width:300,borderRadius:10,padding:10}} 

> 

         
         <View>
          <Image source={pfp} style={{height:50,width:50,borderRadius:25}} ></Image>
         </View>
            <Text style={{color:'white'}} >Patient: Piet Pompies</Text>
            <Text  style={{color:'white'}}>Number: 029 128 3821</Text>
        </View>
      <Text style={{marginLeft:10,marginBottom:10,color:'white',marginTop:10,fontSize:22}}>User Documents:</Text>
    
   
      { files.length!==0 ? files?.map((filename, index) => (
        <>
     <View key={filename} style={{marginLeft:10,marginTop:15}}>
     <Image style={{resizeMode:'contain',width:50,height:50,borderRadius:25}} source={pdf} ></Image>
        <TouchableOpacity key={index} onPress={() => handleDownload(filename)}>
          <Text style={{color:'white'}} >{filename}</Text>
        </TouchableOpacity>
      </View>
      </>
       )):(
       <View>
<Text style={{marginLeft:10,color:'white'}} >User has no files or documents uploaded.</Text>
        
       </View>
       
 )}
      <View style={{alignItems:'center'}} >

     
      <TouchableOpacity onPress={()=>pickDocument(patientId)} style={{marginTop:10,alignItems:'center',width:250,backgroundColor:'#1F3B5B',padding:10,borderRadius:10}} >


        <Text style={{color:'white'}} >Upload</Text>
 {/* <Button title="Upload Document" onPress={pickDocument} /> */}

      </TouchableOpacity>
{/* {rep !== null && <Text style={{color:'white'}} >{rep}</Text>} */}
       </View>
    
</ImageBackground>


      


    
  );
};

export default Document;
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: '100%',width: '100%',
    resizeMode: 'cover', // Adjust the image size to cover the entire background
  },
});