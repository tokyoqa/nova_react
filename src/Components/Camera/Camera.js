import axios from 'axios';
import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useNavigate } from "react-router";
import '../../Config';
import { Backdrop, CircularProgress, Button } from '@mui/material';




const  CameraJS = ({id}) => {
    let navigate = useNavigate();
    const [dataUri, setDataUri] = useState('');
    const [open, setOpen] = React.useState(false); 


    
    

        function handleTakePhoto (dataUri) {
            setDataUri(dataUri);
           
            
            axios({
                method: 'POST',
                url: global.config.REST_API + 'api/selfie',
                data:{ 
                    base64: dataUri,
                    id: id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Methods': '*',
                    "Access-Control-Allow-Origin": "https://ident.ab.kg:9443/",
                    mode: 'no-cors'
                },
            })
                .then(function(responce){       
                    console.log(responce);
                    console.log(responce.data.message);
                    setOpen(false); 
                    navigate('/Terms');
                })
                .catch(error =>{
                    if (error.responce){
                        console.log(error.response.status);
                    }
                    else {
                        console.log(error.message);
                    }
                })
                    setOpen(!open); 

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
            <Backdrop 
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
                open={open} 
             > 
            <CircularProgress color="inherit" /> 
            </Backdrop> 
            </div>
        );
        }

export default CameraJS;
