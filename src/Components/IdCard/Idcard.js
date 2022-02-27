import React, { Component } from "react";
import "./Idcard.css"

class Idcard extends Component {
    render(){
    return(
        <div className="id_form">
            <div className="id_title">Загрузите фото паспорта</div>
            <div className="id_input__container ic1">
                <img id="input_preview"/>
                <input type="file" accept="image/*"/>
                
            </div>
            <div className="id_input__container ic2">
                <input type="file" accept="image/*" />
                <img id="input_preview"/>
            </div>
               <button className="submit">Далее</button>
            </div>

    )
}
}

export  default Idcard;