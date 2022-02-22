import React from "react";
import "./Identification.css";

function Identification (){
    return(
        <div classNameName="form">
        <div classNameName="title">Идентификация</div>
        <div classNameName="subtitle">Введите 6ти значный код</div>
            <div classNameName="input-container ic1">
                <input id="firstname" classNameName="input" type="text" placeholder=" "/>
                <div classNameName="cut"></div>
                <label for="firstname" classNameName="placeholder">00-00-00</label>
            </div>
        <button type="text" classNameName="submit" onclick="addState(),window.location.reload()">Далее</button>
        <button type="text" classNameName="submit code">Отправить код повторно</button>
        </div>
    )
}


export default Identification;