import React from "react";
import "./Identification.css";

function Identification (){
    return(
        <div className="ident_form">
            <div className="ident_title">Идентификация</div>
            <div className="ident_subtitle">Введите код из SMS</div>
            <input id="firstname" className="ident_input" type="number" placeholder="__/__"/>
            <button className="ident_submit">Далее</button>
            <button className="ident_submit resend">Отправить код повторно</button>
        </div>
    )
}

export default Identification;