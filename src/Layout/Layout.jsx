import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import logo from '../assets/svg/logo.svg'
// import {useNavigate} from "react-router";

export default function Layout () {

return (
<div>
  <div div className={styles.header}>
    <div className={styles.header__section}>
      <div className={styles.header__logo }> 
        <a href="/"> <img src={logo} alt="img-logo"/> </a>
      </div>
      {/* <div className={styles.header__phone}>
        <span>Справочная служба</span>
        <a href="tel:+996556680000">+996 (556) 68 00 00</a>
      </div> */}
    </div>
  </div>

  <div className={styles.oulet}>
    <Outlet />
  </div>
 
      
</div>
  );
}

