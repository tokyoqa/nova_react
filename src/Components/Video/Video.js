import React, { useRef, useState } from "react";
import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, Typography, ButtonGroup} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import "./Video.css";
import Webcam from "react-webcam";
import axios from "axios";
import {useNavigate} from "react-router";
import '../../Config';
import {useEffect} from 'react';

export  default function App({id, secretWord}) {
	const [timeLeft, setTimeLeft] = useState(2 * 60);
	const minutes = Math.floor(timeLeft/60);
	const seconds = timeLeft - minutes * 60;
	const Ref = useRef(null);
    const [timer, setTimer] = useState('5');
	const [statusVideo, setStatusVideo] = useState();
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	let 	navigate = useNavigate(); 
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [videoSrc, setVideoSrc] = useState(null);
	const [dataVideo, setDataVideo] = useState(null)
	const [open, setOpen] = React.useState(false);
	let 	options = {};
	const formDate = new FormData();
	const [openSuccess, setSuccess] = React.useState(false);
	const [openError, setError] = React.useState(false)
	const [openErrorNull, setErrorNull] = React.useState(false)
	const [openError04, setError04] = React.useState(false)
	const [openWarning, setWarning] = React.useState(false)
	const [openInfo, setInfo] = React.useState(false)
	let 	audioOptions = {};

  const Alert = React.forwardRef(function Alert(props, ref) {
  	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
	

	// useEffect(() => {
	// 	if(!id){
	// 		navigate('/')
	// 	}
	// });


if (MediaRecorder.isTypeSupported("video/webm")) { 
  options = { mimeType: "video/webm;codecs=avc1",    
              audioBitsPerSecond: 128000, 
              videoBitsPerSecond: 2500000, 
     // recordingLength: 5000, 
      width: { min: 640, ideal: 1920 }, 
      height: { min: 400, ideal: 1080 }, 
      aspectRatio: { ideal: 1.7777777778 }, 
      frameRate: { max: 30 }, 
      sampleSize: 16, 
      channelCount: 2 
      
     }; 
 } 
 else if (MediaRecorder.isTypeSupported("video/mp4")) { 
  options = { mimeType: "video/webm", 
              audioBitsPerSecond : 128000, 
              videoBitsPerSecond : 2500000 }; 
 } 
  
 const handleDataAvailable = ({ data }) => { 
   
  if (data.size > 0) { 
   setRecordedChunks((prev) => prev.concat(data)); 
  } 
 
 }; 
 
 const startVideo = () => {
  hideBtn()
  onClickReset(); 
  if (window.MediaRecorder) { 
   setStatusVideo('Запись') 
   mediaRecorderRef.current = new window.MediaRecorder( 
   webcamRef.current.stream, 
   options 
      ); 
  mediaRecorderRef.current.addEventListener( 
   "dataavailable", 
   handleDataAvailable 
  ); 
  mediaRecorderRef.current.start(); 
  } 
  onClickReset(); 
  setTimeout(event => { 
   mediaRecorderRef.current.stop(); 
    }, 5000); 
 }; 

  // --** SEND FILE **-- //
  const sendVideoFile = () => { 
    setOpen(!open);  
    if(!recordedChunks.length) { 
    setErrorNull(true)
    setOpen(false)
  }
  else{
    const blob = new Blob(recordedChunks, { 
      type: options?.mimeType || "" 
    }); 
    console.log(blob);   
    formDate.append( 
    'video', 
      blob 
    ) 
    formDate.append( 
    'id',
    id 
    ) 
    const urlObject = URL.createObjectURL(blob); 
    setVideoSrc(urlObject); 
      axios 
    ( 
      { 
        url: global.config.REST_API + 'api/video', 
        method: 'POST', 
        data: formDate, 
        headers: { 
      'Content-Type': 'multipart/form-data' 
        }, 
        enctype: "multipart/form-data" 
      } 
      )  
      .then((res) => { 
      setOpen(false);  
      if (res.data.statusCode === 1){ 
        setError(true) 
        console.log(res) 
      } 
      else if(res.data.statusCode === 2){ 
        setError(true) 
        console.log(res) 
      } 
      else if(res.data.statusCode === 3){ 
        setWarning(true) 
      console.log(res) 
      } 
      else if(res.data.statusCode === 4){ 
        setError04(true) 
      console.log(res) 
      } 
      else{ 
      alert('Success!') 
      console.log(res.data) 
      } 
      }) 
      .catch(error =>{ 
      console.error(error) 
      setOpen(false) 
      setError(true) 
      }) 
    }
  }

const closeError = (event, reason) => { 
  if (reason === 'clickaway') { 
   return; 
  } 
  setError(false); 
  setError04(false) 
  setSuccess(false);
  setWarning(false);
  setInfo(false); 
  setErrorNull(false)


}; 
 
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
        let { total, hours, minutes, seconds }  
                    = getTimeRemaining(e); 
        if (total >= 0) { 
            setTimer( 
    (seconds > 9 ? seconds :  seconds) 
            ) 
        } 
     if( seconds == 0){ 
  const handleStopCaptureClick = () => { 
   if (mediaRecorderRef.current && mediaRecorderRef.current.stop) { 
   mediaRecorderRef.current.stop(); 
   } 
  }; 
  setStatusVideo('Записано') 

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
		const remakeVideo = () => {
      setRecordedChunks([])
      startVideo()
    } 
  
    const hideBtn = () =>{
      document.getElementById('start-btn').style.visibility="hidden"
    }
  return (
    <>
      <div className="camera-form">	
			<Webcam
			className="camera-item"
			ref={webcamRef}
			height={500}
			mirrored={true}
			audio={true}
			muted={true}
			videoConstraints={custVideoConstraints}
			audioConstraints={custAudioConstraints}
			/>
      </div>
			<div className="video-status">Status: {statusVideo}</div>
			<div className="btn-items">
					<Button id="start-btn" color='success' sx={{display: 'block' ,marginTop: '10px', width: "40%", marginRight:"5px"}} variant="contained" onClick={startVideo}>
            Запись
          </Button>
					<Button id="send-btn" color='success' sx={{display: 'block', marginTop: '10px', width: "40%", marginRight:"5px"}} variant="contained" onClick={sendVideoFile}>
            Отправить
          </Button>
					<Button id="reset-btn" color='success' sx={{display: 'block', marginTop: '10px', width: "40%", marginRight:"5px"}} variant="contained" onClick={remakeVideo}>
            Переснять 
          </Button>
				<div> `Произнесите слово "{secretWord}" четко и громко для прохождения идентификации ` </div>
				<h2 className="timer-Console">{timer}</h2>
			</div>
			
     
	  <Backdrop 
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
          open={open}> 
      <CircularProgress color="inherit" /> 
    </Backdrop> 
		<Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="success" sx={{ width: '100%' }}>
          This is a openSuccess message!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Повторите заново!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorNull} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Нету данных для отправки
        </Alert>
      </Snackbar>

      <Snackbar open={openError04} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка сервиса. 
        </Alert>
      </Snackbar>

      <Snackbar open={openWarning} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
          Пожалуйста ожидайте!
        </Alert>
      </Snackbar>

      <Snackbar open={openInfo} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="info" sx={{ width: '100%' }}>
          This is a info message!
        </Alert>
      </Snackbar>
    </Stack>
    </>
  );
}