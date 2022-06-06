import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";
import logo from '../assets/svg/logo.svg'

export default function Layout () {
return (
<div>
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.header__logo }> 
        <a href="/"> <img src={logo} alt="img-logo"/> </a>
      </div>
    </div>
  </header>
  <main className={styles.oulet}>
    <Outlet />
  </main>
</div>
  );
}