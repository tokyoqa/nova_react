import React, {useState} from "react";
import { Backdrop, CircularProgress, Stack, Checkbox, Snackbar, FormControlLabel, Button, Card, CardContent, Typography, CardActions,} from "@mui/material";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon         from '@mui/icons-material/AssignmentOutlined';
import { useNavigate } from "react-router";
import MuiAlert from "@mui/material/Alert";
import { getCookies, setCookies } from '../../hooks/cookies';
import axios from "axios";
import "./Terms.css";

export const Terms = () => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const url = global.config.REST_API + "api/submission?";
  const [openError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [check, setChecked] = useState('')
  const idCookie = getCookies('id')
  const [isDisabledNext, setDisabledNext] = React.useState(true);
  const [isDisabledEnd, setDisabledEnd] = React.useState(true);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleChangeChecked = (event) => {
    if(!event.target.checked){
      setChecked('1')
      setDisabledEnd(true)
      setDisabledNext(true)
    }
    else{
      setChecked('0')
      setDisabledEnd(false)
      setDisabledNext(false)
    }
  };

  const agreeSubmit = (event) => {
      if(!check || check === '1'){
        setOpen(false)
        setErrorMsg('Нажмите на принятие условий')
        setError(true)
      } 
      else if(!idCookie) {
        setErrorMsg('Время сессии истекло. Начните занова')
        setError(true)
      } else { 
        setOpen(true)
          axios
          .get(url + "id=" + idCookie + "&check=0")
          .then((res) => {
            setOpen(false)
            console.log(res.data);
            setOpen(false);
            if (res.data.statusCode === 1) {
              setErrorMsg('Ошибка запроса. Повторите занова')
              setError(true)
              console.log(res.data)
            } 
            else if (res.data.statusCode === 2) {
              setErrorMsg('Технические проблемы. Повторите позже')
              setError(true)
              console.log(res.data)
            } 
            else if (res.data.statusCode === 3) {
              setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
              setError(true)
              console.log(res.data)
            } 
            else {
              setCookies('check_word' , res.data.secretWord)
              navigate("/video");
              setOpen(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
          setError(true);
          setOpen(false);
        });
      }
    };

  const disagreeSubmit = () => {
      if(!check || check === '1'){
        setOpen(false)
        setError(true)
      } else
      {
      axios
      .get(url + "id=" + getCookies('id') + "&check=1")
      .then((res) => {
        setOpen(false);
        if (res.data.statusCode === 1) {
          setErrorMsg('')
          setError(true);
        } else if (res.data.statusCode === 2) {
          setErrorMsg('')
          setError(true);
        } else if (res.data.statusCode === 3) {
          setErrorMsg('')
          setError(true);
        } else if (res.data.statusCode === 5) {
          setErrorMsg('')
          setError(true);
        } else {
          setOpen(false)
          navigate("/finish");
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg('')
        setError(true);
        setOpen(false);
      });
      navigate('/finish')
    }
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  return (
    <div >
      <Card className="cardStyle">
          <CardContent>
            <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="p">
              Удаленная идентификация
            </Typography>
            <Typography variant="body2" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '10px'}}>
              Поздравляем! Ваша заявка на фото-идентификацию находится на стадии рассмотрения. 
              Нажмите "Закончить" для завершения идентификации.
            </Typography>
            <Typography variant="body2" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '10px'}}>
              Для расширения возможностей необходимо пройти видео-идентификацию. Для этого нажмите "Продолжить" 
            </Typography>
            <Typography className="terms-text-link" variant="body2" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '10px'}}>
              <a className='link-terms' href="https://ab.kg/guarddog/laravel-filemanager/files/shares/dogovorpublichnoyoferty.pdf" target="_blank">
                Здесь Вы можете ознакомиться с условиями видео- и фото-идентификаций
              </a>
            </Typography>
            <FormControlLabel sx={{marginTop: 2}}
            control={ 
              <Checkbox onChange={handleChangeChecked} name="" />
            }
            label={<Typography  variant="body2">
              Подтверждаю согласие на сбор, обработку и передачу персональных данных
              </Typography>}
          />
          </CardContent>
        <CardActions >
          <Button sx={{margin: '0 auto', marginTop: '10px'}} variant="outlined"
                  endIcon={<AssignmentOutlinedIcon />} onClick={disagreeSubmit}
                  disabled={isDisabledEnd}>
            Закончить
          </Button>
          <Button  sx={{margin: '0 auto', marginTop: '10px'}} variant="contained"
                  endIcon={<AssignmentTurnedInOutlinedIcon />} onClick={agreeSubmit}
                  disabled={isDisabledNext}>
            Продолжить
          </Button>
        </CardActions>
      </Card>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
          <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
            {errorMsg} 
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  
  );
};

export default Terms;
