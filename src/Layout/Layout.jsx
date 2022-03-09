import React from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import styles from "./Layout.module.scss";

function Layout() {
  return (
    <div className={styles.layout}>
        <div className="div"></div>
      <AppBar position="fixed" style={{ background: "#0d844e" }}>
        <Container>
          <Toolbar>
            <Typography>Айыл Банк</Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
