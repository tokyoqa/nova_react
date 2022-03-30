import axios from "axios";
import React, { useState } from "react";
import { IMask, IMaskInput } from "react-imask";
import "./Identification.css";
import {Backdrop, CircularProgress, Stack, Alert, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router";
import '../../Config';


export const Identification  = ({ id }) => {
    const [open, setOpen] = React.useState(false); 
    const codeMask = "0000"; 
    let navigate = useNavigate();
    const [secureCode, setCode] = useState("");
    const [openSuccess, setSuccess] = React.useState(false);
    const [openError, setError] = React.useState(false)
    const [openError04, setError04] = React.useState(false)
    const [openWarning, setWarning] = React.useState(false)
    const [openInfo, setInfo] = React.useState(false)
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
  

    function postSecureCode(){
      if(!secureCode && secureCode < 4){
        setError(true)
      }
      else{
      setOpen(!open)
        axios.get( global.config.REST_API + 'api/code?id=' + id + '&code='  + secureCode )
        .then((res) => {  
          setOpen(false); 
            if (res.data.statusCode == 1){
              setError(true)
            }
            else if(res.data.statusCode == 2){
              setError(true)
            }
            else if(res.data.statusCode == 3){
              setWarning(true)
            }
            else{
            navigate('/idcard')
            console.log(res.data)
            }
          })
        .catch(error =>{
            console.error(error.data);
            console.log(error.message);
            setError(true);
            setOpen(false)
            }
        )
    }
      }
       


    const closeSucces = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSuccess(false);
    };
    
    const closeError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setError(false);
    };
    
    const closeWarning = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setWarning(false);
    };
    
    const closeInfo = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setInfo(false);
    };
    


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


        <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeSucces}>
        <Alert onClose={closeSucces} severity="success" sx={{ width: '100%' }}>
          This is a openSuccess message!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Повторите заново!
        </Alert>
      </Snackbar>

      <Snackbar open={openWarning} autoHideDuration={6000} onClose={closeWarning}>
        <Alert onClose={closeWarning} severity="warning" sx={{ width: '100%' }}>
          Пожалуйста ожидайте!
        </Alert>
      </Snackbar>

      <Snackbar open={openInfo} autoHideDuration={6000} onClose={closeInfo}>
        <Alert onClose={closeInfo} severity="info" sx={{ width: '100%' }}>
          This is a info message!
        </Alert>
      </Snackbar>
    </Stack>
        </div>
    )
}



export default Identification;