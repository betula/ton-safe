import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { Layout } from '../../components/Layout/Layout';
import { FormattedText } from '../../components/FormattedText/FormattedText';
import { PrivacyPolicyLogic } from './PrivacyPolicyLogic.service';

export const PrivacyPolicy = component(() => {
  const { doc } = provide(PrivacyPolicyLogic);

  return (
    <Layout>
      <FormattedText text={doc.text} />
    </Layout>
  )
})
