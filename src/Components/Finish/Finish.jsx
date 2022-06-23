import {Stack, Snackbar, Card, CardContent, Typography, CardActions, Button} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import React, {useState} from "react";
import "./Finish.css";
import { useNavigate } from "react-router";

const Finish = ({id}) => {
  // Values
  const [openError, setError] = useState(false);
  const [openError04, setError04] = useState(false);
  const [openWarning, setWarning] = useState(false);
  const navigate = useNavigate()

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
  };


  const goHome = () => {
    navigate('/')
  }

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "250px",
    width: "400px",
    margin: "0 auto",
    marginTop: "30px",
    textAlign: 'center'
  };

  return (
    <div>
     <Card style={cardStyle}>
          <CardContent>
            <Typography sx={{textAlign: 'center', fontSize: '22px'}} gutterBottom variant="h5" component="p">
              Удаленная Идентификация
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: "14px", textAlign: 'text-justify', marginTop: '10px', padding: '0 2px 0 2px'}}>
              Поздравляем! Ваша заявка на рассмотрении. <br/>
              При успешной идентификации, на указанный Вами номер, будет отправлен СМС с логином и паролем от АБ24.
            </Typography>
            <Button id="reset-btn" color='success' sx={{ margin: '0 auto', marginTop: '60px', width: "50%", textAlign: 'center'}} variant="contained" onClick={goHome}>
            На главную 
          </Button>
          </CardContent>
        <CardActions >
        </CardActions>
      </Card>
      <Stack spacing={2} sx={{ width: "100%" }}>

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
