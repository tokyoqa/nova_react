import React, { useEffect, useState } from "react";
import "./Main.css";
import { IMask, IMaskInput } from "react-imask";
import axios from "axios";
const PhoneMask = "+{996}(000)00-00-00";

function Main() {
  const [number, setNumber] = useState("");
  //вот так делается запрос (на самом деле можно было бы все на редакс перенести но это долго, мб потом сделаем)
  const [result, setResult] = useState(""); 
  function setData(){
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(function (response) {
      console.log(response);
      setResult(response); 
    })
    .catch(function (error) {
      console.log(error);
      setResult(error); 
    });
  } 
  return (
    <div className="main_form">
      <div className="main_title">Введите номер телефона:</div>
      <IMaskInput
        mask={PhoneMask}
        className="form-input-phone"
        value={number}
        onAccept={(value) => {setNumber(value)}}
        placeholder="+996 000 00 00 00"
      />
      <button id="main-btn" className="main_submit" onClick={()=>{setData()}}>
        Продолжить
      </button>
    </div>
  );
}

export default Main;
