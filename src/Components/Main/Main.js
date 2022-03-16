import React, { useEffect, useState } from "react";
import "./Main.css";
import { IMask, IMaskInput } from "react-imask";
import axios from "axios";
import { useNavigate } from "react-router";
import { render } from "@testing-library/react";

const Main = ({setId}) => {

  const PhoneMask = "{996}000000000";
  let navigate = useNavigate(); 
  const [number, setNumber] = useState("");
  const [idNum , setIdNum] = useState("");

function postData(){
  axios
  (
    {
      url: 'http://192.168.41.33:8080/api/number',
      method: 'POST',
      headers: {'content-type': 'application/JSON'},
      data: { 
        number: number
      }
    }
  ) 
  .then((res) => { setId(res.data.id);
    navigate(-1)
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

