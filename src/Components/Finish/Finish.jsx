import {Stack, Snackbar, Card, CardContent, Typography, CardActions} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, {useState} from "react";
import "./Finish.css";
import { useNavigate } from "react-router";
import {useEffect } from 'react';

const Finish = ({identType, id}) => {
  // Values
  const [openSuccess, setSuccess] = useState(false);
  const [openError, setError] = useState(false);
  const [openError04, setError04] = useState(false);
  const [openWarning, setWarning] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if(!id){
      navigate('/')
    }
  });

  // Alerts function
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const closeError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setError04(false);
    setWarning(false);
    setSuccess(false);
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
          <CardContent>
            <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="p">
              Удаленная Идентификация
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '10px'}}>
              Поздравляем ваша идентификация {identType} на расмотрении. Вам будет прислано сообщение на телефон.
            </Typography>
          </CardContent>
        <CardActions >
        </CardActions>
      </Card>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeError}>
          <Alert onClose={closeError} severity="success" sx={{ width: "100%" }}>
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

        <Snackbar open={openWarning} autoHideDuration={6000} onClose={closeError}>
          <Alert onClose={closeError} severity="warning" sx={{ width: "100%" }}>
            Пожалуйста ожидайте!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};
export default Finish;
