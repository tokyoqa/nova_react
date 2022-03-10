import axios from 'axios';
import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App (props) {
  const [dataUri, setDataUri] = useState('');

  
  function handleTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    setDataUri(dataUri);
    axios
        .post("http://127.0.0.1:5000/?", dataUri)
        .then(function(responce){
            console.log(responce);
            console.log(responce.data)
        })
        .catch(function(error){
            console.log(error);
            console.log(error.data)
        })
  }

  return (
    <div>
        <Camera 
            onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
            isFullscreen={false}
        />
    </div>
  );
}

export default App;