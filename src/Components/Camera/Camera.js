import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import {Backdrop, CircularProgress, Stack, Snackbar, Button} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router";
import {useEffect } from 'react';
import '../../Config';
import axios from 'axios';
import './Camera.css'

const  CameraJS = ({id, setSecretWord}) => {
  let navigate = useNavigate();
  const [dataUri, setDataUri] = useState('');
  const [open, setOpen] = React.useState(false); 
  const [openError, setError] = React.useState(false)
  const [openError04, setError04] = React.useState(false)
  const [openWarning, setWarning] = React.useState(false)

  useEffect(() => {
        if(!id){
          navigate('/')
        }
      });

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
  setDataUri(null)
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

const closeError = (event, reason) => {
  if (reason === 'clickaway') {
  return;
  }
  setError(false);
  setError04(false)
  setWarning(false);
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
  <div className="camera-container">
    {
      (dataUri)
        ?<ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
        />
        :
      <div className='camera-item'>
        <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
          idealFacingMode={FACING_MODES.USER}
          onTakePhoto = {(dataUri) => { handleTakePhoto(dataUri); } }
          onCameraError = { (error) => { handleCameraError(error); } }  
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
      </div>

    }
    <div className="btn-group-camera">
    <Button  sx={{width: '120px', marginRight: '10px'}} variant="outlined" color="success" onClick={resetPhoto} >
       Переснять
    </Button>
    <Button  sx={{width: '120px'}} variant="contained" color="success" onClick={sendPhoto} >
      Готово 
    </Button>
    </div>
    
  <Backdrop 
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
    open={open} 
    > 
    <CircularProgress color="inherit" /> 
  </Backdrop> 
  <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={openError} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
      Ошибка! Повторите заново!
      </Alert>
    </Snackbar>
    <Snackbar open={openError04} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
      Ошибка! Такой пользователей существует!
      </Alert>
    </Snackbar>
    <Snackbar open={openWarning} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
      Пожалуйста ожидайте!
      </Alert>
    </Snackbar>
  </Stack>
</div>
);
}

export default CameraJS;
