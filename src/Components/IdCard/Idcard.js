import {Backdrop, CircularProgress, Stack, Snackbar, Button, Card, CardHeader, CardContent, Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from 'react';
import axios from "axios";
import React, {useState} from "react";
import { useNavigate } from "react-router";
import "./Idcard.css";
import '../../Config';
import { getCookies } from '../../hooks/cookies';
axios.defaults.headers.post['Content-Type'] = 'multipart';

  const Idcard = () => {
    const navigate = useNavigate()
    const [selectedFileFront, setSelectedFileFront] = useState();
    const [selectedFileBack, setSelectedFileBack] = useState();
    const [open, setOpen] = useState(false); 
    const [openError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [previewFront, setPreviewFront] = useState();
    const [previewBack, setPreviewBack] = useState();
    const [isSendFront, setSendFront] = useState(false);

  const onFileChangeFront = (event) => {
    setSelectedFileFront(event.target.files[0])
    setSelectedFileFront (event.target.files[0])
  };
  useEffect(() => {
    if (!selectedFileFront) {
      setPreviewFront(undefined)
      return
    };
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

const onFileUpload = () => {
  if(!getCookies('id')){
    setErrorMsg('Время сессии истекло. Начните заново.')
    setError(true)
  }
  else if(!selectedFileBack || !selectedFileFront){
    setErrorMsg('Ошибка! Загрузите фото паспорта!')
    setError(true)
  }
  else if(isSendFront){
      const formDataBack = new FormData();
      formDataBack.append(
      "backSide",
      selectedFileBack,
      selectedFileBack.name
    );
    formDataBack.append(
      'id',
      getCookies('id')
    )
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
          setErrorMsg('Ошибка запроса')
          setError(true)
          setOpen(false)
        }
        else if(res.data.statusCode === 2){
          setErrorMsg('Технические проблемы. Повторите позже')
          setError(true)
          setOpen(false)

        }
        else if(res.data.statusCode === 3){
          setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
          setError(true)
          setOpen(false)
        }
        else if (res.data.statusCode === 5){
          setErrorMsg('Плохое качество фото. Загрузите фото обратной стороны снова.')
          setError(true)
        }
        else if (res.data.statusCode === 7){
          setErrorMsg('Ваш паспорт скоро истечет. Просьба заменить ваш паспорт')
          setError(true)
        }
        else{
          navigate('/camera')
        }
      })
      .catch(error =>{
          setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
          setError(true)
          setOpen(false)
        }
      )
  }
  else{
    setOpen(true); // Open loading
    const formDataFront = new FormData();
    const formDataBack = new FormData();
    // Adding data to fomdDate
    formDataFront.append(
      "frontSide",
      selectedFileFront,
      selectedFileFront.name
    );
    formDataFront.append(
      'id',
      getCookies('id')
    )
    formDataBack.append(
      "backSide",
      selectedFileBack,
      selectedFileBack.name
    );
    formDataBack.append(
      'id',
      getCookies('id')
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
        setErrorMsg('Ошибка запроса!')
        setError(true)
      }
      else if(res.data.statusCode === 2){
        setErrorMsg('Технические проблемы. Повторите запрос позже.')
        setError(true)
      }
      else if(res.data.statusCode === 3){
        setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
        setError(true)
      }
      else if (res.data.statusCode === 5){
        setErrorMsg('Плохое качество фото. Загрузите фото лицевой стороны снова.')
        setError(true)
      }
      else{
        setSendFront(true)
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
              setErrorMsg('Ошибка запроса!')
              setError(true)
              setOpen(false)
            }
            else if(res.data.statusCode === 2){
              setErrorMsg('Технические проблемы. Повторите запрос позже.')
              setError(true)
              setOpen(false)
            }
            else if(res.data.statusCode === 3){
              setErrorMsg('Время ожидания запроса вышло. Повторите снова.')
              setError(true)
              setOpen(false)
            }
            else if (res.data.statusCode === 5){
              setErrorMsg('Плохое качество фото. Загрузите фото обратной стороны снова. ')
              setError(true)
            }
            else if (res.data.statusCode === 7){
              setErrorMsg('Ваш паспорт скоро истечет. Просьба заменить ваш паспорт')
              setError(true)
            }
            else{
            navigate('/camera')
            }
        })
          .catch(error =>{
            setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
            setError(true)
            setOpen(false)
          }
          )
      }
    })
    .catch(error =>{
      console.error(error)
      setErrorMsg('Ошибка сервера или отсутствует интернет. Повторите позже пожалуйста!')
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
      <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="warning" sx={{ width: '100%' }}>
          {errorMsg}
        </Alert>
      </Snackbar>
    </Stack>
  </div>
  )
}

export default Idcard;  