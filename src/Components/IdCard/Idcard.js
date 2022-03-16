import axios from "axios";
import React, { Component, useState, } from "react";
import { useNavigate } from "react-router";
import "./Idcard.css"

axios.defaults.headers.post['Contect-Type'] = 'multipart';
const url ="http://192.168.41.33:8080/api/passport"

class Idcard extends Component {

    state = {
        selectedFileFront: null
    };
    state = {
        selectedFileBack: null
    };
    state = {
        id : 2
    }
    onFileChangeFront = event => {
      this.setState({ selectedFileFront: event.target.files[0] });
      this.setState({ selectedFileFront: event.target.files[0] });
    };

    onFileChangeBack = event => {
        this.setState({ selectedFileBack: event.target.files[0] });
        this.setState({ selectedFileBack: event.target.files[0] });
    };

    onFileUpload = () => {
      const formData = new FormData();
      formData.append(
          'id',
          this.state.id 
      )
      formData.append(
        "frontSide",
        this.state.selectedFileFront,
        this.state.selectedFileFront.name
      );
      formData.append(
        "backSide",
        this.state.selectedFileBack,
        this.state.selectedFileBack.name
      );

      axios
        .post(url, formData)

        .then(function (res) {
            console.log(res);
            console.log(res.data);
            
        })
        .catch(function (err) {
            console.log(err)
        });

    };
 
    render() {
    
      return (
            <div className="registration-form-2">
                <div className="form-legend mb12">Идентификация</div>
                <p className="site-p mb20">  
                Фото вашего паспорта
                </p>
                <div id="error" className="error site-p mb20"></div>
                    <div className="form-box mb32">
                        <div className="photo-area">
                            <div className="photo-item">
                                <form id="front_passport_form" >
                                <label className="photo-item-label" >
                                    <input 
                                    type="file" 
                                    onChange={this.onFileChangeFront}
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
                                    onChange={this.onFileChangeBack}
                                    name="back_passport" 
                                    id="back_passport/file"
                                    />
                                </label>
                                <div className="photo-item-title">Обратная сторона</div>
                                </form>
                            </div>
                        </div>
                        <button onClick={this.onFileUpload}>Отправить</button>
                    </div>
                </div>
            )
        }

    }

export default Idcard ;
