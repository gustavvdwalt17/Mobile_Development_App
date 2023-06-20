// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import DocumentScanner from 'react-native-document-scanner';

// const Scanner = () => {
//   const [scannedImage, setScannedImage] = useState(null);

//   const handleDocumentScan = ({ croppedImage }) => {
//     setScannedImage(croppedImage);
//   };

//   return (
//     <View>
//       <DocumentScanner
//         onPictureTaken={handleDocumentScan}
//         overlayColor="rgba(255, 255, 255, 0.7)"
//       />
//       {scannedImage && <Image source={{ uri: scannedImage }} style={{ width: 200, height: 200 }} />}
//     </View>
//   );
// };

// export default Scanner;