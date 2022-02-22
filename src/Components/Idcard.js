import React from "react";
import styles from "./Idcard.css"

function Idcard () {
    return(
        <div class="form">
             <div class="title">Идентификация</div>
             <div class="subtitle">Вставьте фото пасспорта</div>
             <div class="input-container ic1">
             <input type="file" accept="image/*" onchange="loadFile(event)"/>
             <img id="output"/>
            </div>

            <div class="input-container2 ic2">
                <input type="file" accept="image/*" onchange="loadFile(event)"/>
                <img id="output"/>
               </div>
               <button type="text" class="submit" onclick="addState(),window.location.reload()">Далее</button>
            </div>

    )
}

export  default Idcard;