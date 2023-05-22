import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const Document = () => {
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    const fetchRep = await fetch(result.uri)
    // const blob = await fetchRep.blob()
    console.log('blob',blob)
    console.log(result.uri);
    console.log(result);
  };

  return (
    <View style={styles.background}>

      <Text>Upload Documents</Text>
      {/* <Text style={styles.file}>Upload CSV File</Text> */}
      <View style={styles.button}>
        <TouchableOpacity>
          <Button
            title="upload your file"
            color="black"
            onPress={pickDocument}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
//https://stackoverflow.com/questions/66967900/expo-document-picker-is-not-displaying-to-upload-a-file
const styles = StyleSheet.create({
  background: {
    marginTop: 100,
 },
  file: {
    color: "black",
    marginHorizontal: 145,
  },
  button: {
    marginHorizontal: 60,
  },
});

export default Document;