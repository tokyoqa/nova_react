import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import "./Idcard.css"


class Idcard extends Component {
  
    state = {
      selectedFile: null
    };
    
    onFileChange = event => {
      this.setState({ selectedFile: event.target.files[0] });
      this.setState({ selectedFile: event.target.files[0] });
    };
    
    onFileUpload = () => {
      const formData = new FormData();

      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      console.log(this.state.selectedFile);
      axios
      .post("http://127.0.0.1:5000/?"+ formData)
      .then(function(responce){
          console.log(responce);
          console.log(responce.data)
      })
      .catch(function(error){
          console.log(error);
          console.log(error.data)
      })
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
                                <form id="front_passport_form">
                                <label className="photo-item-label" >
                                    <input 
                                    type="file" 
                                    onChange={this.onFileChange}
                                    name="front_passport" 
                                    id="front_passport" 
                                    />
                                    <input type="hidden"/>
                                </label>
                                <div className="photo-item-title">Лицевая сторона</div>
                                </form>
                            </div>
                            <div className="photo-item">
                                <form  id="back_passport_form">
                                <label className="photo-item-label" >
                                    <input 
                                    type="file" 
                                    onChange={this.onFileChange}
                                    name="back_passport" 
                                    id="back_passport"
                                    />
                                    <input type="hidden"/>
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

        //         <input type="file" onChange={this.onFileChange} />
        //         <button onClick={this.onFileUpload}>
        //           Upload!
        //         </button>
        //     </div>
        // </div>
//       );
//     }
//   }
 
//   export default App;

// function Idcard (){