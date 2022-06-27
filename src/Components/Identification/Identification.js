import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, CardContent, Typography, Link as Nv } from '@mui/material';
import {IMaskInput} from "react-imask";
import axios from "axios";
import React, { useState } from "react";
import "./Identification.css";
import { useNavigate} from "react-router";
import { useRef } from 'react';
import '../../Config';
import { useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import getCookies from '../../hooks/getCookies';
  
export const Identification  = () => {
    const [open, setOpen] = React.useState(false); 
    const codeMask = "0000";  
    let navigate = useNavigate();
    const [secureCode, setCode] = useState("");
    const [openError, setError] = React.useState(false)
    const [openSuccess, setSuccess] = React.useState(false)
    const [openErrorCount, setErrorCount] = React.useState(false)
    const [openWarning, setWarning] = React.useState(false)
    const [openErrorNull, setErrorNull] = React.useState(false)
    const url = global.config.REST_API + 'api/reset?id='
    const [timer, setTimer] = useState('00:00:00');
    const Ref = useRef(null);
    const [isDisabled, setIsDisabled] = useState(true);
    

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
      };
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
        = getTimeRemaining(e);
        if (total >= 0) {
        setTimer(
          (hours > 9 ? hours : '0' + hours) + ':' +
          (minutes > 9 ? minutes : '0' + minutes) + ':'
          + (seconds > 9 ? seconds : '0' + seconds)
        )
        }
        if(seconds === 0){
          setIsDisabled(false)
        }
  }
    const clearTimer = (e) => {
      setTimer('00:00:60');
      if (Ref.current) clearInterval(Ref.current);
      const id = setInterval(() => {
          startTimer(e);
      }, 1000)
      Ref.current = id;
    } 
    const getDeadTime = () => {
      let deadline = new Date();
      deadline.setSeconds(deadline.getSeconds() + 60);
      return deadline;
    }
    useEffect(() => {
      clearTimer(getDeadTime());
    }, []);

    const onClickReset = () => {
      clearTimer(getDeadTime());
    }
    // Post code 
    function postSecureCode(){
        if(!secureCode || secureCode.length < 4){
          setErrorNull(true)
      }
      else{
      setOpen(!open)
        axios.get( global.config.REST_API + 'api/code?id=' + getCookies('id') + '&code='  + secureCode )
        .then((res) => {  
          setOpen(false); 
            if (res.data.statusCode === 1){
              console.log(res.data)
              setError(true)
            }
            else if(res.data.statusCode === 2){
              console.log(res.data)
              setError(true)  
            }
            else if(res.data.statusCode === 3){
              console.log(res.data)
              setWarning(true)
            }
            else{
            console.log(res.data)
            navigate('/idcard')
            }
          })
        .catch(error =>{
            console.error(error);
            setError(true);
            setOpen(false)
            }
        )
    }
  }


      const resendNumber = () => {
        setIsDisabled(true)
        onClickReset()
        axios
        .get(url + getCookies('id'))
          .then((res) => {
            setSuccess(true)
            setOpen(false); 
            if (res.data.statusCode === 1){
              setError(true)
            }
            else if(res.data.statusCode === 2){
              setError(true)
            }
            else if(res.data.statusCode === 3){
              setWarning(true)
            }
            else if(res.data.statusCode === 6){
              console.log(res.data)
              setSuccess(false)
              setErrorCount(true)
            }
            else{
            console.log(res.data)
            }
          })
          .catch((err) => {
            console.log(err)
            setOpen(false)
            setSuccess(false)
            setError(true)
          })
      }
    const closeError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setError(false);
      setErrorCount(false)
      setWarning(false);
      setSuccess(false)
      setErrorNull(false)
    };

return(
  <div className="ident_container">
    <Card className="card-container-ident">
      <CardHeader  sx={{textAlign: "center", marginTop: 2}}
        title="Удаленная идентификация"
      />
      <CardContent sx={{fontSize: "20px", textAlign: 'center'}}>
        <Typography sx={{fontSize: "20px", textAlign: "center", marginBottom: "15px"}} variant="h5" color="text.secondary">
          Введите код из SMS
        </Typography> 
          <IMaskInput
            mask={codeMask}
            id="firstname" 
            className="ident_code"
            onAccept={(value) =>{setCode(value)}}
            value={secureCode}
            autocomplete="off"
          />
        <Button color="success" sx={{ justifyContent: 'center', marginTop: '15px', width: '60%', borderRadius: "15px"}} variant="contained" onClick={postSecureCode} >
            Продолжить
        </Button>
        <Button disabled={isDisabled} color="success" sx={{ justifyContent: 'center', marginTop: '15px', width: '60%', borderRadius: "15px"}} variant="outlined" onClick={resendNumber}>
            Отправить снова
        </Button>
      </CardContent>
      <Typography sx={{textAlign: 'center'}}>
        Отправить код повторно через  {timer}
      </Typography>
    </Card>       
      <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
        open={open} 
        > 
      <CircularProgress color="inherit" /> 
      </Backdrop> 
        <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openErrorCount} autoHideDuration={3000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка. Истечено количество попыток!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorNull} autoHideDuration={3000} onClose={closeError}>
        <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
          Введите код чтобы продолжить!
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={closeError}>
        <Alert onClose={closeError} severity="success" sx={{ width: '100%' }}>
          Успешно!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Повторите заново!
        </Alert>
      </Snackbar>
      <Snackbar open={openWarning} autoHideDuration={3000} onClose={closeError}>
        <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
          Время сессии прошло или сервис недоступен! Повторите попытку.
        </Alert>
      </Snackbar>
    </Stack>
  </div>
)
}

export default Identification;