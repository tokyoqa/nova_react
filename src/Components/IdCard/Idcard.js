import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import "./Idcard.css"





class App extends Component {
  
    state = {
      selectedFile: null
    };
    
    onFileChange = event => {
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
      axios.post("http://192.168.0.120:4567/", formData)
      .then(function(responce){
          console.log(responce);
          console.log(responce.data)
      })
      .catch(function(error){
          console.log(error);
          console.log(error.data)
      })
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) {
         
        return (
          <div>
            <h2>File Details:</h2>
             
<p>File Name: {this.state.selectedFile.name}</p>
 
             
<p>File Type: {this.state.selectedFile.type}</p>
 
             
<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    };
    
    render() {
    
      return (
        <div>
            <h3>
              File Upload using React!
            </h3>
            <div>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  export default App;

























// function Idcard (){



// const [frontImg , setFrontImg] = useState("")
// const [backImg , setBackImg] = useState("")


//     return(
//         <div className="registration-form-2">
//             <div className="form-legend mb12">Идентификация</div>
//             <p className="site-p mb20">  
//             Фото вашего паспорта
//             </p>
//             <div id="error" className="error site-p mb20"></div>
//                 <div className="form-box mb32">
//                     <div className="photo-area">
//                         <div className="photo-item">
//                             <form id="front_passport_form">
//                             <label className="photo-item-label" >
//                                 <input 
//                                 type="file" 
//                                 accept="imaga/*" 
//                                 name="front_passport" 
//                                 id="front_passport" 
//                                 value={frontImg}
//                                 />
//                                 <input type="hidden"/>
//                             </label>
//                             <div className="photo-item-title">Лицевая сторона</div>
//                             </form>
//                         </div>
//                         <div className="photo-item">
//                             <form  id="back_passport_form">
//                             <label className="photo-item-label" >
//                                 <input 
//                                 type="file" 
//                                 accept="imaga/*"  
//                                 name="back_passport" 
//                                 id="back_passport"
//                                 value={backImg}
//                                 />
//                                 <input type="hidden"/>
//                             </label>
//                             <div className="photo-item-title">Обратная сторона</div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

    
