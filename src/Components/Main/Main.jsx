import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, InputLabel, Select, TextField,
CardContent, Typography, FormControl, MenuItem } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import { useInputValue } from 'react-haiku';
import React, {useState} from "react";
import axios from "axios";
import '../../Config';
import './Main.css';

const Main = ({setId}) => {
// Values
const [number, setNumber] = useInputValue('');
const [openLoading, setOpenLoading] = React.useState(false); 
const [openNumberError, setNumberError] = React.useState(false);
const [openNumberErrorCode, setNumberErrorCode] = React.useState(false)
const [openError, setError] = React.useState(false);
const [openError04, setError04] = React.useState(false);
const [openTimeOut, setTimeOut] = React.useState(false);
const [openError500, setError500] = React.useState(false)
const [openErrorCount, setErrorCount] = React.useState(false)
const [code, setCode] = React.useState('');
let   navigate = useNavigate(); 
let fullNumber = code + number
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
console.log(fullNumber)

const handleChangeCode = (event) => {
  setCode(event.target.value);

};

const closeError = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setNumberError(false);
  setError(false);
  setError04(false)
  setErrorCount(false)
  setError500(false)
  setNumberErrorCode(false)
};

 async function postData(){
  if(!number.length || number.length < 9){
    setNumberError(true)
  }
  else if (!code){
    setNumberErrorCode(true)
  }
  else
  {
    setError(false)
    setOpenLoading(!openLoading); 
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
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          withCredentials: true,
          mode: 'no-cors'
        },
        data: { 
          number: fullNumber
        }
      }
    )
    .then((res) => {
      setId(res.data.id);
      setOpenLoading(false);
      if (res.data.statusCode === 1){
        console.log(res.data)
        setNumberError(true)
      }
      else if(res.data.statusCode === 2){
        console.log(res.data)
        setError(true) 
      }
      else if(res.data.statusCode === 3){
        console.log(res.data)
        setTimeOut(true)
      }
      else if(res.data.statusCode === 4){
        console.log(res.data)
        setError04(true)
      }
      else if(res.data.statusCode === 6){
        console.log(res.data)
        setErrorCount(true)
      }
      else{
      navigate('/identification')
      console.log(res.data)
      }
    })
    .catch((err) => {
      console.log(err)
      setOpenLoading(false)
      setError500(true)
    })
  }
}

return (
  <div className='main-container'>
    <Card className='main-card'>
      <CardHeader  className='main-card__header' title="Удаленная идентификация"/>
      <CardContent className='main-card__content'>
        <Typography sx={{marginBottom: '20px'}} variant="h5" color="text.secondary">
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
            <MenuItem value={+996}>+996</MenuItem>
            <MenuItem value={+7}>   +7 </MenuItem>
          </Select>
      </FormControl>
      <TextField sx={{marginTop: '9px'}}
        value={number}
        id="outlined-number"
        label="Номер"
        type="number"
        placeholder='700 000 000'
        onChange={setNumber}
        InputLabelProps={{
          shrink: true,
      }}
      />
        {/* <IMaskInput
          mask={PhoneMask}
          className="form-input-phone"
          onAccept={(value) => {setNumber(value)}}
          value={number}
          placeholder="+996 (000) 000-000"
        /> */}
        <Button color="success" className="main_submit" 
          sx={{ justifyContent: 'center', marginTop: '30px', width: '60%', borderRadius: "15px"}} variant="contained" onClick={postData}>
            Продолжить 
        </Button>
      </CardContent>
    </Card>       
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
        open={openLoading}> 
      <CircularProgress color="inherit" /> 
      </Backdrop>
  <Stack spacing={2} sx={{ width: '100%' }}>
    <Snackbar open={openNumberError} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
        Введите правильный номер!
      </Alert>
    </Snackbar>
    <Snackbar open={openNumberErrorCode} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
        Выберите код страны 
      </Alert>
    </Snackbar>
    <Snackbar open={openError} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        Ошибка! Повторите снова!
      </Alert>
    </Snackbar>
    <Snackbar open={openError500} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
        Ошибка сервера. Повторите позже пожалуйста!
      </Alert>
    </Snackbar>
    <Snackbar open={openError04} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        Ошибка! Такой пользователей существует!
      </Alert>
    </Snackbar>
    <Snackbar open={openErrorCount} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
        Превышено количество запросов с этого номера. Попробуйте повторить завтра!
      </Alert>
    </Snackbar>
    <Snackbar open={openTimeOut} autoHideDuration={3000} onClose={closeError}>
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
        Прошло время ожидания. Повторите ошибку.
      </Alert>
    </Snackbar>
  </Stack>
  </div>
);
}
export default Main;