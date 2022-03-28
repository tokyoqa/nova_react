import React, { useRef, useState, useCallback } from "react";
import "./Video.css";
import Webcam from "react-webcam";
import axios from "axios";
import '../../Config';
import { Backdrop, CircularProgress, Button } from '@mui/material';

export default function App({id}) {
	const [selectedFile, setSelectedFile] = useState();
  	const webcamRef = useRef(null);
  	const mediaRecorderRef = useRef(null);
  	const [recordedChunks, setRecordedChunks] = useState([]);
  	const [videoSrc, setVideoSrc] = useState(null);
	const [open, setOpen] = React.useState(false);
  	let options = {};
  	const formDate = new FormData();

	if (MediaRecorder.isTypeSupported("video/webm")) {
		options = { mimeType: "video/webm" };
	} else if (MediaRecorder.isTypeSupported("video/mp4")) {
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
		console.log(videoFile)
		console.log(id)
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
			.then(res=>{console.log(res.data.message); setOpen(false)})
			.catch(error =>{
				if (error.responce){
					console.log(error.response.status);
				}
				else if(error.request){
					console.log(error.request);
				}
				else {
					console.log(error.message);
				}
			})
		}

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
    </>
  );
}