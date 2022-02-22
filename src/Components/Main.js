import React from "react";
import styles from "./Main.css"


function Main(){
    return(
        <div class="form">
         <div class="title">Здраствуйте</div>
         <div class="subtitle">Давайте пройдем идентификацию</div>
         <div class="input-container ic1">
          <input id="firstname" class="input" type="number" placeholder="" />
          <div class="cut"></div>
          <label for="firstname" class="placeholder">+996(556)-68-00-00</label>
        </div>
        <button type="text" class="submit" onclick="addState(),window.location.reload()">Далее</button>
        </div>
    )
}

export default Main;