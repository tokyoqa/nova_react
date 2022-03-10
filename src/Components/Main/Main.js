import React, { useEffect, useState } from "react";
import "./Main.css";
import { IMask, IMaskInput } from "react-imask";
import axios from "axios";
import { useNavigate } from "react-router";

const PhoneMask = "{996}000000000";
function Main() {
  let navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(""); 

function postDate (){
  axios.post('http://192.168.41.35:8088/api/save?phoneNumber='+ number)
  .then(function(response){
    console.log(response);
    setResult(response)
    navigate('identification')
  })
  .catch(function(error){
    console.log(error)
    setResult(error)
  });
}

  return (
    <div className="main_form">
      <div className="main_title">Введите номер телефона:</div>
      <IMaskInput
        mask={PhoneMask}
        className="form-input-phone"
        onAccept={(value) => {setNumber(value)}}
        value={number}
        placeholder="+996 000 000 000"
      />
      <button id="main-btn" className="main_submit" onClick={postDate}>
        Продолжить
      </button>
    </div>
  );
}



export default Main;

