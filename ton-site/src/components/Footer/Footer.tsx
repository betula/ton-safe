import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { Link } from '../../lib/route/Link/Link';
import { HomeRoute } from '../../pages/Home/HomeRoute.service';
import { PrivacyPolicyRoute } from '../../pages/PrivacyPolicy/PrivacyPolicyRoute.service';
import { SupportRoute } from '../../pages/Support/SupportRoute.service';
import { TermsOfUseRoute } from '../../pages/TermsOfUse/TermsOfUseRoute.service';
import { translation } from '../../lib/locale/translation';

import s from './Footer.module.css';

export const Footer = component(() => {

  return (
    <nav>
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
  )
});
