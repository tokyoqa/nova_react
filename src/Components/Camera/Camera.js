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
                
            }
            
            axios({
                method: 'POST',
                url: global.config.REST_API + 'api/selfie',
                data:{ 
                    base64: dataUri,
                    id: id
                },
                headers: {
                  'Access-Control-Allow-Headers': '*',
                  'Access-Control-Allow-Methods': '*',
                },
                mode: 'no-cors',
      
            })
                .then(function(responce){
                    console.log(responce);
                    console.log(responce.data);
                    navigate('/Terms');
                })
                .catch(error =>{
                    if (error.responce){
                        console.log(error.response.status);
                    }
                    else if(error.request){
                        console.log(error.request);
                    }
                    else {
                        console.log(error.message);
                    }
                })
        }

        function handleTakePhotoAnimationDone (dataUri) {
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





