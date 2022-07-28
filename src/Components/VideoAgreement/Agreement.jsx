  import React, { useEffect, useRef, useState } from "react";
import {Backdrop, CircularProgress, Stack, Snackbar, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Webcam from "react-webcam";
import axios from "axios";
import {useNavigate} from "react-router";
import '../../Config';
import '../Video/Video.css';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {getCookies, setCookies} from "../../hooks/cookies"

export  default function App() {
	const [timeLeft, setTimeLeft] = useState(2 * 60);
	const minutes = Math.floor(timeLeft/60);
	const seconds = timeLeft - minutes * 60;
	const Ref = useRef(null);
  const [timer, setTimer] = useState('8');
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	let 	navigate = useNavigate(); 
	const [videoSrc, setVideoSrc] = useState(null);
	const [open, setOpen] = useState(false);
	const [openError, setError] = useState(false)
	const [errorMsg, setErrorMsg] = useState(false)
	const [recordedChunks, setRecordedChunks] = useState([]);
  const [openTimer, setOpenTimer] = useState(false)
  const [videoText, setVideoText] = useState('Записать')
  const [isDisabled, setDisabled] = useState(false)

  const cookiesId = getCookies('id')
  const cookieName = getCookies('user_name')
	let 	options = {};
  const blob = new Blob(recordedChunks, {
    type: options?.mimeType || "" 
  });


  // TEMP
  const [selectedFile, setSelectedFile] = useState();
  const onFileChange = async (event) => {
    setSelectedFile(event.target.files[0])
    setSelectedFile(event.target.files[0])
  };

  // TEMP


  const Alert = React.forwardRef(function Alert(props, ref) {
  	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
 const handleDataAvailable = ({ data }) => { 
  if (data.size > 0) { 
  setRecordedChunks([data]) 
  } 
 };

 const startOpenTimer = () => {
  setOpenTimer(true)
  setVideoText('Переснять')
 }
 // Start recording video
 const startVideo = () => {
 setDisabled(true)
   setRecordedChunks(null)
  setRecordedChunks([null])
  onClickReset();
  try {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, { mimeType: 'audio/webm' });
}
  catch (err1) {
  try {
    // Fallback for iOS
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, { mimeType: 'video/mp4' });
  }
  catch (err2) {
    console.error({err1});
    console.error({err2})
  }
}
  mediaRecorderRef.current.addEventListener( 
   "dataavailable", 
   handleDataAvailable 
  );
  mediaRecorderRef.current.start();
  onClickReset(); 
  setTimeout(event => { 
   mediaRecorderRef.current.stop(); 
    }, 9000); 
 };
 const formDate = new FormData();
  // --** SEND FILE **-- //
  const sendVideoFile = () => {
    setOpen(!open);
    if(selectedFile) {
      // setErrorMsg('Ошибка! Нету данных для отправки')
      // setError(true)
      // setOpen(false)
      setOpen(true)
      formDate.append(
        'video',
        selectedFile
      )
      formDate.append(
        'id',
        cookiesId
      )
      axios
      (
        {
          url: global.config.REST_API + 'api/video-agreement',
          method: 'POST',
          data: formDate,
          headers: {'Content-Type': 'multipart/form-data'},
          enctype: "multipart/form-data",
          transformRequest: (d) => d
        }
      )
        .then((res) => {
          setOpen(false);
          if (res.data.statusCode === 1){
            setErrorMsg('Ошибка! Произнесите слово еще раз. Громко и четко')
            setError(true)
          }
          else if(res.data.statusCode === 2){
            setErrorMsg('Технические проблемы. Повторите позже.')
            setError(true)
          }
          else if(res.data.statusCode === 3){
            setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
            setError(true)
          }
          else if(res.data.statusCode === 6){
            setErrorMsg('Количество попыток закончилось. Попробуйте еще раз завтра!')
            setError(true)
          }
          else{
            setCookies('user_name', res.data.fullName)
            navigate('/finish')
          }
        })
        .catch(error =>{
          setOpen(false)
          console.error(error)
          setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
          setError(true)
        })
    }
    else if(!cookiesId){
      setOpen(false)
      setErrorMsg('Время сессии истекло. Начните заново')
      setError(true)
    
    }
    else{
      formDate.append(
        'video',
        blob
      )
      formDate.append(
        'id',
        cookiesId
      )
      const urlObject = URL.createObjectURL(blob);
    setVideoSrc(urlObject);

      axios 
    ( 
      { 
        url: global.config.REST_API + 'api/video-agreement', 
        method: 'POST', 
        data: formDate, 
        headers: { 
      'Content-Type': 'multipart/form-data' 
        }, 
        enctype: "multipart/form-data",
        transformRequest: (d) => d
      }
      )  
      .then((res) => { 
      setOpen(false);  
      if (res.data.statusCode === 1){ 
        setErrorMsg('Ошибка! Нету данных для отправки.')
        setError(true)
      }
      else if(res.data.statusCode === 2){
        setErrorMsg('Технические проблемы. Повторите позже.')
        setError(true)
      }
      else if(res.data.statusCode === 3){
        setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
        setError(true) 
      }
      else{ 
        navigate('/finish')
      }
      }) 
      .catch(error =>{
        setOpen(false) 
        console.error(error)
        setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
        setError(true)

      }) 
    }
  }

 const custVideoConstraints = { 
  width: 640, 
  height: 480, 
  facingMode: "user", 
 }; 
   
 const custAudioConstraints = { 
  suppressLocalAudioPlayback: true, 
  noiseSuppression: true, 
  echoCancellation: true, 
 }; 
 
 // Timer function    
 const getTimeRemaining = (e) => { 
    const total = Date.parse(e) - Date.parse(new Date()); 
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);   
    const hours = Math.floor((total / 1000 / 60 / 60) % 24); 
    return { 
      total, hours, minutes, seconds 
    }; 
  } 
   
const startTimer = (e) => {
  let { total, seconds } = getTimeRemaining(e); 
  if (total >= 0) {
    setTimer(seconds > 9 ? seconds :  seconds)
  }
  if( seconds === 0){
    setInterval(()=>{
      setDisabled(false)
    },1000)
    const handleStopCaptureClick = () => { 
      if (mediaRecorderRef.current && mediaRecorderRef.current.stop) {
        mediaRecorderRef.current.stop(); 
      } 
  }; 
  }
  }
   
  const clearTimer = (e) => {   
      setTimer('8'); 
      if (Ref.current) clearInterval(Ref.current); 
      const id = setInterval(() => { 
          startTimer(e);
      }, 1000)
      Ref.current = id;
  } 
  
  const getDeadTime = () => { 
      let deadline = new Date(); 
      deadline.setSeconds(deadline.getSeconds() + 8); 
      return deadline; 
  } 
  
  const onClickReset = () => { 
      clearTimer(getDeadTime());
  } 


  const closeError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false); 
  };

  const renderTime = ({ remainingTime }) => {
    return (
      <div className="timer">
        <div className="text">Запись начнется...</div>
        <div className="value">{remainingTime}</div>
        <div className="text">секунд</div>
      </div>
    );
  };
     
