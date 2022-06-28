import Cookies from "js-cookie";

const getCookies = ( user_ident ) =>{
   return Cookies.get(user_ident)
}

export default getCookies;