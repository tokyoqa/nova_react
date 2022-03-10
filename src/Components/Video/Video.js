import React from "react";
import VideoRecorder from 'react-video-recorder'
import "./Video.css";


function Video(){

const FromVideoRecorder = ({ push }) => {
  return (
    <VideoRecorder
      isFlipped={false}
      // isOnInitially
      countdownTime={0}
      mimeType="video/webm;codecs=vp8,opus"
      constraints={{
        audio: true,
        video: {
          width: { exact: 480, ideal: 480 },
          height: { exact: 640, ideal: 640 },
          aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
          resizeMode: "crop-and-scale"
        }
      }}
      onRecordingComplete={(videoBlob) => {
        console.log("videoBlob", videoBlob);
        push("/videoPreview", { videoBlob });
      }}

    />
  );
};

const VideoRecordPage = (props) => {
  return (
    <div className="App">
      <h1>Video record</h1>

      <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
        <FromVideoRecorder push={props.history.push} />
      </div>
    </div>
  );
};

const VideoPreviewPage = (props) => {
  return (
    <div className="App">
      <h1>Video preview</h1>

      {props.location.state && props.location.state.videoBlob && (
        <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
          <video
            src={window.URL.createObjectURL(props.location.state.videoBlob)}
            width={480}
            height={640}
            autoPlay
            loop
            controls
          />
        </div>
      )}
    </div>
  );
};


}

export default Video;






// import React from "react";
// import "./Video.css"
// function Video(){
//     return(
//     <div className="video_form">
//          <div className="video_title">Идентификация</div>
//             <div className="video_subtitle">Отправьте свое видео</div>
//             <div className="video"> </div>
//         <button type="text" className="video_submit">Далее</button>
//     </div>
//     )
// }
