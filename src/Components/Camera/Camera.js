import React, { useState } from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import {Backdrop, CircularProgress, Stack, Snackbar, Button} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router";
import '../../Config';
import '../IdCard/Idcard.css'
import axios from 'axios';
import './Camera.css'
import { getCookies, setCookies} from '../../hooks/cookies'

const  CameraJS = ( ) => {
    const [dataUri, setDataUri] = useState('');
    const [open, setOpen] = useState(false);
    const [openError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    // isDisabled = true
    const [isDisabled, setDisabled] = useState(false);
    const [isDisabledReady, setDisabledReady] = useState(false);
    const idCookie = getCookies('id')
    let navigate = useNavigate();
    // TEMP
    const [selectedFile, setSelectedFile] = useState();
    const onFileChange = async (event) => {
      const file = event.target.files[0]
      const base64 = await convertBase64(file);
      setSelectedFile(base64)
    };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


    //TEMP
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
    else if(!dataUri){
      // setErrorMsg('Ошибка. Нету данных для отправки!')
      // setError(true)
      // TEMP
      setOpen(true)
      const formData = new FormData();

      axios({
        method: 'POST',
        url: global.config.REST_API + 'api/selfie',
        data:{
          base64: selectedFile,
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
          setCookies('check_word' , res.data.secretWord)
          setDataUri(null)
          if (res.data.statusCode === 1){
            console.log(res.data)
            setErrorMsg('Внимание! Фото лица не разпознано или не найдено. Повторите еще раз')
            setError(true)
          }
          else if(res.data.statusCode === 2){
            console.log(res.data)
            setErrorMsg('Техничесие проблемы. Повторите позже')
            setError(true)
            setError(true)
          }
          else if(res.data.statusCode === 3){
            console.log(res.data)
            setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
            setError(true)
          }
          else if(res.data.statusCode === 6){
            console.log(res.data)
            setErrorMsg('Количество попыток закончилось. Попробуйте еще раз завтра!')
            setError(true)
          }
          else{
            navigate('/selfie-passport')
            console.log(res.data)
          }
        })
        .catch(error =>{
          setOpen(false)
          setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
          setError(true)
          console.log(error)
        })
    }

    // temp
    else{
    setError(false);
    setOpen(true);
    setDataUri(dataUri);
    axios({
        method: 'POST',
        url: global.config.REST_API + 'api/selfie',
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
      setCookies('check_word' , res.data.secretWord)
      setDataUri(null)
      if (res.data.statusCode === 1){
        console.log(res.data)
        setErrorMsg('Внимание! Фото лица не разпознано или не найдено. Повторите еще раз')
        setError(true)
      }
      else if(res.data.statusCode === 2){
        console.log(res.data)
        setErrorMsg('Техничесие проблемы. Повторите позже')
        setError(true)
        setError(true)
      }
      else if(res.data.statusCode === 3){
        console.log(res.data)
        setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
        setError(true)
      }
      else if(res.data.statusCode === 6){
        console.log(res.data)
        setErrorMsg('Количество попыток закончилось. Попробуйте еще раз завтра!')
        setError(true)
      }
      else{
      navigate('/selfie-passport')
      console.log(res.data)
      }
    })
    .catch(error =>{
      setOpen(false)
      setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
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
        Внимание! Сделайте снимок лица.
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
            className='camera-item-main'
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
      {/*TEMP */}
      <div className="temp-input">
        <input
          type="file"
          onChange={onFileChange}
        />
      </div>
      {/*TEMP*/}
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
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        {errorMsg}
        </Alert>
      </Snackbar>
    </Stack>
  </div>
  );
}

export default CameraJS;