import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import {Backdrop, CircularProgress, Stack, Snackbar, Button} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router";
import {useEffect } from 'react';
import '../../Config';
import axios from 'axios';
import {getCookies, setCookies} from '../../hooks/cookies';

const  SelfiePassport = () => {
  const [dataUri, setDataUri] = useState('');
  const [open, setOpen] = useState(false); 
  const [openError, setError] = useState(false)
  const [openErrorServer, setOpenErrorServer] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [errorMsgServer, setErrorMsgServer] = useState(false)
  const [isDisabled, setDisabled] = useState(true)
  const [isDisabledReady, setDisabledReady] = useState(true)
  const idCookie = getCookies('id')
  let navigate = useNavigate();
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleTakePhoto (dataUri) {
    setDataUri(dataUri)
    setDisabled(false)
    setDisabledReady(false)
  }
  function handleTakePhotoAnimationDone (dataUri) { 
  
  }

  function handleCameraError (error) {
  }

  function handleCameraStart (stream) {

  }

  function handleCameraStop () {
    
  }

const sendPhoto = () => {
  if(!idCookie){
    setErrorMsg('Ошибка. Время сессии прошло. Начните заново')
    setError(true)
  }
  else if(!dataUri) {
    setErrorMsg('Ошибка. Нету данных для отправки!')
    setError(true)
  }
  else{
  setError(false)
  setOpen(true)
  setDataUri(dataUri);
  axios({
      method: 'POST',
      url: global.config.REST_API + 'api/selfie-passport',
      data:{ 
          base64: dataUri,
          id: idCookie
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
    setOpen(false)
    setDataUri(null)
    if (res.data.statusCode === 1){
      setErrorMsg('Ошибка. Повторите запрос еще раз')
      setError(true)
    }
    else if(res.data.statusCode === 2){
      setErrorMsg('Техничесие проблемы. Повторите позже')
      setError(true)
    }
    else if(res.data.statusCode === 3){
      setErrorMsg('Время ожидания запроса вышло. Повторите снова!')
      setError(true)
    }
    else{
    navigate('/terms')
    }
  })
  .catch(error =>{
    setOpen(false)
    setErrorMsgServer('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
    setError(true)
    console.log(error)
  })
  }
  }
  const closeError = (event, reason) => {
    if (reason === 'clickaway') {
    return;
    }
    setDisabledReady(false)
    setDisabled(false)
    setError(false);
    setOpenErrorServer(false)
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

return (
  <div className="camera-container">
    <div className="camera-text_info">
      Сделайте снимок лица с паспортом 
    </div>
    {
      (dataUri)
        ?
        <ImagePreview dataUri={dataUri}
            isFullscreen={isFullscreen}
        />
        :
      <div className='camera-item'>
        <Camera onTakePhotoAnimationDone = {handleTakePhotoAnimationDone}
          isFullscreen={isFullscreen}
          idealFacingMode={FACING_MODES.USER}
          onTakePhoto = {(dataUri) => { handleTakePhoto(dataUri); } }
          onCameraError = { (error) => { handleCameraError(error); } }  
          imageType = {IMAGE_TYPES.JPG}
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
      <Button  sx={{width: '120px',marginRight: '10px'}} 
      variant="outlined" 
      color="success" 
      onClick={resetPhoto}
      disabled={isDisabled}
      >
        Переснять
      </Button>
      <Button  sx={{width: '120px' }} 
      variant="contained" 
      color="success" 
      onClick={sendPhoto}
      disabled={isDisabledReady}
      >
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
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
      {errorMsg}
      </Alert>
    </Snackbar>

    <Snackbar open={openErrorServer} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        {errorMsgServer}
      </Alert>
    </Snackbar>
  </Stack>
</div>
);
}

export default SelfiePassport;