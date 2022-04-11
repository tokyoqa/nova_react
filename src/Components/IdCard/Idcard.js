import {Backdrop, CircularProgress, Stack, Alert, Snackbar} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from 'react'
import axios from "axios";
import React, { Component, useState, } from "react";
import { useNavigate } from "react-router";
import "./Idcard.css"
import '../../Config';

    axios.defaults.headers.post['Contect-Type'] = 'multipart';

    const Idcard = ({id}) => {
    const navigate = useNavigate()
    const [selectedFileFront, setSelectedFileFront] = useState();
    const [selectedFileBack, setSelectedFileBack] = useState()
    const [open, setOpen] = React.useState(false); 
    const [openSuccess, setSuccess] = React.useState(false);
    const [openError, setError] = React.useState(false)
    const [openError05, setError05] = React.useState(false)
    const [openErrorFiles, setErrorFiles] = React.useState(false)
    const [openWarning, setWarning] = React.useState(false)
    const [previewFront, setPreviewFront] = useState()
    const [previewBack, setPreviewBack] = useState()
    const [openInfo, setInfo] = React.useState(false)
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
        const formData = new FormData();
  
        formData.append(
          "frontSide",
          selectedFileFront,
          selectedFileFront.name
        );
        formData.append(
          "backSide",
          selectedFileBack,
          selectedFileBack.name
        );
        formData.append(
            'id',
            id
        )
        axios({
            method: 'POST',
            url: global.config.REST_API + 'api/passport',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            enctype: "multipart/form-data"
        })

        .then((res) => {
          setOpen(false); 
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
            setError05(true)
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
      };
      }
      
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
        setErrorFiles(false)
        setError05(false)
      };
      const closeErrorFiles = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setErrorFiles(false)
        setError05(false)
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
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

return (
  <div className="registration-form-2">
    <div className="form-box mb32">
      <div className="form-legend mb12">Идентификация</div>
        <p className="site-p mb20">  
        Фото вашего паспорта ID:
        </p>
          <div className="photo-area">
            <div className="photo-item">
              <form id="front_passport_form" >
                
                <label className="photo-item-label">
                  <img 
                  className='front-preview'
                  src={previewFront}
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

               {/* {selectedFileFront &&  <img src={previewFront} /> }  
               {selectedFileBack &&  <img src={previewBack} /> } */}
              <button className="idcard__btn" onClick={onFileUpload}>Отправить</button>
          </div>
      <Backdrop 
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
      open={open} 
      > 
      <CircularProgress color="inherit" /> 
      </Backdrop> 

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeSucces}>
        <Alert onClose={closeSucces} severity="success" sx={{ width: '100%' }}>
          This is a openSuccess message!
        </Alert>
      </Snackbar>

      <Snackbar open={openError05} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Отправьте фото снова!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={6000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: '100%' }}>
          Ошибка! Повторите заново!
        </Alert>
      </Snackbar>

      <Snackbar open={openErrorFiles} autoHideDuration={6000} onClose={closeErrorFiles}>
        <Alert onClose={closeErrorFiles} severity="error" sx={{ width: '100%' }}>
          Ошибка! Загрузите фото паспорта!
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
  )
}
export default Idcard;


