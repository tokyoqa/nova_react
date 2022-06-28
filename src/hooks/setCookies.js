import Cookies from "js-cookie";

const setCookies = ( user_ident , id ) =>{
const in10Minutes = 1 / 48
  Cookies.set(user_ident, id,{
    expires: in10Minutes,
    secure: true,
    sameSite: 'strict',
    path: '/'
  })
}

export default setCookies;