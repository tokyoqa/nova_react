import React, { useEffect, useState } from "react";
import "./Main.css";
import { IMask, IMaskInput } from "react-imask";
import axios from "axios";
import { useNavigate } from "react-router";
import '../../Config';
const Main = ({setId}) => {

  const PhoneMask = "{996}000000000";
  let navigate = useNavigate(); 
  const [number, setNumber] = useState("");

 async function postData(){
  axios
  (
    {
      url: global.config.REST_API + 'api/number',
      method: 'GET',
      mode: 'no-cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
      },
      data: { 
        number: number
      }

    }
  ) 
  .then((res) => { setId(res.data.id);
    navigate('/identification')
    console.log(res)
  })
  .catch((err) => console.log(err))

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
      <button id="main-btn" className="main_submit" onClick={postData}>
        Продолжить
      </button>
    </div>
  );

}

export default Main;