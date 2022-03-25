import React  from "react";
import "./Terms.css"
import { useNavigate } from "react-router";

function Terms(){
    let navigate = useNavigate();

    const goToNextPage = () => {
        navigate('/video')        
    }

    return(
        <div className="terms_form">
        <div className="terms_title">Идентификация:</div>
        <div className="terms_subtitle">Вы хотите пройти видео-идентификацию?</div>
        <button className="terms_submit" onClick={goToNextPage}>Да хочу</button>
        <button className="terms_submit">Нет не хочу</button>
        <div className="terms_info"> <a href="#">Информация о лимитах</a></div>
     </div>

    )
}

export default Terms;