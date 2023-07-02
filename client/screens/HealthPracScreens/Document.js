import React,{useState,useEffect} from 'react';
import { pdf } from '../../assets';
import { Button,ScrollView, View,Text,Image,TouchableOpacity,StyleSheet,ImageBackground,ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import { pfp } from '../../assets';
import IP_ADDRESS from '../ipadress'
import { Linking } from 'react-native';
import { trash } from '../../assets';
import { pngg } from '../../assets';
import { daNewDoc } from '../../assets';
import { useSelector } from 'react-redux';
const Document = () => {
      const patientId = useSelector((state) => state.loginSt.patientId)
      const dataInformation = useSelector((state) => state.loginSt.dataObjInfo)
  const [rep,setRep] = useState('')
   const [files, setFiles] = useState([]);
     const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchFiles();
  }, []);
  
  
  
//   useEffect(() => {
//     setTimeout(()=>{
//       console.log('running werido')
//  fetchFiles();
//     },2000)
   
//   }, [rep]);

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
  // setIsLoading(true);
  console.log('hi')
  console.log('uploadinggggggggggggggggggggg')
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
console.log('gogo')
const response = await axios.create({ baseURL: `http://${IP_ADDRESS}`, headers: { 'Content-Type': 'multipart/form-data' } }).post('/upload', formData);
    // const response = await axios.post(`http://${IP_ADDRESS}/upload`,formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    console.log('yay')
if (response.status === 200) {
  // File uploaded and renamed successfully
    console.log('yay2')
    alert('Document uploaded successfully');
  console.log(response.data.message);
  setRep(response.data.message);
   fetchFiles();
    // setIsLoading(false);
} else {
  // Failed to rename the file
  console.error('Error renaming file:', response.data.error);
    // setIsLoading(false);
}

    alert('Document uploaded successfully');
  } catch (error) {
    console.error('Error uploading document: ', error);
    alert('Error uploading document')
      // setIsLoading(false);
  }

  console.log('Nothing happened')
  // finally{
  //     setIsLoading(false);
  // }
};

const handleDeleteDoc = async (name) =>{
  console.log(name)
    try {
      const response = await axios.delete(`http://${IP_ADDRESS}/filesDelete/${name}`);
  alert(response.data.message);
    fetchFiles()

    } catch (error) {
        alert(response.message);
    }
}
  return (
   

       
        <ImageBackground 
           source={require('../../assets/phone7.jpg')}
    style={styles.backgroundImage}
  >
 <ScrollView>
    
    <View

style={{backgroundColor:'#1F3B5B',marginTop:40,marginLeft:10,width:300,borderRadius:10,padding:10}} 

> 


         
         <View style={{display:'flex',flexDirection:'row'}}  >
    
          <Image source={pfp} style={{height:50,width:50,borderRadius:25}} ></Image>      

        
  
    
       
         <View style={{display:'flex',flexDirection:'column',marginLeft:10}} >
     <Text style={{color:'white'}} >Patient: {dataInformation.name}</Text>
            <Text  style={{color:'white'}}>Email: {dataInformation.email}</Text>
            <Text  style={{color:'white'}}>DOB: {dataInformation.dob.split('T')[0]}</Text>
         </View>
         </View>
        </View>
      <Text style={{marginLeft:10,marginBottom:10,color:'white',marginTop:10,fontSize:22}}>User Documents:</Text>
    
    {console.log(files,'filessssss')}
      { files.length!==0 ? files?.map((filename, index) => (
        <View key={filename} >
     <View  style={{marginLeft:10,marginTop:15,backgroundColor:'#1F3B5B',borderRadius:10}}>
      <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
             <Image style={{resizeMode:'contain',width:60,height:60,borderRadius:5 }} source={

      filename.split('.')[1] === 'jpeg'
  ? pngg
  
  : filename.split('.')[1] === 'png'
  ?  pngg
  : filename.split('.')[1] === 'pdf'
  ? pdf
  :      filename.split('.')[1] === 'jpg'
  ? pngg
  : daNewDoc
     }
      ></Image>
      <TouchableOpacity onPress={()=>handleDeleteDoc(filename)} >
<Image source={trash}  style={{height:30,width:30,borderRadius:15,margin:10}}></Image> 
      </TouchableOpacity>
           
      </View>

        <TouchableOpacity key={index} onPress={() => handleDownload(filename)}>

          
          <Text style={{color:'white'}} >{filename}</Text>
        </TouchableOpacity>
      </View>
      </View>
       )):(
       <View>
<Text style={{marginLeft:10,color:'white'}} >User has no files or documents uploaded.</Text>
        
       </View>
       
 )}
      <View style={{alignItems:'center'}} >

      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
     <TouchableOpacity onPress={()=>pickDocument(patientId)} style={{marginTop:10,alignItems:'center',width:250,backgroundColor:'#1F3B5B',padding:10,borderRadius:10,marginBottom:20}} >


        <Text style={{color:'white'}} >Upload</Text>


 {/* <Button title="Upload Document" onPress={pickDocument} /> */}

      </TouchableOpacity>
      )}
    
{/* {rep !== null && <Text style={{color:'white'}} >{rep}</Text>} */}
       </View>
      </ScrollView>   
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