import React, {useEffect, useState} from "react";
import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import {useNavigate} from "react-router";
import MuiAlert from "@mui/material/Alert";
import {getCookies, setCookies} from '../../hooks/cookies';
import axios from "axios";
import "./Terms.css";
// axios.defaults.timeout === 10000000;


export const Terms = () => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const url = global.config.REST_API + "api/submission?";
  const [openError, setError] = useState(false);
  const [openErrorServer, setErrorServer] = useState(false);
  const [errorMsgServer, setErrorMsgServer] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const [check, setChecked] = useState('')
  const idCookie = getCookies('id')
  const [isDisabledNext, setDisabledNext] = useState(true);
  const [isDisabledEnd, setDisabledEnd] = useState(true);
  const [agreement, setAgreement] = useState('')
  const [value, setValue] = React.useState('female');

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (event) => {
    setAgreement(event.target.value)
    setDisabledEnd(false)
    setDisabledNext(false)
  }

  useEffect(() => {
    if (agreement === '-1') {
      setDisabledNext(true)
    }
  })

  const agreeSubmit = (event) => {
    setOpen(true)
    if (!agreement) {
      setErrorMsg('Нажмите на принятие условий')
      setError(true)
    } else if (!idCookie) {
      setOpen(false)
      setErrorMsg('Время сессии истекло. Начните занова')
      setError(true)
    } else if (agreement === '-1') {
      setErrorMsg('Вы отказались от соглашения оферты и не можете продолжить дальше!')
      setError((true))
    } else {
      axios({
        method: 'get',
        url: url + "id=" + idCookie + "&check=0",
        timeout: 100000 * 2, // Let's say you want to wait at least 180 seconds
      }).then((res) => {
        setOpen(false);
        if (res.data.statusCode === 1) {
          setErrorMsg('Ошибка запроса. Повторите занова')
          setError(true)
        } else if (res.data.statusCode === 2) {
          setErrorMsg('Технические проблемы. Повторите позже')
          setError(true)
        } else if (res.data.statusCode === 3) {
          setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
          setError(true)
        } else {
          setCookies('check_word', res.data.secretWord)
          navigate("/video");
          setOpen(false);
        }
      })
        .catch((err) => {
          setOpen(false);
          if (err.res) {
            console.error(err);
          } else {
            setErrorMsgServer('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
            setErrorServer(true);
          }

        });
    }
  };

  const disagreeSubmit = () => {
    setOpen(true)
    if (!agreement) {
      setOpen(false)
      setErrorMsg('Нажмите на принятие условий')
      setError(true)
    } else {
      axios({
        method: 'get',
        url: url + "id=" + getCookies('id') + "&check=" + agreement,
        timeout: 1800000, // Let's say you want to wait at least 180 seconds
      }).then((res) => {
        setOpen(false);
        if (res.data.statusCode === 1) {
          setErrorMsg('Ошибка запроса. Повторите занова')
          setError(true);
        } else if (res.data.statusCode === 2) {
          setErrorMsg('Технические проблемы. Повторите позже')
          setError(true);
        } else if (res.data.statusCode === 3) {
          setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
          setError(true);
        } else {
          setOpen(false);
          navigate("/finish");
        }
      })
        .catch((err) => {
          console.error(err);
          setErrorMsgServer('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
          setErrorServer(true);
          setOpen(false);
        });
    }
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setErrorServer(false)
  };

  return (
    <div>
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
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={agreement}
              onChange={handleChange}
            >
              <FormControlLabel value="1" control={<Radio/>} label={
                <Typography sx={{fontSize: '12px', marginTop: '10px'}} variant="body2">
                  Я ознакомлен и принимаю условия <a
                  href="https://ab.kg/guarddog/laravel-filemanager/files/shares/dogovorpublichnoyoferty.pdf">договора
                  публичной оферты Банка</a>
                </Typography>}
              />
              <FormControlLabel value="-1" control={<Radio/>} label={
                <Typography sx={{fontSize: '12px', marginTop: '10px'}} variant="body2">
                  Я ознакомлен и не принимаю условия <a
                  href="https://ab.kg/guarddog/laravel-filemanager/files/shares/dogovorpublichnoyoferty.pdf">договора
                  публичной оферты Банка</a>
                </Typography>}
              />
            </RadioGroup>
          </FormControl>

        </CardContent>
        <CardActions>
          <Button sx={{margin: '0 auto', marginTop: '10px'}} variant="outlined"
                  endIcon={<AssignmentOutlinedIcon/>} onClick={disagreeSubmit}
                  disabled={isDisabledEnd}>
            Завершить
          </Button>
          <Button sx={{margin: '0 auto', marginTop: '10px'}} variant="contained"
                  endIcon={<AssignmentTurnedInOutlinedIcon/>} onClick={agreeSubmit}
                  disabled={isDisabledNext}>
            Продолжить
          </Button>
        </CardActions>
      </Card>

      <Backdrop
        sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={open}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>

      <Stack spacing={2} sx={{width: "100%"}}>
        <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
          <Alert onClose={closeError} severity="warning" sx={{width: "100%"}}>
            {errorMsg}
          </Alert>
        </Snackbar>
        <Snackbar open={openErrorServer} autoHideDuration={6000} onClose={closeError}>
          <Alert onClose={closeError} severity="error" sx={{width: "100%"}}>
            {errorMsgServer}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default Terms;
