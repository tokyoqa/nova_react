import "./Video.css";
import axios from "axios";
import '../../Config';
import React, { useRef, useState } from "react";
import {Backdrop, CircularProgress, Stack, Snackbar, ButtonGroup, Button} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Webcam from "react-webcam";
import {useNavigate} from "react-router";
// import {useEffect } from 'react';
// import VideoToAudio from 'video-to-audio'

export  default function App({id, secretWord}) {
	const [timeLeft, setTimeLeft] = useState(2 * 60);
	const minutes = Math.floor(timeLeft/60);
	const seconds = timeLeft - minutes * 60;
	const Ref = useRef(null);
  const [timer, setTimer] = useState('5');
	// const [selectedFile, setSelectedFile] = useState();
	const [statusVideo, setStatusVideo] = useState();
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	let 	navigate = useNavigate(); 
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [videoSrc, setVideoSrc] = useState(null);
	const [open, setOpen] = React.useState(false);
	let 	options = {};
	const formDate = new FormData();
	const [openSuccess, setSuccess] = React.useState(false);
	const [openError, setError] = React.useState(false)
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
		options = { mimeType: "video/webm" };
	}
	else if (MediaRecorder.isTypeSupported("video/mp4")) {
		options = { mimeType: "video/mp4" };
	}
	if (MediaRecorder.isTypeSupported("audio/webm")) {
		audioOptions = { mimeType: "audio/webm"};
	}
	else if (MediaRecorder.isTypeSupported("audio/mpeg")) {
	audioOptions = { mimeType: "audio/mpeg"};
	}

	const handleDataAvailable = ({ data }) => {
		if (data.size > 0) {
			setRecordedChunks((prev) => prev.concat(data));
		}
	};

	const handleStartCaptureClick = () => {
		if (window.MediaRecorder) {
			setStatusVideo('Запись')
			mediaRecorderRef.current = new window.MediaRecorder(
			webcamRef.current.stream,
			options,
		);
		mediaRecorderRef.current.addEventListener(
			"dataavailable",
			handleDataAvailable
		);	
		mediaRecorderRef.current.start();
		}
		onClickReset();
	};


	

	const sendVideoFile = () => {
		const tempId = 1
		setOpen(!open); 
		if (recordedChunks.length) {
		const blob = new Blob(recordedChunks, {
			type: options?.mimeType || ""
		});
		if (recordedChunks.length) {
			const audioBlob = new Blob(recordedChunks, {
			type: audioOptions?.mimeType || ""
  	});
		console.log(audioBlob);
		const videoFile = new File([blob], {type:'video/mp4'}) 
		const audioFile = new File([audioBlob], {type: 'audio/mpeg'})
		// let convertedAudioDataObj =  VideoToAudio.convert(videoFile, 'mp3');	
		
		formDate.append(
		'video',
		videoFile
		)
		formDate.append(
		'id',
		tempId
		)
		formDate.append(
		'audio',
		audioFile
		// convertedAudioDataObj
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
				// 'Accept': 'multipart/form-data',
				// 'Access-Control-Allow-Origin': '*',
				// 'Access-Control-Allow-Headers': '*',
				// 'Access-Control-Allow-Methods': '*',
				// mode: 'no-cors'
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

	};

	
	
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


	const videoConstraints = {
		width: 640,
		height: 480,
		facingMode: "user",
	};
		
	const audioConstraints = {
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
		handleStopCaptureClick();
		setStatusVideo('Записано')
		console.log("video stopped");
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
			onClickReset();
	
		}

		
			

  return (
    <>
      <div className="camera-form">	
			<Webcam
			className="camera-item"
			ref={webcamRef}
			height={500}
			videoConstraints={{ facingMode: "user" }}
			mirrored={true}
			audio={true}
			muted={true}
			videoConstraints={videoConstraints}
			audioConstraints={audioConstraints}
			/>
      </div>
			
			<div className="btn-items">
				<ButtonGroup variant="outlined" aria-label="outlined button group">
					<Button onClick={handleStartCaptureClick}>Начать запись</Button>
					<Button onClick={sendVideoFile}>Отправить</Button>
					<Button onClick={remakeVideo}>Переснять</Button>
				</ButtonGroup>
				<div>Video Status: {statusVideo}</div>
				<div> `Произнесите слово  {secretWord} четко и громко для прохождения идентификации ` </div>
				<h2 className="timer-Console">{timer}</h2>
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
          Ошибка сервиса. 
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
    </>
  );
}


