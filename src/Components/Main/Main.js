import React, { useEffect, useState } from "react";
import "./Main.css";
import { IMask, IMaskInput } from "react-imask";
import axios from "axios";
import { useNavigate } from "react-router";
import '../../Config';
import { Backdrop, CircularProgress, Button } from '@mui/material';


const Main = ({setId}) => {
  const PhoneMask = "{996}000000000";
  let navigate = useNavigate(); 
  const [number, setNumber] = useState("");
  const [open, setOpen] = React.useState(false); 
  let errorCode01 = false
  let errorCode02 = false
  let errorCode03 = false
  let errorCode04 = false


 async function postData(){
  setOpen(!open); 
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
    setOpen(false); 
    if (res.data.statusCode == 1){
      errorCode01 = true
    }
    else if(res.data.statusCode == 2){
      errorCode02 = true
    }
    else if(res.data.statusCode == 3){
      errorCode03 = true
    }
    else{
    navigate('/identification')
    console.log(res.data)
    }
  })
  .catch((err) => console.log(err))

}
if(errorCode01 == true)
{
  return(
    <div>
      Ошибка. Повторите еще раз.
    </div>
  )
}

else if(errorCode02 == true)
{
  return(
    <div>
      Ошибка. Технические неполадки. 
    </div>
  )
}
else if(errorCode03 == true)
{
  return(
    <div>
      Ошибка. Время ожидания вышло. 
    </div>
  )
}
else if(errorCode04 == true)
{
  return(
    <div>
      Ошибка. Такой номер уже зарегистрирован. 
    </div>
    )
}
else

  return (

    <div className="main_form">
      <div className="main_title">Front version: 4 </div>
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
      <Backdrop 
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
          open={open} 
          > 
      <CircularProgress color="inherit" /> 
      </Backdrop> 
    </div>
  );

}

export default Main;