import React  from "react";
import styles from "./Terms"


function Terms(){
    return(

        <div className="form">
        <div className="title">Идентификация</div>
        <div className="subtitle">Вы хотите пройти видео-идентификацию</div>
        <button type="text" className="submit" onclick="addclick(),window.location.reload()">Да хочу</button>
        <input type="file" accept="image/*" onchange="loadFile(event)"/>
        <img id="output"/>
        <script href="js/main.js"></script>
      <button type="text" className="submit" onclick="addState(),window.location.reload()">Нет не хочу</button>
     </div>

    )
}

export default Terms;