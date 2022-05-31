import {Backdrop, CircularProgress, Stack, Snackbar, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
const [openLoading, setOpenLoading] = React.useState(false); 
const [openSuccess, setSuccess] = React.useState(false);
const [openError, setError] = React.useState(false)
const [openError04, setError04] = React.useState(false)
const [openWarning, setWarning] = React.useState(false)
const [openInfo, setInfo] = React.useState(false)

const PhoneMask = "{996}000000000";
let   navigate = useNavigate(); 


// Alerts functions
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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


 async function postData(){
  if(!number.length || number.length < 12){
    setError(true)
  }
  else
  {
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
          number: number
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
  <div >
{/* className='main_form' */}

    
  {/* //   <div className="main_title">Введите номер: </div>
  //     <IMaskInput
  //       mask={PhoneMask}
  //       className="form-input-phone"
  //       onAccept={(value) => {setNumber(value)}}
  //       value={number}
  //       placeholder="+996 000 000 000"
  //     />
  //   <button id="main-btn" className="main_submit" onClick={postData}>
  //     Продолжить
  //   </button> */}

            
    <Card sx={{ height: "350px", width: "500px", margin: '0 auto' }}>
      <CardHeader  sx={{textAlign: "center"}}
        title="Удаленная идентификация"
      />
      <CardContent sx={{fontSize: "20px", margin: '0 autos'}}>
        <Typography sx={{fontSize: "20px", margin: '0 auto', textAlign: "center"}} variant="h5" color="text.secondary">
            Введите номер:
        </Typography> 
        <IMaskInput
          style={{border: 'solid 1px #000'}}
          mask={PhoneMask}
          className="form-input-phone"
          onAccept={(value) => {setNumber(value)}}
          value={number}
          placeholder="+996 000 000 000"
        />  
        <Button className="main_submit" sx={{margin: '0 auto', marginTop: '30px', width: '70%'}} variant="contained" >
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
);
}
export default Main;