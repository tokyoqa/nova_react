import React from "react";
import "./Video.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";



// const Video = ({id}) => {
//   const url = ''
//   let navigate = useNavigate;
//   const config = {
//     // video: mediaBlobUrl,
//     id: id
//   }

//   const sendVideo = () =>{ 
//     axios.post(url , config)
//     .then(function(response){
//         console.log(response);
//         navigate('')
//     })
//     .catch(function(error){
//       console.log(error)
//     });
//   }

  const Video = () => {

	const [playing, setPlaying] = useState(false);
  const [video, setVideo] = useState(null)

	const HEIGHT = 500;
	const WIDTH = 500;

	const startVideo = () => {
		setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
	};

	const stopVideo = () => {
		setPlaying(false);
		let video = document.getElementsByClassName('app__videoFeed')[0];
    console.log(video);
		video.srcObject.getTracks()[0].stop();
	};

	return (
		<div className="app">
			<div className="app__container">
				<video
					height={HEIGHT}
					width={WIDTH}
					muted
					autoPlay
					className="app__videoFeed"
				></video>
			</div>
			<div className="app__input">
				{playing ? (
					<button onClick={stopVideo}>Stop</button>
				) : (
					<button onClick={startVideo}>Start</button>
				)}
			</div>
		</div>
	);
}

export default Video;