import React from "react";
import "./Main.css"


function Main(){
    return(
        <div classNameName="form">
         <div classNameName="title">Здраствуйте</div>
         <div classNameName="subtitle">Давайте пройдем идентификацию</div>
         <div classNameName="input-container ic1">
          <input id="firstname" classNameName="input" type="number" placeholder="" />
          <div classNameName="cut"></div>
          <label for="firstname" classNameName="placeholder">+996(556)-68-00-00</label>
        </div>
        <button type="text" classNameName="submit" onclick="addState(),window.location.reload()">Далее</button>
        </div>
    )
}

export default Main;