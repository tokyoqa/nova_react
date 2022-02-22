import React from "react";
import "./Identification.css";

function Identification (){
    return(
        <div className="form">
        <div className="title">Идентификация</div>
        <div className="subtitle">Введите 6ти значный код</div>
            <div className="input-container ic1">
                <input id="firstname" className="input" type="text" placeholder=" "/>
                <div className="cut"></div>
                <label for="firstname" className="placeholder">00-00-00</label>
            </div>
        <button type="text" className="submit" onclick="addState(),window.location.reload()">Далее</button>
        <button type="text" className="submit code">Отправить код повторно</button>
        </div>
    )
}


export default Identification;