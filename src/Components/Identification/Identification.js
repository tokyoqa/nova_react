import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, CardContent, Typography, Link as Nv } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {IMaskInput} from "react-imask";
import axios from "axios";
import React, { useState } from "react";
import "./Identification.css";
import { useNavigate} from "react-router";
import { useRef } from 'react';
import '../../Config';
import { useEffect } from 'react';
import { getCookies } from '../../hooks/cookies';
  
export const Identification  = () => {
    const [open, setOpen] = React.useState(false);
    const [openError, setError] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState(false)
    const [secureCode, setCode] = useState("");
    const [timer, setTimer] = useState('00:00:00');
    const url = global.config.REST_API + 'api/reset?id='
    const [isDisabled, setIsDisabled] = useState(true);
    const codeMask = "0000";  
    const Ref = useRef(null);
    let navigate = useNavigate();
    

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
  // F5 check
  // useEffect(() => {
  //   if (performance.navigation.type === 1) {
  //     navigate('/')
  //   }
  // })
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
      if(!getCookies('id')){
        setErrorMsg('Ваща сессия истекла. Начните заново.') 
        setError(true)
      }
      else if(!secureCode || secureCode.length < 4){
        setErrorMsg('Введите код чтобы продолжить!')
        setError(true)
      }
      else{
      setOpen(!open)
        axios.get( global.config.REST_API + 'api/code?id=' + getCookies('id') + '&code='  + secureCode )
        .then((res) => {  
          setOpen(false); 
            if (res.data.statusCode === 1){
              setErrorMsg('Неверный код. Попробуйте еще раз')
              setError(true)
            }
            else if(res.data.statusCode === 2){
              setErrorMsg('Технические проблемы. Повторите позже')
              setError(true)
            }
            else if(res.data.statusCode === 3){
              setErrorMsg('Время сессии прошло или сервис недоступен! Повторите попытку.')
              setError(true)
            }
            else if(res.data.statusCode === 6){
              setErrorMsg('Ошибка. Истечено количество попыток!')
            }
            else{
            navigate('/idcard')
            }
          })
        .catch(error =>{
            console.error(error);
            setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
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
            setOpen(false); 
            if (res.data.statusCode === 1){
              setErrorMsg('Неверный код. Попробуйте еще раз')
              setError(true)
            }
            else if(res.data.statusCode === 2){
              setErrorMsg('Технические проблемы. Повторите позже')
              setError(true)
            }
            else if(res.data.statusCode === 3){
              setErrorMsg('Код подтверждения истек! Повторите попытку.')
              setError(true)
            }
            else if(res.data.statusCode === 6){
              setErrorMsg('Ошибка. Истечено количество попыток!')
              setError(true)
              setIsDisabled(true)
              clearTimer()
              setTimeout(event => {
                navigate('/')
              }, 9000);
            }
            else{
            }
          })
          .catch((err) => {
            console.log(err)
            setOpen(false)
            setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
            setError(true);
          })
      }
    const closeError = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setError(false);
    };

return(
  <div className="ident_container">
    <Card className="card-container-ident">
      <CardHeader  sx={{textAlign: "center", paddingBottom: '0'}}
        title="Удаленная идентификация"
      />
      <CardContent sx={{fontSize: "20px", textAlign: 'center'}}>
        <Typography sx={{fontSize: "20px", textAlign: "center", marginBottom: "20px"}} variant="h5" color="text.secondary">
          Введите код из SMS
        </Typography> 
          <IMaskInput
            autoFocus={true}
            mask={codeMask}
            className="ident_code"
            onAccept={(value) =>{setCode(value)}}
            value={secureCode}
            autoComplete="off"
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
        <Snackbar open={openError} autoHideDuration={3000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Stack>
  </div>
)
}

export default Identification;