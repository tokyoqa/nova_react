import React from "react";
import "./Video.css"

function Video(){
    return(
    <div className="form">
         <div className="title">Идентификация</div>
            <div className="subtitle">Отправьте свое видео</div>
            <div className="input-container ic1">
            <video id="video" width="640" height="480" autoplay></video>
            <div className="cut"></div>
        </div>
        <button type="text" className="submit" onclick="addState">Далее</button>
    </div>
    )
}

export default Video;