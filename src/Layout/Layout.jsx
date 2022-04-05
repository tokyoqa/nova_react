import React from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Container, Toolbar, Typography, ImageList, ImageListItem } from "@mui/material";
import styles from "./Layout.module.scss";
import logo from '../assets/svg/logo.svg'
import {useNavigate} from "react-router";

export default function Layout () {

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.header__section}>
          <div className={styles.header__logo }> 
            <a href="/"> <img src={logo} alt="img-logo"/> </a>
          </div>
          <div className={styles.header__button}>
            <a href="" className="href"></a>
          </div>
        </div>

      </div>


      {/* <AppBar position="fixed" style={{ background: "#11994f" }}>
        <Container>
          <Toolbar>
            <a href="/"><img src={logo} alt="logo" style={{width: 200, heigth: 100}}/></a>
          </Toolbar>
        </Container>
      </AppBar> */}
      <div className={styles.oulet}>
        <Outlet />
      </div>

      {/* <div className={styles.footer}>
        <div className={styles.wrapper}>
          <div className="footer__items">
            <div className="footer__item">
            <span className="copy">© ОАО «Айыл Банк», 1996–2022</span>
            </div>
            <div className="footer__item">
              <ul className="footer__menu">
                <li>
                  <a href="https://ab.kg/news">Новости</a>
                </li>
                <li>
                  <a href="https://ab.kg/tendery">Tендеры</a>
                </li>
                <li>
                  <a href="https://ab.kg/rabota-v-aiyl-banke">Вакансии</a>
                </li>
                <li>
                  <a href="https://ab.kg/faq">FAQ</a>
                </li>
              </ul>
            </div>
            <div className="footer__item">
              <span className="footer__info">Реквизиты: ИНН: 01803199710084</span>
              <span className="footer__info">Код и наименование РНИ: 999 УККН</span>
              <span className="footer__info">БИК: 135001</span>
              <span className="footer__info">Р/счет: 1352119911905306 </span>
              <span className="footer__info">в ОАО "Айыл Банк"</span>Name
            </div>
            <div className="footer__item"></div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

