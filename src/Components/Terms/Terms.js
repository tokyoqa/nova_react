import React  from "react";
import "./Terms.css"
import { useNavigate } from "react-router";
import axios from "axios";
import {Backdrop, CircularProgress, Stack, Alert, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useEffect } from 'react';


export const Terms = ({id}) => {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const url = global.config.REST_API + 'api/submission?'
    const [openSuccess, setSuccess] = React.useState(false);
    const [openError, setError] = React.useState(false)
    const [openError04, setError04] = React.useState(false)
    const [openWarning, setWarning] = React.useState(false)
    const [openInfo, setInfo] = React.useState(false)
  

    

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const headers ={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-nHeaders': '*',
            'Access-Control-Allow-Methods': '*',
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            withCredentials: true,
            mode: 'no-cors'
    }
    useEffect(() => {
      if (performance.navigation.type === 1 ) {
        navigate('/')
      }

      if(!id){
        navigate('/')
      }
    });


    const agreeSubmit = () => {
    setOpen(!open); 
        axios
            .get(url + 'id=' + id + '&check=Y')
            .then(res => {console.log(res.data)
                setOpen(false)
                if (res.data.statusCode === 1){
                }
                else if(res.data.statusCode === 2){
                }
                else if(res.data.statusCode === 3){
                }
                else if(res.data.statusCode === 4){
                }
                else{
                  navigate('/video')
                  setOpen(false)
                }
            
            })
            .catch(err => {
                console.error(err)
                setError(true)
                setOpen(false)
            })
    }

    const disagreeSubmit = () => {
    setOpen(!open); 
        axios
            .get(url + "id="+ id + '&check=N')
            .then(res => {
                setOpen(false)
                if (res.data.statusCode === 1){
                  setError(true)
                }
                else if(res.data.statusCode === 2){
                  setError(true)
                }
                else if(res.data.statusCode === 3){
                  setWarning(true)
                }
                else if(res.data.statusCode === 5){
                  setError(true)
                }
                else{
                    setOpen(false)
                    navigate('/')} 
                })
            
            .catch(err => {
                console.error(err)
                setError(true)
                setOpen(false)
            })
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
        setError04(false)
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
        <div className="terms_form">
        <div className="terms_title">Идентификация:</div>
        <div className="terms_subtitle">Вы хотите пройти видео-идентификацию?</div>
        <button className="terms_submit" onClick={agreeSubmit}>Да хочу</button>
        <button className="terms_submit" onClick={disagreeSubmit}>Нет не хочу</button>
        {/* <div className="terms_info"> <a href="#">Информация о лимитах</a></div> */}
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

      <Snackbar open={openError04} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Такой пользователей существует!
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

export default Terms;