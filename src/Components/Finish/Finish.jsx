import {
  Backdrop,
  CircularProgress,
  Stack,
  Alert,
  Checkbox,
  Snackbar,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import "./Finish.css";

const Finish = ({identType}) => {
  // Values
  const [openSuccess, setSuccess] = React.useState(false);
  const [openError, setError] = React.useState(false);
  const [openError04, setError04] = React.useState(false);
  const [openWarning, setWarning] = React.useState(false);
  const [openInfo, setInfo] = React.useState(false);
  let navigate = useNavigate();

  // Alerts functions
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "250px",
    width: "400px",
    margin: "0 auto",
    marginTop: "30px"
  };

  return (
    <div>
     <Card style={cardStyle}>
        <CardActionArea>
          <CardContent>
            <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="p">
              Удаленная Идентификация
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '10px'}}>
              Поздравляем ваша идентификация {identType} на расмотрении. Вам будет прислано сообщение на телефон.
            </Typography>
            
          </CardContent>
        </CardActionArea>
        <CardActions >
        </CardActions>
      </Card>

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
export default Finish;
