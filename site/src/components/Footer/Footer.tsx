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
    <footer>
      &copy; {translation.TonSafeApp}
    </footer>
  )
});
