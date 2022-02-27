import React from "react";
import "./Identification.css";

function Identification (){
    return(
        <div className="ident_form">
        <div className="ident_title">Идентификация</div>
        <div className="ident_subtitle">Введите 6-ти значный код</div>
        <input id="firstname" className="ident_input" type="number" placeholder="00-00-00"/>
        <button className="ident_submit">Далее</button>
        <button className="ident_submit resend">Отправить код повторно</button>
        </div>
    )
}

export default Identification;