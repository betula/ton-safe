import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { Link } from '../../lib/route/Link/Link';
import { HomeRoute } from '../../pages/Home/HomeRoute.service';
import { PrivacyPolicyRoute } from '../../pages/PrivacyPolicy/PrivacyPolicyRoute.service';
import { SupportRoute } from '../../pages/Support/SupportRoute.service';
import { TermsOfUseRoute } from '../../pages/TermsOfUse/TermsOfUseRoute.service';
import { translation } from '../../lib/locale/translation';

import logo from './assets/logo.svg';
import s from './Header.module.css';

export const Header = component(() => {

  return (
    <header className={s.header}>
      <Link className={s.logo} route={provide(HomeRoute)}>
        <img src={logo} />
        <div className={s.title}>{translation.TonSafe}</div>
      </Link>
      <nav className={s.links}>
        <ul className={s.ul}>
          <li className={s.li}>
            <Link className={s.link} route={provide(HomeRoute)}>{translation.Home}</Link>
          </li>
          <li className={s.li}>
            <Link className={s.link} route={provide(TermsOfUseRoute)}>{translation.TermsOfUse}</Link>
          </li>
          <li className={s.li}>
            <Link className={s.link} route={provide(PrivacyPolicyRoute)}>{translation.PrivacyPolicy}</Link>
          </li>
          <li className={s.li}>
            <Link className={s.link} route={provide(SupportRoute)}>{translation.Support}</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
});
