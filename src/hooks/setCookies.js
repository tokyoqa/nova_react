import Cookies from "js-cookie";

const setCookies = ( user_ident , id ) =>{
  Cookies.set(user_ident, id,{
    expires: 1,
    secure: true,
    sameSite: 'strict',
    path: '/'
  })
}

export default setCookies;