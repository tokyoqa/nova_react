import React, { Component } from "react";
import "./Idcard.css"

class Idcard extends Component {
    render(){
    return(
        <div id="app">
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

                            <input type="file" accept="" name="front_passport" id="front_passport"/>
                                <input type="hidden" name="_token"/>

                        </label>
                        <div className="photo-item-title">Лицевая сторона</div>
                        </form>
                    </div>


                    <div className="photo-item">
                        <form  id="back_passport_form" method="post">
                        <label className="photo-item-label" >

                            <input type="file" accept=""  name="back_passport" id="back_passport"/>
                                <input type="hidden" name="_token"/>

                        </label>

                        <div className="photo-item-title">Обратная сторона</div>

                        </form>
                    </div>

                </div>

            </div>
            </div>
            </div>

        )
}
}

export  default Idcard;


















// <div classNameName="id_form">
// <div classNameName="id_title">Загрузите фото паспорта</div>
// <div classNameName="id_input__container ic1">
//     <img id="input_preview"/>
//     <input type="file" accept="image/*"/>
    
// </div>
// <div classNameName="id_input__container ic2">
//     <input type="file" accept="image/*" />
//     <img id="input_preview"/>
// </div>
//    <button classNameName="submit">Далее</button>
// </div> 
