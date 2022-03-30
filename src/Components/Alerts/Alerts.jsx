import React from "react";
import {Stack, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({setError, setInfo, setSuccess, setWarning}) {

    // setSuccess(true);

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

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={setSuccess} autoHideDuration={6000} onClose={closeSucces}>
        <Alert onClose={closeSucces} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>

      <Snackbar open={setError} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          This is a error message!
        </Alert>
      </Snackbar>

      <Snackbar open={setWarning} autoHideDuration={6000} onClose={closeWarning}>
        <Alert onClose={closeWarning} severity="warning" sx={{ width: '100%' }}>
          This is a warning message!
        </Alert>
      </Snackbar>

      <Snackbar open={setInfo} autoHideDuration={6000} onClose={closeInfo}>
        <Alert onClose={closeInfo} severity="info" sx={{ width: '100%' }}>
          This is a info message!
        </Alert>
      </Snackbar>
    </Stack>
  );
}