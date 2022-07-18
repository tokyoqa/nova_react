import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, InputLabel, Select, CardContent, Typography, FormControl, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import { useInputValue } from 'react-haiku';
import { IMaskInput } from 'react-imask';
import React, {useState} from "react";
import axios from "axios";
import '../../Config';
import './Main.css';
import { setCookies, removeCookies } from '../../hooks/cookies';

const Main = () => {
  // Values
  const [number, setNumber] = useInputValue('');
  const [errorMsg, setErrorMsg] = useState('')
  const [openLoading, setOpenLoading] = useState(false);
  const [openError, setError] = useState(false);
  const [code, setCode] = React.useState('+996');
  const kgMask = '(000) 000 - 000';
  const ruMask = '(000) 000 - 00 - 00';
  let   navigate = useNavigate();
  let   fullNumber = code + number;
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleChangeCode = (event) => {
    setCode(event.target.value);
    setNumber('');
  };
  const closeError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

   function postData() {
      removeCookies('id')
      var flag = false;
      if (code === '+996' && number.length !== 15 ) {
        flag = true;
      } else if (code === '+7' && number.length !== 19) {
        flag = true;
      } 
      if (flag) {
        setError(true)
        setErrorMsg('Введите правильный номер!')
      } else {
      setError(false)
      setOpenLoading(!openLoading); 
      axios ({
        url: global.config.REST_API + 'api/number',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-nHeaders': '*',
          'Access-Control-Allow-Methods': '*',
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          withCredentials: true,
          mode: 'no-cors'
        },
        data: { 
          number: fullNumber
        }
        }).then((res) => {
          setCookies('id', res.data.id)
          setOpenLoading(false);
          if (res.data.statusCode === 1) {
            console.log(res.data)
            setErrorMsg('Введите правильный номер!')
            setError(true)
          } else if (res.data.statusCode === 2) {
            console.log(res.data)
            setErrorMsg('Технические проблемы. Повторите позже')
            setError(true)
          } else if (res.data.statusCode === 3) {
            console.log(res.data)
            setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
            setError(true)
          } else if(res.data.statusCode === 4) {
            console.log(res.data)
            setErrorMsg('Ошибка! Такой пользователей существует!')
            setError(true)
          } else if(res.data.statusCode === 6) {
            setErrorMsg('Превышено количество запросов с этого номера. Попробуйте повторить завтра!')
            setError(true)
            console.log(res.data)
          } else {
            navigate('/identification')
            console.log(res.data)
          }
        }).catch((err) => {
          setOpenLoading(false)
          setError(true)
          setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
          console.log(err)
        })
    }
  }

  return (
    <div className='main-container'>
      <Card className='main-card'>
        <CardHeader sx={{paddingBottom: '0'}} className='main-card__header' title="Удаленная идентификация"/>
        <CardContent className='main-card__content'>
          <Typography sx={{marginBottom: '20px', fontSize: '20px'}} variant="h5" color="text.secondary">
            Введите номер:
          </Typography>
          <FormControl required sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-required-label">Код</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={code}
              label="Код"
              onChange={handleChangeCode}
            >
              <MenuItem value={'+996'}>+996</MenuItem>
              <MenuItem value={'+7'}>+7 </MenuItem>
            </Select>
        </FormControl>
            <IMaskInput
            autoFocus={true}
            mask={(code === '+996' ? kgMask : ruMask)}
            className="form-input-phone"
            onAccept={(value) => {setNumber(value)}}
            value={number}
            placeholder={(code === '+996'  ? "(000) 000 - 000" : '(000) 000 - 00 - 00')}
            />
          <Button 
            color="success" 
            className="main_submit" 
            sx={{ justifyContent: 'center', marginTop: '20px', width: '60%', borderRadius: "15px"}}
            variant="contained" 
            onClick={postData}
            >
              Продолжить 
          </Button>
        </CardContent>
        <Typography sx={{fontSize: '13px', textAlign: 'center', color: '#B22222', marginTop: '8px', padding: "0 20px 0 20px"}} variant="h5" color="text.secondary">
          Просьба идентификацию проходить через браузеры Google Chrome или Safari
        </Typography>
      </Card>


    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
      open={openLoading}> 
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
  );
}
export default Main;