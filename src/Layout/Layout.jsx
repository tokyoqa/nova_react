import React from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, ImageList, ImageListItem } from "@mui/material";
import styles from "./Layout.module.scss";
import logo from '../assets/img/bank-logo.jpg'
import {useNavigate} from "react-router";





export default function Layout () {
 

  return (
    <div className={styles.layout}>
        <div className="div"></div>
      <AppBar position="fixed" style={{ background: "#11994f" }}>
        <Container>
          <Toolbar>
            <a><img src={logo} alt="logo" style={{width: 200, heigth: 100}}/></a>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

