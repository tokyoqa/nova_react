import axios from "axios";
import React, { useState } from "react";
import { IMask, IMaskInput } from "react-imask";
import "./Identification.css";
import { useNavigate } from "react-router";


export const Identification  = ({id}) => {
    const codeMask = "0000"; 
    let navigate = useNavigate();
    const [secureCode, setCode] = useState("");
    //const [result, setResult] = useState("");

    function postSecureCode(){
        axios.get('http://192.168.41.33:8080/api/code?id=' + id + '&code='  + secureCode )
        .then(function(response){
            console.log(response);
            //setResult(response)
            navigate = ('/idcard')
        })
        .catch(function(error){
            console.log(error)
            //setResult(error)
        });
        // console.log(idNum, secureCode)
    }

    return(
        <div className="ident_form">
            <div className="ident_title">Идентификация ID = {id}</div>
            <div className="ident_subtitle">Введите код из SMS</div>
            <IMaskInput
            mask={codeMask}
            id="firstname" 
            className="ident_input"
            onAccept={(value) =>{setCode(value)}}
            value={secureCode}
            />
            <button className="ident_submit" onClick={postSecureCode} >Далее</button>
            <button className="ident_submit resend">Отправить код повторно</button>
        </div>
    )
}

export default Identification;