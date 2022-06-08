import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, CardContent, Typography, Link as Nv } from '@mui/material';
import {IMaskInput} from "react-imask";
import axios from "axios";
import React, { useState } from "react";
import "./Identification.css";
import { useNavigate } from "react-router";
import '../../Config';
import { useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
  
export const Identification  = ({id}) => {
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
    const [counter, setCounter] = React.useState(60);
    const [isDisabled, setIsDisabled] = useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    useEffect(() => {
      if(!id){
        navigate('/')
      }
    });

    function postSecureCode(){
        if(!secureCode && secureCode < 4){
          setErrorNull(true)
      }
      else{
      setOpen(!open)
        axios.get( global.config.REST_API + 'api/code?id=' + id + '&code='  + secureCode )
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
        axios
        .get(url + id)
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
          console.log(id)
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
  <div className="ident_form">
    <Card className={"card-container-ident"}>
      <CardHeader  sx={{textAlign: "center", padding: 0, marginTop: 2}}
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
          />
        <Button color="success" sx={{ justifyContent: 'center', marginTop: '15px', width: '60%', borderRadius: "15px"}} variant="contained" onClick={postSecureCode} >
            Продолжить
        </Button>
        <Button disabled={isDisabled} color="success" sx={{ justifyContent: 'center', marginTop: '15px', width: '60%', borderRadius: "15px"}} variant="contained" onClick={resendNumber}>
            Отправить снова
        </Button>
      </CardContent>
      <Typography sx={{textAlign: 'center'}}>
        Отправить код повторно через  00:{counter}
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