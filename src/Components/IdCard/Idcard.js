import React, { Component } from "react";
import "./Idcard.css"

class Idcard extends Component {
    render(){
    return(
        <div className="form">
             <div className="title">Идентификация</div>
             <div className="subtitle">Вставьте фото пасспорта</div>
             <div className="input-container ic1">
             <input type="file" accept="image/*" onchange="loadFile(event)"/>
             <img id="output"/>
            </div>

            <div className="input-container2 ic2">
                <input type="file" accept="image/*" onchange="loadFile(event)"/>
                <img id="output"/>
               </div>
               <button type="text" className="submit" onclick="addState(),window.location.reload()">Далее</button>
            </div>

    )
}
}

export  default Idcard;