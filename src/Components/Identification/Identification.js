import axios from "axios";
import React, { useState } from "react";
import { IMask, IMaskInput } from "react-imask";
import "./Identification.css";
import { Backdrop, CircularProgress, Button } from '@mui/material';
import { useNavigate } from "react-router";
import '../../Config';


export const Identification  = ({ id }) => {
    const [open, setOpen] = React.useState(false); 
    const codeMask = "0000"; 
    let navigate = useNavigate();
    const [secureCode, setCode] = useState("");
    let errorCode01 = false
    let errorCode02 = false
    let errorCode03 = false
    let errorCode04 = false
  

    function postSecureCode(){
        setOpen(!open); 
        axios.get( global.config.REST_API + 'api/code?id=' + id + '&code='  + secureCode )
        .then((res) => { 

            console.log(res.data)
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
            navigate('/idcard')
            console.log(res.data)
            }
          })
        .catch(error =>{
            if (error.responce){
                console.log(error.response.status);
            }
            else if(error.request){
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
        })
    }

    return(
        <div className="ident_form">
            <div className="ident_title">Идентификация</div>
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
            <Backdrop 
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
          open={open} 
          > 
          <CircularProgress color="inherit" /> 
        </Backdrop> 

        </div>
    )
}



export default Identification;