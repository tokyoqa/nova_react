import React  from "react";
import "./Terms.css"
import { useNavigate } from "react-router";
import axios from "axios";
import { Backdrop, CircularProgress, Button } from '@mui/material';

export const Terms = ({id}) => {
    let navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const url = global.config.REST_API + 'api/submission?'
    const headers ={
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-nHeaders': '*',
            'Access-Control-Allow-Methods': '*',
            "Access-Control-Allow-Origin": "https://ident.ab.kg:9443/",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            withCredentials: true,
            mode: 'no-cors'
    }

    const agreeSubmit = () => {
    setOpen(!open); 
        axios
            .get(url + id + '&check=Y', headers)
            .then(res => {console.log(res);setOpen(false); })
            .catch(err => console.error(err))
    }

    const disagreeSubmit = () => {
    setOpen(!open); 
        axios
            .get(url + id + '&check=N', headers)
            .then(res => {console.log(res.data); setOpen(false);} )
            .catch(err => {console.error(err)})
    }

    
    

    return(
        <div className="terms_form">
        <div className="terms_title">Идентификация:</div>
        <div className="terms_subtitle">Вы хотите пройти видео-идентификацию?</div>
        <button className="terms_submit" onClick={agreeSubmit}>Да хочу</button>
        <button className="terms_submit" onClick={disagreeSubmit}>Нет не хочу</button>
        <div className="terms_info"> <a href="#">Информация о лимитах</a></div>
        <Backdrop 
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} 
          open={open} 
          > 
        <CircularProgress color="inherit" /> 
        </Backdrop> 
     </div>

    )
}

export default Terms;