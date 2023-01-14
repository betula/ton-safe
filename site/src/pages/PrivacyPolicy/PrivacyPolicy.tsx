import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { Layout } from '../../components/Layout/Layout';
import { FormattedText } from '../../components/FormattedText/FormattedText';
import { PrivacyPolicyLogic } from './PrivacyPolicyLogic.service';

import s from './PrivacyPolicy.module.css';

export const PrivacyPolicy = component(() => {
  const { doc } = provide(PrivacyPolicyLogic);

  return (
    <Layout className={s.container}>
      <FormattedText text={doc.text} />
    </Layout>
  )
})
