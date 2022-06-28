import Cookies from "js-cookie";

const removeCookies = ( user_ident ) =>{
  Cookies.remove(user_ident)
}

export default removeCookies;