return (
  <>
    <div className="camera-form">	
    <Webcam
    className="video-item"
    ref={webcamRef}
    height={400}
    mirrored={true}
    audio={true}
    muted={true}
    videoConstraints={custVideoConstraints}
    audioConstraints={custAudioConstraints}
    />
    </div>
    {
      (!openTimer)
      ? null
      :
      <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
      open={openTimer}>
      <div className="App">
        <div className="timer-wrapper">
          <CountdownCircleTimer
            isPlaying
            duration={3}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[3, 2.5, 1.5, 0]}
            onComplete={() => ( { shouldRepeat: false, delay: 1 }, setOpenTimer(false), startVideo())}
            >
            {renderTime}  
          </CountdownCircleTimer>
        </div>
       </div>
      </Backdrop>
    }
    <h2 className="timer-console">{timer}</h2>
    <div className="video-agreement_text">Произнесите <b> "Я, {cookieName}, соглашаюсь на обработку персональных данных" </b> для того, чтобы пройти идентификацию.</div>
    <div className="btn-items">
      {/*TEMP */}
      <div className="temp-input">
        <input
          onChange={onFileChange}
          type="file"
        />
      </div>
      {/*TEMP*/}
        <Button 
          id="reset-btn"
          color='success'
          sx={{marginTop: '10px', width: "120px", marginRight:"5px"}} 
          variant="contained"
          onClick={startOpenTimer}
          disabled={isDisabled}
          >
            {videoText} 
        </Button>
        <Button 
          id="send-btn" 
          color='success' 
          sx={{marginTop: '10px', width: "120px"}}
          variant="contained" 
          onClick={sendVideoFile}
          disabled={isDisabled}
          >
            Отправить
        </Button>

    </div>
  
  <Backdrop 
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
    open={open}>
    <CircularProgress color="inherit" /> 
  </Backdrop> 
  <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={openError} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        {errorMsg}
      </Alert>
    </Snackbar>
  </Stack>
  </>
);
}