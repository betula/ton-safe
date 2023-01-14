import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { Layout } from '../../components/Layout/Layout';
import { FormattedText } from '../../components/FormattedText/FormattedText';
import { TermsOfUseLogic } from './TermsOfUseLogic.service';

import s from './TermsOfUse.module.css';

export const TermsOfUse = component(() => {
  const { doc } = provide(TermsOfUseLogic);

  return (
    <Layout className={s.container}>
      <FormattedText text={doc.text} />
    </Layout>
  )
});
