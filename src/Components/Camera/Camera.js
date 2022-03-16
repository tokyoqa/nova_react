// import axios from 'axios';
// import React, { useState } from 'react';
// import Camera from 'react-html5-camera-photo';
// import 'react-html5-camera-photo/build/css/index.css';

// function App (props) {
//   const [dataUri, setDataUri] = useState('');
//   let userId = 1
  
//   function handleTakePhotoAnimationDone (dataUri) {
//     console.log(dataUri)
//     setDataUri(dataUri);
//     axios
//         .post("http://192.168.41.35:8088/api/save/photo?file=" + dataUri + "&userId =" + userId)
//         .then(function(responce){
//             console.log(responce);
//             console.log(responce.data)
//         })
//         .catch(function(error){
//             console.log(error);
//             console.log(error.data);
//         })
//   }

//   return (
//     <div>
//         <Camera 
//             onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
//             isFullscreen={false}
//         />
//     </div>
//   );
// }

// export default App;