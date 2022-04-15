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
      <nav className={styles.nav__phone}>
        <span>Справочная служба</span>
        <a href="tel:+996556680000">+996 (556) 68 00 00</a>
      </nav>
      <div className={styles.header__links}>
        <div className={styles.header__links_grid}>
          <a href="#" className={styles.header__link}>Контакты</a>
          <a href="#" className={styles.header__link}>Качество обслуживания</a>
          <a href="#" className={styles.header__link}>Филиалы и банкоматы</a>
          <a href="https://ab.kg/survey" className={styles.header__link}>Анкетирование</a>
          <a href="https://ab.kg/faq" className={styles.header__link}>FAQ</a>
        </div>
      </div>
    </div>
  </header>
  <main className={styles.oulet}>
    <Outlet />
  </main>
  <footer className={styles.footer}>
      <div className={styles.wrapper__footer}>
       <div class="footer__items">
          <div class="footer__item">
            <span class="copy">© ОАО «Айыл Банк», 1996–2022</span>
          </div>
          <div class="footer__item">
            <ul class="footer__menu">
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
        <div class="footer__item">
          <span class="footer__info">Реквизиты: ИНН: 01803199710084</span>
          <span class="footer__info">Код и наименование РНИ: 999 УККН</span>
          <span class="footer__info">БИК: 135001</span>
          <span class="footer__info">Р/счет: 1352119911905306 </span>
          <span class="footer__info">в ОАО "Айыл Банк"</span>
        </div>
        <div class="footer__item">
          <div class="footer__phones">
          <div class="footer-phones">
            <div class="footer-phones__item">
              <a class="footer-phones__link" href="tel:+996312680000">0 (312) 68 00 00</a>
            </div>
            <div class="footer-phones__item">
              <a class="footer-phones__link" href="tel:+996556680000">0 (556) 68 00 00</a>
            </div>
            <div class="footer-phones__item">
              <a class="footer-phones__link" href="tel:+996222680000">0 (222) 68 00 00</a>
            </div>
            <div class="footer-phones__item">
              <a class="footer-phones__link" href="tel:+996707680000">0 (707) 68 00 00</a>
            </div>
          </div>
          </div>

                  
          </div>
      </div>
      </div>


  </footer>
</div>
  );
}