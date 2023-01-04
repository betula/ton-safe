import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { Layout } from '../../components/Layout/Layout';
import { FormattedText } from '../../components/FormattedText/FormattedText';
import { SupportLogic } from './SupportLogic.service';

export const Support = component(() => {
  const { doc } = provide(SupportLogic);

  return (
    <Layout>
      <FormattedText text={doc.text} />
    </Layout>
  )
});
