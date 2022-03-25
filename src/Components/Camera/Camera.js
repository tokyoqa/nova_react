import axios from 'axios';
import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useNavigate } from "react-router";
import '../../Config';


const  CameraJS = ({id}) => {
    let navigate = useNavigate();
    const [dataUri, setDataUri] = useState('');

        function handleTakePhoto (dataUri) {
            setDataUri(dataUri);
            const config = {
                base64: dataUri,
                id: id
            }
            
            axios
                .post(global.config.REST_API + 'api/selfie', config )
                .then(function(responce){
                    console.log(responce);
                    console.log(responce.data);
                    navigate('/Terms');
                })
                .catch(function(error){ 
                    console.log(error);
                    console.log(error.data);
                })
                console.log(dataUri)
                
        }

        function handleTakePhotoAnimationDone (dataUri) {
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
            <div>
            <Camera
            idealFacingMode={FACING_MODES.USER}
            onTakePhoto = {(dataUri) => { handleTakePhoto(dataUri); } }
            onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
            onCameraError = { (error) => { handleCameraError(error); } }
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
                {/* <button onClick={handleTakePhoto} >Send files to Nurdinus</button> */}
            </div>
        );
        }

export default CameraJS;





