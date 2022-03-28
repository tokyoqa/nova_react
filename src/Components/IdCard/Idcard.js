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

    const onFileChangeFront = (event) => {
        setSelectedFileFront(event.target.files[0])
        setSelectedFileFront (event.target.files[0])
    };

    const onFileChangeBack = (event) => {
        setSelectedFileBack(event.target.files[0])
        setSelectedFileBack (event.target.files[0])
    };

    const onFileUpload = () => {
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
        .then(function (res) {
            console.log(res.data);
            navigate('/Camera')
            
            
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
                </div>
            )
        }


        export default Idcard;


