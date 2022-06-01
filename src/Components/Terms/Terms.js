import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentOutlinedIcon         from '@mui/icons-material/AssignmentOutlined';
import React from "react";
import "./Terms.css";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  Backdrop,
  CircularProgress,
  Stack,
  Alert,
  Checkbox,
  Snackbar,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  checkboxClasses
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useEffect } from "react";
import { fontSize } from '@mui/system';

export const Terms = ({ id, setIdentType }) => {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const url = global.config.REST_API + "api/submission?";
  const [openSuccess, setSuccess] = React.useState(false);
  const [openError, setError] = React.useState(false);
  const [openError04, setError04] = React.useState(false);
  const [openWarning, setWarning] = React.useState(false);
  const [openInfo, setInfo] = React.useState(false);
  const [check, setChecked] = React.useState()
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-nHeaders": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    withCredentials: true,
    mode: "no-cors",
  };
  // useEffect(() => {
  //   if(!id){
  //     navigate('/')
  //   }
  // });

  const handleChangeChecked = (event) => {
    if(event.target.checked){
      setChecked(true)
      
    }
    else if (!event.checked){
      setChecked(false)
    }
    // if (!event.target.checked) {
    //   setChecked(true);
    //   console.log(check)
    //   console.log('not')

    // } 
    // else if(event.target.checked) {
    //   console.log('checked')
    //   setChecked(false);
    //   console.log(check)
    // }
  };


  const agreeSubmit = () => {
    // setOpen(!true)
    if(!check || check === undefined){
      setOpen(false)
      setError(true)
      
      
    }
    else{
      navigate('/video')

    }

    // axios
    //   .get(url + "id=28check=Y")
    //   // .get(url + "id=" + id + "&check=Y")
    //   .then((res) => {
    //     console.log(res.data);
    //     setOpen(false);
    //     if (res.data.statusCode === 1) {
    //     } else if (res.data.statusCode === 2) {
    //     } else if (res.data.statusCode === 3) {
    //     } else if (res.data.statusCode === 4) {
    //     } else {
    //       navigate("/video");
    //       setIdentType('Full')
    //       setOpen(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setError(true);
    //     setOpen(false);
    //   });
    // navigate("/video");
  };

  const disagreeSubmit = () => {
      navigate('/finish')

    // setOpen(!true)
    // if(check === "N"){
    //   setError(true)
      
    // }
    // else{
    //   setError(false)
    //   setOpen(false)
    //   navigate('/finish')
    // }
    // //  axios
    //   .get(url + "id=" + id + "&check=N")
    //   .then((res) => {
    //     setOpen(false);
    //     if (res.data.statusCode === 1) {
    //       setError(true);
    //     } else if (res.data.statusCode === 2) {
    //       setError(true);
    //     } else if (res.data.statusCode === 3) {
    //       setWarning(true);
    //     } else if (res.data.statusCode === 5) {
    //       setError(true);
    //     } else {
    //       setOpen(false)
    //       setIdentType('Lite')
    //       console.log(setIdentType)
    //       navigate("/finish");
    //     }
    //   })

    //   .catch((err) => {
    //     console.error(err);
    //     setError(true);
    //     setOpen(false);
    //   });
  };

  const closeSucces = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setError04(false);
  };

  const closeWarning = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setWarning(false);
  };

  const closeInfo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setInfo(false);
  };
  // CSS Styles
  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "350px",
    width: "500px",
    margin: "0 auto",
    marginTop: "10px"
  };




  return (
    <div>
      <Card style={cardStyle}>
          <CardContent>
            <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="p">
              Удаленная Идентификация
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '10px'}}>
              Поздравляем ваша идентификация (Lite) на расмотрении. Нажмите "Закончить" чтобы перейти конечную страницу.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '5px'}}>
              Если хотите пройти Full идентификацию. Для этого нажмите на кнопку "Продолжить"
            </Typography>
            <FormControlLabel sx={{marginTop: 2}}
            control={ 
              <Checkbox onChange={handleChangeChecked} name="" />
            }
            label={<Typography  variant="body2" color="textSecondary">Подтверждаю согласие на сбор, обработку и передачу персональных данных</Typography>}
          />
          </CardContent>
        <CardActions >
          <Button sx={{margin: '0 auto', marginTop: '20px'}} variant="contained" 
                  endIcon={<AssignmentOutlinedIcon />} onClick={disagreeSubmit}>
            Закончить
          </Button>
          <Button  sx={{margin: '0 auto', marginTop: '20px'}} variant="contained" 
                  endIcon={<AssignmentTurnedInOutlinedIcon />} onClick={agreeSubmit}>
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
        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={closeSucces}
        >
          <Alert
            onClose={closeSucces}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a openSuccess message!
          </Alert>
        </Snackbar>

        <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
          <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
            Ошибка! Повторите заново!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openError04}
          autoHideDuration={6000}
          onClose={closeError}
        >
          <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
            Ошибка! Такой пользователей существует!
          </Alert>
        </Snackbar>

        <Snackbar
          open={openWarning}
          autoHideDuration={6000}
          onClose={closeWarning}
        >
          <Alert
            onClose={closeWarning}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Пожалуйста ожидайте!
          </Alert>
        </Snackbar>

        <Snackbar open={openInfo} autoHideDuration={6000} onClose={closeInfo}>
          <Alert onClose={closeInfo} severity="info" sx={{ width: "100%" }}>
            This is a info message!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default Terms;
