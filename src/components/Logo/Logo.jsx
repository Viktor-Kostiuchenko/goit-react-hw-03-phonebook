import React from 'react';
import s from './Logo.module.css';
import logo from '../../images/logo.png';

export default function Logo() {
  return (
    <a className={s.link} href="./index.html">
      <img className={s.logo} src={logo} alt="logo" />
    </a>
  );
}
