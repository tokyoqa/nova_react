import Cookies from "js-cookie";

const getCookies = ( user_ident ) =>{
   return Cookies.get(user_ident)
}


const removeCookies = ( user_ident ) =>{
  Cookies.remove(user_ident)
}


const setCookies = ( user_ident , id ) =>{
  const in10Minutes = 1 / 48
    Cookies.set(user_ident, id,{
      expires: in10Minutes,
      secure: true,
      sameSite: 'strict',
      path: '/'
    })
  }

export  {setCookies, removeCookies, getCookies};
