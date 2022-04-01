import axios from 'axios';
import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useNavigate } from "react-router";
import '../../Config';
import {Backdrop, CircularProgress, Stack, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useEffect } from 'react';


const  CameraJS = ({id}) => {
    let navigate = useNavigate();
    const [dataUri, setDataUri] = useState('');
    const [open, setOpen] = React.useState(false); 
    const [openSuccess, setSuccess] = React.useState(false);
    const [openError, setError] = React.useState(false)
    const [openError04, setError04] = React.useState(false)
    const [openWarning, setWarning] = React.useState(false)
    const [openInfo, setInfo] = React.useState(false)
  
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    useEffect(() => {
        if(!id){
          navigate('/')
        }
      });

        function handleTakePhoto (dataUri) {
            if(!dataUri){
                setError(true)
            }
            else{
                setDataUri(dataUri);
                setOpen(true)
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
                        mode: 'no-cors'
                    },
                })
                .then((res) => {
                    if (res.data.statusCode === 1){
                        console.log(res.data)
                        setError(true)
                        setOpen(false)
                    }
                    else if(res.data.statusCode === 2){
                      console.log(res.data)
                      setError(true)
                      setOpen(false)
                    }
                    else if(res.data.statusCode === 3){
                      console.log(res.data)
                      setWarning(true)
                      setOpen(false)

                    }
                    else if(res.data.statusCode === 4){
                      console.log(res.data)
                      setError04(true)
                      setOpen(false)
                    }
                    else{
                    setOpen(false); 
                    navigate('/terms')
                    console.log(res.data)
                    }
                  })
                    .catch(error =>{
                        setError(true);
                        setOpen(false);
                        console.log(error)
                    })
    
            }
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

        
        const closeSucces = (event, reason) => {
            if (reason === 'clickaway') {
            return;
            }
            setSuccess(false);
        };
        
        const closeError = (event, reason) => {
            if (reason === 'clickaway') {
            return;
            }
            setError(false);
            setError04(false)
        };
        
        const closeWarning = (event, reason) => {
            if (reason === 'clickaway') {
            return;
            }
            setWarning(false);
        };
        
        const closeInfo = (event, reason) => {
            if (reason === 'clickaway') {
            return;
            }
            setInfo(false);
        };
        
        
        

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

            <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeSucces}>
                <Alert onClose={closeSucces} severity="success" sx={{ width: '100%' }}>
                This is a openSuccess message!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
                <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
                Ошибка! Повторите заново!
                </Alert>
            </Snackbar>

            <Snackbar open={openError04} autoHideDuration={6000} onClose={closeError}>
                <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
                Ошибка! Такой пользователей существует!
                </Alert>
            </Snackbar>

            <Snackbar open={openWarning} autoHideDuration={6000} onClose={closeWarning}>
                <Alert onClose={closeWarning} severity="warning" sx={{ width: '100%' }}>
                Пожалуйста ожидайте!
                </Alert>
            </Snackbar>

            <Snackbar open={openInfo} autoHideDuration={6000} onClose={closeInfo}>
                <Alert onClose={closeInfo} severity="info" sx={{ width: '100%' }}>
                This is a info message!
                </Alert>
            </Snackbar>
            </Stack>
            </div>
        );
        }

export default CameraJS;
