import React from "react"
import {useEffect } from 'react';
import './Data.css'
import {TextField } from '@mui/material'; 
import MuiAlert from '@mui/material/Alert';
import {Backdrop, CircularProgress, Select, Snackbar, Button, InputLabel, MenuItem ,FormControl , Box} from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router";
import '../../Config';



const Data = ({id})  => {



  // Variables 
  const navigate = useNavigate()
  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [patronymic , setPatronymic ] = React.useState();
  const [docId, setDocId] = React.useState();
  const [inn, setInn] = React.useState();
  const [gender, setGender] = React.useState('')
  const [authority, setAuthority] = React.useState();
  const [openSuccess, setSuccess] = React.useState(false);
  const [openError, setError] = React.useState(false)
  const [openError04, setError04] = React.useState(false)
  const [openWarning, setWarning] = React.useState(false)
  const [openInfo, setInfo] = React.useState(false)
  const [open, setOpen] = React.useState(false); 
  const [dateBirth, setDateBirth] = React.useState('')
  const [dateStart, setDateStart] = React.useState('')
  const [dateEnd, setDateEnd] = React.useState('')


  useEffect(() => {
    if(!id){
      navigate('/')
    }
  });
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const sendData = () =>{
    setOpen(true)
    axios
    ({
      url: global.config.REST_API + 'api/data',
      method: "POST",
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
      data:{
        id : id,
        name : name,
        surname : surname,
        patronymic: patronymic,
        gender : gender,
        date: dateBirth,
        docId : docId,
        dateStart: dateStart,
        dateEnd: dateEnd,
        authority: authority,
        inn: inn
      }
    })

    .then((res) => {
      setOpen(false); 
      if (res.data.statusCode === 1){
        console.log(res)
        setError(true)
      }
      else if(res.data.statusCode === 2){
        console.log(res)
        setError(true)
      }
      else if(res.data.statusCode === 3){
        console.log(res)
        setWarning(true)
      }
      else if(res.data.statusCode === 4){
        console.log(res)
        setError04(true)
      }
      else{
      navigate('/idcard')
      console.log(res.data)
      }
    })
    .catch((err) => {
      console.log(err)
      setOpen(false)
      setError(true)
    })
  console.log(dateBirth, dateEnd, dateStart)
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
  const handleChange = (event) => {
    setGender(event.target.value);
  };
  
  return(
    <div className="container">
      <div className="doc-form">
        <h2>Заполните пожалуйста поля:</h2>
        <form className="send-form">
          <div className="fio">
            <TextField
            fullWidth label="Имя:" id="fullWidth"      onChange={e => setName(e.target.value)}/>
            <TextField 
            fullWidth label="Фамилия:" id="fullWidth"  onChange={e => setSurname(e.target.value)}/>
            <TextField 
            fullWidth label="Отчество:" id="fullWidth" onChange={e => setPatronymic(e.target.value)}/>
          </div>

          <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Пол</InputLabel>
              <Select
                labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Пол"
              value={gender}
              onChange={handleChange}
              >
              <MenuItem value={'male'}>Мужской</MenuItem>
              <MenuItem value={'female'}>Женский</MenuItem>
              </Select>
          </FormControl>
          </Box>

          <div className="date__birthday" >
            <label htmlFor="birthday">Срок действия:</label> <br/>
            <input type="date" id="birthday"  onChange={e => setDateEnd(e.target.value)}/>
          </div>

          <div>
          <TextField fullWidth label="ID:" id="fullWidth" placeholder="ID/IN132312" onChange={e => setDocId(e.target.value)}/>
          </div>

          <div className="date__end">
            <label htmlFor="date-end">Дата рождения</label><br/>
            <input type="date" id="date-end"  onChange={e => setDateBirth(e.target.value)}/>
          </div>

          <div>
          <TextField fullWidth label="Орган выдачи:" id="fullWidth" onChange={e => setAuthority(e.target.value)}/>
          </div>

          <div className="date__start">
            <label htmlFor="date-start">Дата выдачи</label><br/>
            <input type="date" id="date-start"  onChange={e => setDateStart(e.target.value)}/>
          </div>

          <div>
          <TextField fullWidth label="ИНН:" type="number" id="fullWidth" placeholder="1020130213219"  onChange={e => setInn(e.target.value)}/>
          </div>

          <Button variant="contained" color="success" onClick={sendData}>
            Success
         </Button>
        </form>
      </div>
      <Backdrop 
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
          open={open} 
      > 
      <CircularProgress color="inherit" /> 
      </Backdrop> 
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
    </div>
  )
}


export default Data;