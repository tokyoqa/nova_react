import React from "react";
import { Outlet } from "react-router-dom";
import {useEffect } from 'react';
import { AppBar, Container, Toolbar, Typography, ImageList, ImageListItem } from "@mui/material";
import styles from "./Layout.module.scss";
import logo from '../assets/img/bank-logo.jpg'
import {useNavigate} from "react-router";





export default function Layout () {
  let navigate = useNavigate(); 
  useEffect(() => {
    if (performance.navigation.type === 1) {
        navigate('/')
    } else {

    }
  });

  return (
    <div className={styles.layout}>
        <div className="div"></div>
      <AppBar position="fixed" style={{ background: "#11994f" }}>
        <Container>
          <Toolbar>
            <a><img src={logo} alt="logo" style={{width: 200, heigth: 100}}/></a>
            {/* <Typography>Айыл Банк</Typography> */}
          </Toolbar>
        </Container>
      </AppBar>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

