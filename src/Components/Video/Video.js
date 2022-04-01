import React, { useRef, useState } from "react";
import {Backdrop, CircularProgress, Stack, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import "./Video.css";
import Webcam from "react-webcam";
import axios from "axios";
import {useNavigate} from "react-router";
import '../../Config';
import {useEffect } from 'react';

export default function App({id}) {
	const [selectedFile, setSelectedFile] = useState();
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	let navigate = useNavigate(); 
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [videoSrc, setVideoSrc] = useState(null);
	const [open, setOpen] = React.useState(false);
	let options = {};
	const formDate = new FormData();
	const [openSuccess, setSuccess] = React.useState(false);
	const [openError, setError] = React.useState(false)
	const [openError04, setError04] = React.useState(false)
	const [openWarning, setWarning] = React.useState(false)
	const [openInfo, setInfo] = React.useState(false)


  const Alert = React.forwardRef(function Alert(props, ref) {
  	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

	useEffect(() => {
		if (performance.navigation.type === 1 ) {
			navigate('/')
		}

		if(!id){
			navigate('/')
		}
	});



	if (MediaRecorder.isTypeSupported("video/webm")) {
		options = { mimeType: "video/webm" };
	}
	else if (MediaRecorder.isTypeSupported("video/mp4")) {
		options = { mimeType: "video/mp4" };
	}

	const handleDataAvailable = ({ data }) => {
		if (data.size > 0) {
			setRecordedChunks((prev) => prev.concat(data));
		}
	};

	const handleStartCaptureClick = () => {
		if (window.MediaRecorder) {
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
	};
	const handleStopCaptureClick = () => {
		if (mediaRecorderRef.current && mediaRecorderRef.current.stop) {
		mediaRecorderRef.current.stop();
		}
	};



	const sendVideoFile = () => {
		setOpen(!open); 
		if (recordedChunks.length) {
		const blob = new Blob(recordedChunks, {
			type: options?.mimeType || ""
		});
		const videoFile = new File([blob], {type:'video/mp4'}) 
		formDate.append(
			'video',
			videoFile,
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


  return (
    <>
      <div className="camera-form">	
			<Webcam
			className="camera-item"
			ref={webcamRef}
			height={500}
			videoConstraints={{ facingMode: "user" }}
			mirrored={true}
		/>
      </div>
      <div className="btn-form">
          <button onClick={handleStartCaptureClick}>start record</button>
          <button onClick={handleStopCaptureClick}>stop record</button>
		  <button onClick={sendVideoFile}>Send Video</button>
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