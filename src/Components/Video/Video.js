import React, { useEffect, useRef, useState } from "react";
import {Backdrop, CircularProgress, Stack, Snackbar, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import "./Video.css";
import Webcam from "react-webcam";
import axios from "axios";
import {useNavigate} from "react-router";
import '../../Config';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { setCookies, getCookies } from "../../hooks/cookies";

export  default function App() {
	const [timeLeft, setTimeLeft] = useState(2 * 60);
	const minutes = Math.floor(timeLeft/60);
	const seconds = timeLeft - minutes * 60;
	const Ref = useRef(null);
  const [timer, setTimer] = useState('5');
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [openTimer, setOpenTimer] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [videoText, setVideoText] = useState('Запись');
  const idCookie = getCookies('id') 
  let 	options = {};
	let 	navigate = useNavigate();
  const checkWord = getCookies('check_word')
  const blob = new Blob(recordedChunks, {
    type: options?.mimeType || "" 
  });

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
    }, 6000); 
 };

  // --** SEND FILE **-- //
  const sendVideoFile = () => {
    console.log(blob)
  	const formDate = new FormData();
    setOpen(!open);
    if(!recordedChunks.length){
      setErrorMsg('Ошибка! Нету данных для отправки')
      setError(true)
      setOpen(false)
    }
    // else if(!idCookie){
    //   setOpen(false)
    //   setErrorMsg('Время сессии истекло. Начните заново')
    //   setError(true)
    // }
    else{
    formDate.append( 
    'video', 
    blob 
    ) 
    formDate.append( 
    'id',
    idCookie
    )
    const urlObject = URL.createObjectURL(blob); 
    setVideoSrc(urlObject);
    console.log(recordedChunks)

      axios
    ( 
      { 
        url: global.config.REST_API + 'api/video', 
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
        setErrorMsg('Ошибка! Произнесите слово еще раз. Громко и четко')
        setError(true)
        console.log(res.data) 
      } 
      else if(res.data.statusCode === 2){
        setErrorMsg('Технические проблемы. Повторите позже.')
        setError(true)
        console.log(res.data) 
      } 
      else if(res.data.statusCode === 3){ 
        setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
        setError(true)
        console.log(res.data) 
      } 
      else{
        setCookies('user_name', res.data.fullName)
        navigate('/video-agreement')
        console.log(res.data) 
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
      setTimeout(()=>{
          setDisabled(false)
      } ,2000)
  const handleStopCaptureClick = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.stop) { 
      mediaRecorderRef.current.stop();
    } 
  }; 
  }
  }
   
  const clearTimer = (e) => {   
      setTimer('5'); 
      if (Ref.current) clearInterval(Ref.current); 
      const id = setInterval(() => { 
          startTimer(e); 
      }, 1000) 
      Ref.current = id; 
  } 
  
  const getDeadTime = () => { 
      let deadline = new Date(); 
      deadline.setSeconds(deadline.getSeconds() + 5); 
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
    <div className="video-form">
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
    <div className="video-text_word"> Произнесите слово <strong>{checkWord}</strong> четко и громко один раз для прохождения идентификации </div>

    <div className="btn-items">
      <Button 
        id="start-btn" 
        color='success' 
        sx={{marginTop: '10px', width: "150px", marginRight:"5px"}} 
        variant="contained" 
        onClick={startOpenTimer} // Start timer 
        disabled={isDisabled}
        >
        {videoText}
      </Button>
      <Button   
        id="send-btn" 
        color='success' 
        sx={{marginTop: '10px', width: "150px"}} 
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