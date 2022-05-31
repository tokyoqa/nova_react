// import React, { useEffect, useRef, useState } from "react";
// import { useRecordWebcam } from 'react-record-webcam'
// // import MediaStreamRecorder from "react-media-recorder";


// export default function RecordVideo(props) {
//    const [checked, setChecked] = useState(false);
//    const options = {width: 500, height: 300};
// //   recordingLength: 5, 
//    const recordWebcam = useRecordWebcam(options);

   
// const saveFile = async () => {
//   const videoBlob = await recordWebcam.getRecording();
//   console.log(videoBlob); 
// };

// const stopVideo = async () => { 
// const record = () =>{
//    recordWebcam.stop();   
//  } 
//  console.log("stop video"); 
//     // console.log(blob); 
//  record()
//  saveFile()
//     };

// return (
//     <div>
//       <p>Camera status: {recordWebcam.status}</p>
//       {/* <button onClick={recordWebcam.open}>Open camera</button> */}
//    <button onClick={recordWebcam.start}>Record camera</button>
//    {/* <button onClick={recordWebcam.open}>Open camera</button> */}
//       <button onClick={recordWebcam.start}>Start recording</button>
//       {/* <button onClick={recordWebcam.stop}>Stop recording</button> */}
//       {/* <button onClick={recordWebcam.retake}>Retake recording</button>
//       <button onClick={recordWebcam.stop, saveFile}>Download recording</button>  */}
//       <button onClick={stopVideo}>Save file to server</button>
//       <video className="vid__container" ref={recordWebcam.webcamRef} autoPlay muted />
//       <video className="vid__preview "ref={recordWebcam.previewRef} autoPlay muted loop />
//     </div>
 
//   )
// }


import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import {Backdrop, CircularProgress, Stack, Snackbar, Button} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router";
// import {useEffect } from 'react';
import '../../Config';
import axios from 'axios';
import './Camera.css'

const  CameraJS = ({id, setSecretWord}) => {
  let navigate = useNavigate();
  const [dataUri, setDataUri] = useState('');
  const [open, setOpen] = React.useState(false); 
  const [openSuccess, setSuccess] = React.useState(false);
  const [openError, setError] = React.useState(false)
  const [openError04, setError04] = React.useState(false)
  const [openWarning, setWarning] = React.useState(false)
  const [openInfo, setInfo] = React.useState(false)

    // useEffect(() => {
    //     if(!id){
    //       navigate('/')
    //     }
    //   });

function handleTakePhoto (dataUri) {
  setDataUri(dataUri)  
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

const sendPhoto = () => {
  if(!dataUri){
    setError(true)
}
else{
setError(false)
setOpen(true)
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
        mode: 'no-cors'
    },
})
.then((res) => {
  setSecretWord(res.data.secretWord)
  console.log(res.data.secretWord)
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

const isFullscreen = false
const ImagePreview = ({ dataUri, isFullscreen }) => {
    let classNameFullscreen = isFullscreen ? 'demo-image-preview-fullscreen' : '';
  
    return (
      <div className={'demo-image-preview ' + classNameFullscreen}>
        <img src={dataUri} alt=""/> 
      </div>
    );
  };

const resetPhoto = () =>{
  setDataUri(null)
}
      
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
  
return (
  <div>
    {
      (dataUri)
        ?<ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
        />
        :<Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
          idealFacingMode={FACING_MODES.USER}
          onTakePhoto = {(dataUri) => { handleTakePhoto(dataUri); } }
          onCameraError = { (error) => { handleCameraError(error); } }
          idealResolution = {{width: 300, height: 300}}
          imageType = {IMAGE_TYPES.PNG}
          imageCompression = {0.97}
          isMaxResolution = {true}
          isImageMirror = {true}
          isSilentMode = {false}
          isDisplayStartCameraError = {true}
          sizeFactor = {1}
          onCameraStart = { (stream) => { handleCameraStart(stream); } }
          onCameraStop = { () => { handleCameraStop(); } }
        />
    }
  
  <div className='photo-send-btn'>
    <Button variant="contained" color="success" onClick={sendPhoto} >
      Отправить
    </Button>
  </div>
  <div className="photo-reset-btn">
    <Button variant="contained" color="success" onClick={resetPhoto} >
      Reset photo
    </Button>
  </div> 
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
