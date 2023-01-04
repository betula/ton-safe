import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { FormattedText } from '../../components/FormattedText/FormattedText';
import { Layout } from '../../components/Layout/Layout';
import { HomeLogic } from './HomeLogic.service';

export const Home = component(() => {
  const { doc, text } = provide(HomeLogic);

  return (
    <Layout>
      {Object.keys(text.json).map((key) =>
        <p>{text.json[key]}</p>
      )}
      <FormattedText text={doc.text} />
    </Layout>
  )
});
