import axios from 'axios';
import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function App (props) {
    const [dataUri, setDataUri] = useState('');
        function handleTakePhoto (dataUri) {
            setDataUri(dataUri);
            axios
                .post("http://192.168.41.35:8088/api/save/photo?file=" + dataUri + "&userId =" )
                .then(function(responce){
                    console.log(responce);
                    console.log(responce.data)
                })
                .catch(function(error){
                    console.log(error);
                    console.log(error.data);
                })
                console.log(dataUri);
                
        }

        function handleTakePhotoAnimationDone (dataUri) {
            // Do stuff with the photo...
            console.log('takePhoto');
        }

        function handleCameraError (error) {
            console.log('Error - ', error);
        }

        function handleCameraStart (stream) {
        }

        function handleCameraStop () {
        }

        return (
            <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
            onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
            onCameraError = { (error) => { handleCameraError(error); } }
            idealFacingMode = {FACING_MODES.ENVIRONMENT}
            idealResolution = {{width: 640, height: 480}}
            imageType = {IMAGE_TYPES.PNG}
            imageCompression = {0.97}
            isMaxResolution = {true}
            isImageMirror = {true}
            isSilentMode = {false}
            isDisplayStartCameraError = {true}
            isFullscreen = {false}
            sizeFactor = {1}
            onCameraStart = { (stream) => { handleCameraStart(stream); } }
            onCameraStop = { () => { handleCameraStop(); } }
            />
        );
        }

export default App;