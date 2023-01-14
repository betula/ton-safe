import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { translation } from '../../lib/locale/translation';

import s from './Footer.module.css';

import emailImage from './assets/email.png';

export const Footer = component(() => {

  return (
    <footer className={s.footer}>
      <div className={s.copy}>
        {translation.Copyrights}
      </div>
      <div className={s.info}>
      <a href="mailto:info@tonsafe.app"><img src={emailImage} /></a>
        <a href="mailto:info@tonsafe.app">info@tonsafe.app</a>
      </div>
    </footer>
  )
});
