import axios from "axios";
import React, { Component, useState, } from "react";
import { useNavigate } from "react-router";
import "./Idcard.css"
import { Backdrop, CircularProgress, Button } from '@mui/material';
import '../../Config';


axios.defaults.headers.post['Contect-Type'] = 'multipart';
const Idcard = ({id}) => {
const navigate = useNavigate()
let errorCode01 = false
let errorCode02 = false
let errorCode03 = false
let errorCode04 = false


    const [selectedFileFront, setSelectedFileFront] = useState();
    const [selectedFileBack, setSelectedFileBack] = useState()
    const [open, setOpen] = React.useState(false); 
    const onFileChangeFront = (event) => {
        setSelectedFileFront(event.target.files[0])
        setSelectedFileFront (event.target.files[0])
    };

    const onFileChangeBack = (event) => {
        setSelectedFileBack(event.target.files[0])
        setSelectedFileBack (event.target.files[0])
    };

    const onFileUpload = () => {
        setOpen(false); 
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
        console.log(res.data)
        if (res.data.statusCode == 1){
          errorCode01 = true
        }
        else if(res.data.statusCode == 2){
          errorCode02 = true
        }
        else if(res.data.statusCode == 3){
          errorCode03 = true
        }
        else{
        navigate('/camera')
        console.log(res.data)
        }
      })
        .catch(error =>{
            if (error.responce){
                console.log(error.response.status);
            }
            else if(error.request){
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
        })

    };
 
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
                                <label className="photo-item-label" >
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
                                    <input 
                                    type="file" 
                                    onChange={onFileChangeBack}
                                    name="back_passport" 
                                    id="back_passport/file"
                                    />
                                </label>
                                <div className="photo-item-title">Обратная сторона</div>
                                </form>
                            </div>
                        </div>
                        <button className="idcard__btn" onClick={onFileUpload}>Отправить</button>
                    </div>
                    <Backdrop 
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
                    open={open} 
                    > 
                <CircularProgress color="inherit" /> 
                </Backdrop> 
                </div>
                
            )

        }


        export default Idcard;


