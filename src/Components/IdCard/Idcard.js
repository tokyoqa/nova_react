import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, CardContent, Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from 'react'
import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router";
import "./Idcard.css"
import '../../Config';

  axios.defaults.headers.post['Contect-Type'] = 'multipart';
  const Idcard = ({id}) => {
  const navigate = useNavigate()
  const [selectedFileFront, setSelectedFileFront] = useState();
  const [selectedFileBack, setSelectedFileBack] = useState()
  const [open, setOpen] = React.useState(false); 
  const [openError, setError] = React.useState(false)
  const [openErrorFront, setErrorFront] = useState(false)
  const [openErrorBack, setErrorBack] = useState(false)
  const [openErrorFiles, setErrorFiles] = React.useState(false)
  const [openWarning, setWarning] = React.useState(false)
  const [previewFront, setPreviewFront] = useState()
  const [previewBack, setPreviewBack] = useState()
  const onFileChangeFront = (event) => {
      setSelectedFileFront(event.target.files[0])
      setSelectedFileFront (event.target.files[0])
    };
  useEffect(() => {
    if (!selectedFileFront) {
      setPreviewFront(undefined)
      return
    }
    const objectUrlFront = URL.createObjectURL(selectedFileFront)
    setPreviewFront(objectUrlFront)
    return () => URL.revokeObjectURL(objectUrlFront)
  }, [selectedFileFront])

  const onFileChangeBack = (event) => {
    setSelectedFileBack(event.target.files[0])
    setSelectedFileBack (event.target.files[0])
  };
    
  useEffect(() => {
    if (!selectedFileBack) {
      setPreviewBack(undefined)
      return
    }

    const objectUrlBack = URL.createObjectURL(selectedFileBack)
    setPreviewBack(objectUrlBack)
    return () => URL.revokeObjectURL(objectUrlBack)
  }, [selectedFileBack])

  // useEffect(() => {
  //   if(!id){
  //     navigate('/')
  //   }
  // });

const onFileUpload = () => {
  if(!selectedFileBack || !selectedFileFront){
    setErrorFiles(true)
  }
  else{
    setOpen(true); 
    const formDataFront = new FormData();
    const formDataBack = new FormData();
    formDataFront.append(
      "frontSide",
      selectedFileFront,
      selectedFileFront.name
    );
    formDataFront.append(
      'id',
      id
    )

    formDataBack.append(
      "backSide",
      selectedFileBack,
      selectedFileBack.name
    );
    formDataBack.append(
      'id',
        id
    )
    axios({
        method: 'POST',
        url: global.config.REST_API + 'api/passport-front',
        data: formDataFront,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
        }
    })
    .then((res) => {
      setOpen(false)
      if (res.data.statusCode === 1){
        console.log(res.data)
        setError(true)
      }
      else if(res.data.statusCode === 2){
        console.log(res.data)
        setError(true)
      }
      else if(res.data.statusCode === 3){
        console.log(res.data)
        setWarning(true)
      }
      else if (res.data.statusCode === 5){
        console.log(res.data)
        setErrorBack(true)
      }
      else{
      setOpen(true); 
      axios({
        method: 'POST',
        url: global.config.REST_API + 'api/passport-back',
        data: formDataBack,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': '*',
        }
      })

        .then((res) => {
          setOpen(false); 
          if (res.data.statusCode === 1){
            console.log(res.data)
            setError(true)
            setOpen(false)
          }
          else if(res.data.statusCode === 2){
            console.log(res.data)
            setError(true)
            setOpen(false)

          }
          else if(res.data.statusCode === 3){
            console.log(res.data)
            setWarning(true)
            setOpen(false)
          }
          else if (res.data.statusCode === 5){
            console.log(res.data)
            setErrorFront(true)

          }
          else{
          navigate('/camera')
          console.log(res.data)
          }
        })
          .catch(error =>{
            console.log(error)
            setError(true)
            setOpen(false)
          }
                )
      }
    })
    .catch(error =>{
      console.log(error)
      setError(true)
      setOpen(false)
    }
    )
  };
  }
      
  const closeError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
    setErrorFiles(false)
    setErrorFront(false)
    setErrorBack(false)
    setWarning(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "500px",
    width: "500px",
    margin: "0 auto",
    marginTop: "10px"
  };

return (
  <div className='idcard_box'>
    <Card styles={cardStyle} sx={{margin: '0 auto',  marginTop: '20px', border: 1, borderColor: 'grey.300'}}>
      <CardHeader  sx={{textAlign: "center", padding: 0, marginTop: 2}}
        title="Удаленная идентификация"
      />
      <CardContent sx={{fontSize: "20px", textAlign: 'center'}}>
        <Typography sx={{fontSize: "20px", textAlign: "center", marginBottom: "15px"}} variant="h5" color="text.secondary">
          Фотографии паспорта
        </Typography> 
        <div className="photo-area">
            <div className="photo-item">
              <form id="front_passport_form" >
                
                <label className="photo-item-label">
                  <img 
                  className='front-preview'
                  src={previewFront}
                  alt=''
                  />
                  <input
                      type="file" 
                      onChange={onFileChangeFront}
                      name="front_passport" 
                      id="front_passport" 
                      />
                </label>

                <div className="photo-item-title">Лицевая сторона</div>
              </form>
                </div>
                  <div className="photo-item">
                    <form  id="back_passport_form" encType="multipart/form-data">
                      <label className="photo-item-label" >
                        <img 
                        className='back-preview'
                        src={previewBack}
                        alt=''
                        />
                        <input 
                        type="file" 
                        onChange={onFileChangeBack}
                        name="back_passport" 
                        id="back_passport/file"
                        style={{backgroundImage: `src(${previewBack})`}}
                        />
                      </label>
                      <div className="photo-item-title">Обратная сторона</div>
                    </form>
                  </div>
               </div>
        <Button color="success" sx={{ justifyContent: 'center', marginTop: '10px', width: '60%', borderRadius: "15px"}} variant="contained" onClick={onFileUpload} >
            Продолжить
        </Button>
      </CardContent>
    </Card>       
      <Backdrop 
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
      open={open} 
      > 
      <CircularProgress color="inherit" /> 
      </Backdrop> 
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openErrorBack} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Плохое качество фото. Загрузите фото лицевой стороны снова.  
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorFront} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Плохое качество фото. Загрузите фото обратной стороны снова.  
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Повторите заново!
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorFiles} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Загрузите фото паспорта!
        </Alert>
      </Snackbar>
      <Snackbar open={openWarning} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
          Пожалуйста ожидайте!
        </Alert>
      </Snackbar>
    </Stack>
  </div>
  )
}
export default Idcard;  