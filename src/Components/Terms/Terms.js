import React, {useState} from "react";
import {
  Backdrop,
  CircularProgress,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Snackbar,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import {useNavigate} from "react-router";
import MuiAlert from "@mui/material/Alert";
import {getCookies, setCookies} from '../../hooks/cookies';
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
    const [isDisabledNext, setDisabledNext] = useState(true);
    const [isDisabledEnd, setDisabledEnd] = useState(true);
    const [agreement, setAgreement] = useState('')
    const [value, setValue] = React.useState('female');

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    // const handleChangeCheckedAgree = (event) => {
    //   if (!event.target.checked) {
    //     setChecked('1')
    //     setCheckedDisagree(false)
    //     setCheckedAgree(true)
    //     setDisabledEnd(true)
    //     setDisabledNext(true)
    //   } else {
    //     setChecked('0')
    //     setCheckedDisagree(false)
    //     setCheckedAgree(false)
    //     setDisabledEnd(false)
    //     setDisabledNext(false)
    //   }
    // };

    const handleChange = (event) => {
      setAgreement(event.target.value)
      setDisabledEnd(false)
      setDisabledNext(false)
    }


    const agreeSubmit = (event) => {
      if (!agreement) {
        setOpen(false)
        setErrorMsg('Нажмите на принятие условий')
        setError(true)
      } else if (!idCookie) {
        setErrorMsg('Время сессии истекло. Начните занова')
        setError(true)
      } else if (agreement === '-1') {
        setErrorMsg('Вы отказались от соглашения аферты и не можете продолжить дальше!')
        setError((true))
      } else {
        axios
          .get(url + "id=" + idCookie + "&check=0")
          .then((res) => {
            setOpen(false)
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
            console.error(err);
            setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
            setError(true);
            setOpen(false);
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
        axios
          .get(url + "id=" + getCookies('id') + "&check=" + agreement)
          .then((res) => {
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
            setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
            setError(true);
            setOpen(false);
          });
      }
    };

    const closeError = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setError(false);
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
                  <Typography variant="body2">
                    Я подтверждаю, что ознакомлен и принимаю все условия договора публичной оферты Банка*
                  </Typography>}
                />
                <FormControlLabel value="-1" control={<Radio/>} label={
                  <Typography variant="body2">
                    Я подтверждаю, что ознакомлен и не принимаю все условия договора публичной оферты Банка*
                  </Typography>}
                />
              </RadioGroup>
            </FormControl>

            {/*<FormControlLabel sx={{marginTop: 2}}*/}
            {/*                  control={*/}
            {/*                    <Checkbox onChange={handleChangeCheckedAgree} name="" color={"success"} checked={checkedAgree}/>*/}
            {/*                  }*/}
            {/*                  label={<Typography variant="body2">*/}
            {/*                    Я подтверждаю, что ознакомлен и принимаю все  условия договора публичной оферты Банка*/}
            {/*                  </Typography>}*/}
            {/*/>*/}
            {/*<FormControlLabel sx={{marginTop: 2}}*/}
            {/*                  control={*/}
            {/*                    <Checkbox onChange={handleChangeCheckedAgree} name="" color={"error"}/>*/}
            {/*                  }*/}
            {/*                  label={<Typography variant="body2">*/}
            {/*                    Я подтверждаю, что ознакомлен и не принимаю все  условия договора публичной оферты Банка*/}
            {/*                  </Typography>}*/}
            {/*/>*/}

          </CardContent>
          <CardActions>
            <Button sx={{margin: '0 auto', marginTop: '10px'}} variant="outlined"
                    endIcon={<AssignmentOutlinedIcon/>} onClick={disagreeSubmit}
                    disabled={isDisabledEnd}>
              Закончить
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
            <Alert onClose={closeError} severity="error" sx={{width: "100%"}}>
              {errorMsg}
            </Alert>
          </Snackbar>
        </Stack>
      </div>

    );
  }
;

export default Terms;
