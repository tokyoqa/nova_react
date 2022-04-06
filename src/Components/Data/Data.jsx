import {Backdrop, CircularProgress, Select, Snackbar, Button, InputLabel, MenuItem ,FormControl , Box, Checkbox, TextField } from '@mui/material';
import React from "react"
import {useEffect } from 'react';
import './Data.css'
import axios from "axios";
import {useNavigate} from "react-router";
import '../../Config';
import MuiAlert from '@mui/material/Alert';


const Data = ({id})  => {
  // Variables 
  const navigate = useNavigate()
  const [name, setName] = React.useState('Данияр');
  const [surname, setSurname] = React.useState("Болотбеков");
  const [patronymic , setPatronymic ] = React.useState("Кубанычбекович");
  const [docId, setDocId] = React.useState("0567702");
  const [inn, setInn] = React.useState("21004200150070");
  const [gender, setGender] = React.useState('')
  const [authority, setAuthority] = React.useState("МКК219051");
  const [openSuccess, setSuccess] = React.useState(false);
  const [openError, setError] = React.useState(false)
  const [openError04, setError04] = React.useState(false)
  const [openWarning, setWarning] = React.useState(false)
  const [openInfo, setInfo] = React.useState(false)
  const [open, setOpen] = React.useState(false); 
  const [openErrorNull, setErrorNull] = React.useState(false)
  const [dateBirth, setDateBirth] = React.useState('')
  const [dateStart, setDateStart] = React.useState('')
  const [dateEnd, setDateEnd] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [typeId, setTypeId] = React.useState('')
  let submitionValue = ''
  // useEffect(() => {
  //   if(!id){
  //     navigate('/')
  //   }
  // });

  if(checked === true){
    submitionValue = 'Y'
  }
  else{
    submitionValue = 'N'
  }
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  const sendData = () =>{
    if(!name || !surname || !patronymic || !docId || !inn || !gender || !authority || !dateBirth || !dateEnd || !dateStart || !checked){
      setErrorNull(true)
    }
    else{
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
          id: id,
          name : name,
          surname : surname,
          patronymic: patronymic,
          gender : gender,
          dateBirth: dateBirth,
          docId : typeId + docId,
          dateStart: dateStart,
          dateEnd: dateEnd,
          authority: authority,
          inn: inn,
          submission : submitionValue
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
    setError04(false)
    setErrorNull(false)
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
  const handleChangeTypeId = (event) => {
    setTypeId(event.target.value);
  };

  
  return(
    <div className="container">
      <div className="doc-form">
        <h2>Заполните пожалуйста поля:</h2>
        <form className="send-form">
          <div className="form__item">
            <TextField
            fullWidth label="Имя:" id="fullWidth" 
            inputProps={{maxLength: 15}}
            onChange={e => setName(e.target.value)}/>
          </div>
          <div className="form__item">
            <TextField 
            fullWidth label="Фамилия:" id="fullWidth"  
            inputProps={{maxLength: 20}}
            onChange={e => setSurname(e.target.value)}/>
          </div>
          <div className="form__item">
            <TextField 
            inputProps={{maxLength: 20}}
            fullWidth label="Отчество:" id="fullWidth" onChange={e => setPatronymic(e.target.value)}/>
          </div>
          <div className="form__item">
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
          </div>
          <div className="form__item">

          </div>
          <div className="form__item" >
            <label htmlFor="birthday">Срок действия:</label> <br/>
            <input type="date" id="birthday"  onChange={e => setDateEnd(e.target.value)}/>
          </div>
          <div className="form__item item__id type-id">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Тип паспорта</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Тип паспорта"
                value={typeId}
                onChange={handleChangeTypeId}
                >
                <MenuItem value={'ID'}>ID</MenuItem>
                <MenuItem value={'AN'}>AN</MenuItem>
                </Select>
            </FormControl>
          </Box>
          </div>
          <div className="form__item item__id">
            <TextField fullWidth label="ID:" id="fullWidth" inputProps={{maxLength: 7}}  placeholder="ID/IN" onChange={e => setDocId(e.target.value)}/>
          </div>

          <div className="form__item">
            <label htmlFor="date-end">Дата рождения</label><br/>
            <input type="date" id="date-end"  onChange={e => setDateBirth(e.target.value)}/>
          </div>
          <div className="form__item">
           <TextField fullWidth label="Орган выдачи:" inputProps={{maxLength: 9}} id="fullWidth" onChange={e => setAuthority(e.target.value)}/>
          </div>

          <div className="form__item">
            <label htmlFor="date-start">Дата выдачи</label><br/>
            <input type="date" id="date-start"  onChange={e => setDateStart(e.target.value)}/>
          </div>

          <div className="form__item">
            <TextField 
            fullWidth label="ИНН:" 
            type="text" id="fullWidth" 
            inputProps={{maxLength: 14}}
            onChange={e => setInn(e.target.value)}/>
          </div>
          <div className="form__item">
            <input type="checkbox" name="accept-checkbox" checked={checked} onChange={e => setChecked(e.target.checked)}/>
            <label htmlFor=" accept-checkbox" > Нажимая вы принимаете соглащение об обработке данные </label>
          </div>
          <div className="form__item">
            <Button variant="contained" color="success" onClick={sendData}>
              Продолжить
            </Button> 
          </div>
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

      <Snackbar open={openErrorNull} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Пожалуйста заполните все поля!
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