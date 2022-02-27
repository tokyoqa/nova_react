import { render } from "@testing-library/react";
import React from "react";
import "./Main.css"


function Main(){
    return(
        <div className="main_form">
            <div className="main_title">Введите номер телефона:</div>
            <input  className="main_input" type="tel" placeholder="+966(---)------"/>
            <button id="main_btn" className="main_submit">Далее</button>
        </div>
    )
}



export default Main;