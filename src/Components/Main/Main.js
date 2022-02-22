import { render } from "@testing-library/react";
import React from "react";
import "./Main.css"


function Main(){
    return(
        <div className="form">
            <div className="title">Здраствуйте!</div>
                <div className="subtitle"> Давайте пройдем идентификацию: </div>
                <div className="input-container ic1">
                <input id="firstname" className="input" type="number" placeholder="" />
                <div className="cut"></div>
                <label for="firstname" className="placeholder"> +996(556)-68-00-00 </label>
            </div>
            <button type="text" className="submit"> Далее </button>
        </div>

    )

}

export default Main;