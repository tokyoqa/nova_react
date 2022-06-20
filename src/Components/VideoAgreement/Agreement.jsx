import React, { useRef, useState } from "react";
import {Backdrop, CircularProgress, Stack, Snackbar, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Webcam from "react-webcam";
import axios from "axios";
import {useNavigate} from "react-router";
import '../../Config';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export  default function VideoAgreement({id}) {
	const [timeLeft, setTimeLeft] = useState(2 * 60);
	const minutes = Math.floor(timeLeft/60);
	const seconds = timeLeft - minutes * 60;
	const Ref = useRef(null);
  const [timer, setTimer] = useState('5');
	const [statusVideo, setStatusVideo] = useState();
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	let 	navigate = useNavigate(); 
	const [videoSrc, setVideoSrc] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [openSuccess, setSuccess] = React.useState(false);
	const [openError, setError] = React.useState(false)
	const [openErrorWord, setErrorWord] = React.useState(false)
	const [openErrorNull, setErrorNull] = React.useState(false)
	const [openError04, setError04] = React.useState(false)
	const [openWarning, setWarning] = React.useState(false)
	const [recordedChunks, setRecordedChunks] = useState([]);
  const [openTimer, setOpenTimer] = useState(false)
  
	let 	options = {};
  const tempID = '1'

  const blob = new Blob(recordedChunks, {
    type: options?.mimeType || "" 
  });

  const Alert = React.forwardRef(function Alert(props, ref) {
  	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

	// useEffect(() => {
	// 	if(!id){
	// 		navigate('/')
	// 	}
	// });
  
 const handleDataAvailable = ({ data }) => { 
  if (data.size > 0) { 
  setRecordedChunks([data]) 
  } 
 };

 console.log(tempID)

 
 const startVideo = () => {
  setOpenTimer(true)
  hideBtn()
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
    }, 5000); 
 };

  // --** SEND FILE **-- //
  const sendVideoFile = () => {
  	const formDate = new FormData();
    setOpen(!open);  // Open loading menu
    if(!recordedChunks.length ){
      setErrorNull(true)
      setOpen(false)
    }
    else if(!tempID){
      setErrorNull(true)
      setOpen(false)
    }
    else{
    formDate.append( 
    'video', 
      blob 
    ) 
    formDate.append( 
    'id',
    tempID 
    // id
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
        setErrorWord(true)
        console.log(res.data) 
      } 
      else if(res.data.statusCode === 2){ 
        setError(true) 
        console.log(res.data) 
      } 
      else if(res.data.statusCode === 3){ 
        setWarning(true) 
        console.log(res.data) 
      } 
      else if(res.data.statusCode === 4){ 
        setError04(true) 
        console.log(res.data) 
      } 
      else{ 
        navigate('/finish')
        console.log(res.data) 
        setSuccess(true)
      } 
      }) 
      .catch(error =>{ 
        console.error(error) 
        setOpen(false) 
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
      let { total, seconds }  
                  = getTimeRemaining(e); 
      if (total >= 0) { 
          setTimer( 
  (seconds > 9 ? seconds :  seconds) 
          )
      }
    if( seconds === 0){
      setOpenTimer(false)
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
      setRecordedChunks(null)
      setRecordedChunks([null])
      startVideo()
    } 
  
    const hideBtn = () =>{
      document.getElementById('start-btn').style.disabled="true"
    }

    const closeError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setError(false); 
      setError04(false) 
      setSuccess(false);
      setWarning(false);
      setErrorNull(false)
      setErrorWord(false)
    };

    const renderTime = ({ remainingTime }) => {
      return (
        <div className="timer">
          <div className="text">Запись начнется через</div>
          <div className="value">{remainingTime}</div>
          <div className="text">секунд</div>
        </div>
      );
    };
    const startOpenTimer = () => {
      setOpenTimer(true)
     }
    
     
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
    <div className="video-agreement_text">Произнесите "Я соглашаюсь на обработку персональных данных" для того чтобы пройти идентификацию.</div>
    <div className="video-status"> Статус записи видео: {statusVideo}</div>
    <div className="btn-items">
        <Button
          sx={{marginTop: '10px', width: "30%", marginRight:"5px"}} 
          id="start-btn" 
          color='success' 
          variant="contained" 
          onClick={startOpenTimer}>
            Запись
        </Button>
        <Button 
          id="send-btn" 
          color='success' 
          sx={{marginTop: '10px', width: "30%", marginRight:"5px"}} 
          variant="contained" 
          onClick={sendVideoFile}
          >
            Отправить
        </Button>
        <Button 
          id="reset-btn" 
          color='success' 
          sx={{marginTop: '10px', width: "30%", marginRight:"5px"}} 
          variant="contained" 
          onClick={remakeVideo}>
            Переснять 
        </Button>
      <h2 className="timer-Console">{timer}</h2>
    </div>
  

    
  <Backdrop 
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
    open={open}>
    <CircularProgress color="inherit" /> 
  </Backdrop> 
  <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={openSuccess} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="success" sx={{ width: '100%' }}>
        Успешно!
      </Alert>
    </Snackbar>
    <Snackbar open={openError} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        Ошибка! Повторите заново!
      </Alert>
    </Snackbar>
    <Snackbar open={openErrorWord} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        Ошибка! Произнесите слово еще раз. Громко и четко
      </Alert>
    </Snackbar>
    <Snackbar open={openErrorNull} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        Ошибка! Нету данных для отправки
      </Alert>
    </Snackbar>
    <Snackbar open={openError04} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        Ошибка сервиса. 
      </Alert>
    </Snackbar>
    <Snackbar open={openWarning} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
        Пожалуйста ожидайте!
      </Alert>
    </Snackbar>
  </Stack>
  </>
);
}