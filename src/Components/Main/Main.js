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
  const [errorCode01, setErrorCode01] = useState(false)
  const [errorCode02, setErrorCode02] = useState(false)
  const [errorCode03, setErrorCode03] = useState(false)
  const [errorCode04, setErrorCode04] = useState(false)


 async function postData(){
  axios
  (
    {
      url: global.config.REST_API + 'api/number',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-nHeaders': '*',
        'Access-Control-Allow-Methods': '*',
        "Access-Control-Allow-Origin": "https://ident.ab.kg:9443/",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        withCredentials: true,
        mode: 'no-cors'

      },
      data: { 
        number: number
      }

    }
  ) 
  .then((res) => { setId(res.data.id);
    if (res.data.statusCode = 1){
        
    } 
    navigate('/identification')
    console.log(res)
  })
  .catch((err) => console.log(err))

}
  return (
    <div className="main_form">
      <div className="main_title">Front version: 3 </div>
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