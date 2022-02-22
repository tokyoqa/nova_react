import React from "react";
import styles from "./Identification.css";

function Identification (){
    return(
        <div class="form">
        <div class="title">Идентификация</div>
        <div class="subtitle">Введите 6ти значный код</div>
            <div class="input-container ic1">
                <input id="firstname" class="input" type="text" placeholder=" "/>
                <div class="cut"></div>
                <label for="firstname" class="placeholder">00-00-00</label>
            </div>
        <button type="text" class="submit" onclick="addState(),window.location.reload()">Далее</button>
        <button type="text" class="submit code">Отправить код повторно</button>
        </div>
    )
}


export default Identification;