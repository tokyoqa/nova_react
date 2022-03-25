import React, { useRef, useState, useCallback } from "react";
import "./Video.css";
import Webcam from "react-webcam";
import axios from "axios";
import '../../Config';

export default function App({id}) {
	const [selectedFile, setSelectedFile] = useState();
  	const webcamRef = useRef(null);
  	const mediaRecorderRef = useRef(null);
  	const [recordedChunks, setRecordedChunks] = useState([]);
  	const [videoSrc, setVideoSrc] = useState(null);
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

	const handleShowVideo = () => {
		if (recordedChunks.length) {
		const blob = new Blob(recordedChunks, {
			type: options?.mimeType || ""
		});
		const videoFile = new File([blob], {type:'video/mp4'}) 
		const config = {
			video: formDate,
			id: id
		}
		
		formDate.append(
			'video',
			blob,
		)

		const urlObject = URL.createObjectURL(blob);
		console.log(formDate)
		setVideoSrc(urlObject);
		axios
			.post(global.config.REST_API + 'api/video', config)
			.then(res=>console.log(res))
			.catch(err=> console.error(err))
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
		  <button onClick={handleShowVideo}>Send Video</button>
      </div>
    </>
  );
}
