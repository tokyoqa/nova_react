import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, CardContent, Typography} from '@mui/material';
import {IMask, IMaskInput} from "react-imask";
import MuiAlert from '@mui/material/Alert';
import {useNavigate} from "react-router";
import React, {useState} from "react";
import axios from "axios";
import '../../Config';
import './Main.css';

const Main = ({setId}) => {
// Values
const [number, setNumber] = useState("");
const [email, setEmail] = useState("");
// const [mail, setMail] = React.useState("Dsa");
const [openLoading, setOpenLoading] = React.useState(false); 
const [openSuccess, setSuccess] = React.useState(false);
const [openError, setError] = React.useState(false);
const [openError04, setError04] = React.useState(false);
const [openWarning, setWarning] = React.useState(false);
const [openInfo, setInfo] = React.useState(false);
const PhoneMask = "{996}000000000";
const MailMask = /^\S*@?\S*$/;
let   navigate = useNavigate(); 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const closeError = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setSuccess(false);
  setError(false);
  setError04(false)
  setWarning(false);
  setInfo(false);

};


 async function postData(){
  if(!number.length || number.length < 12){
    setError(true)
  }
  else if(!email.length){
    setError(true)
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
          number: number,
          email: email

        }
      }
    )
    .then((res) => {
      setId(res.data.id);
      setOpenLoading(false);
      if (res.data.statusCode === 1){
        setError(true)
      }
      else if(res.data.statusCode === 2){
        setError(true)
      }
      else if(res.data.statusCode === 3){
        setWarning(true)
      }
      else if(res.data.statusCode === 4){
        setError04(true)
      }
      else{
      navigate('/identification')
      console.log(res.data)
      }
    })
    .catch((err) => {
      console.log(err)
      setOpenLoading(false)
      setError(true)
    })
  }

}

return (
  <div className='container-main'>
    <Card className='card-container-main' >
      <CardHeader  sx={{textAlign: "center", padding: 0, marginTop: 2}}
        title="Удаленная идентификация"
      />
      <CardContent  sx={{fontSize: "20px", textAlign: 'center'}}>
        <Typography sx={{fontSize: "20px", textAlign: "center", marginBottom: "15px"}} variant="h5" color="text.secondary">
            Введите номер:
        </Typography> 
        <IMaskInput
          mask={PhoneMask}
          className="form-input-phone"
          onAccept={(value) => {setNumber(value)}}
          value={number}
          placeholder="+996 000 000 000"
        />
        <IMaskInput
          mask={MailMask}
          className="form-input-mail"
          onAccept={(valueEmail) => {setEmail(valueEmail)}}
          value={email}
          placeholder="email@exampe.com"
        />
        <Button color="success" className="main_submit" sx={{ justifyContent: 'center', marginTop: '30px', width: '60%', borderRadius: "15px"}} variant="contained" onClick={postData}>
            Продолжить 
        </Button>
      </CardContent>
    </Card>       

    <Backdrop 
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
        open={openLoading} 
    > 
    <CircularProgress color="inherit" /> 
    </Backdrop> 
    <Stack spacing={2} sx={{ width: '100%' }}>

    <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeError}>
      <Alert onClose={closeError} severity="success" sx={{ width: '100%' }}>
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

    <Snackbar open={openWarning} autoHideDuration={6000} onClose={closeError}>
      <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
        Пожалуйста ожидайте!
      </Alert>
    </Snackbar>

    <Snackbar open={openInfo} autoHideDuration={6000} onClose={closeError}>
      <Alert onClose={closeError} severity="info" sx={{ width: '100%' }}>
        This is a info message!
      </Alert>
    </Snackbar>
  </Stack>

  </div>
);
}
export default Main;