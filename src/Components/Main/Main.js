import React from "react";
import "./Main.css"
import { IMask } from 'react-imask'
import axios from "axios";



function Main(){
    return(
        <div className="main_form">
            <div className="main_title">Введите номер телефона:</div>
            <input class="form-input-phone" id="phone-number" name="phone"   type="text" inputmode="decimal" placeholder="996 (___) --- / ---"/>
            <button id="main-btn" className="main_submit" onClick={getNumber}>Продолжить</button>
        </div>
    )
}

document.addEventListener("DOMContentLoaded", function () {
        let phoneMask = IMask(document.getElementById('phone-number'), {
            mask: '+{996} (000) 000-000'
        })
    })

const getNumber = () =>{
    let number = document.getElementById('phone-number').value;

}

axios.post("url", 



)

export default Main;