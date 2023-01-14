import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { FormattedText } from '../../components/FormattedText/FormattedText';
import { Layout } from '../../components/Layout/Layout';
import { HomeLogic } from './HomeLogic.service';

import s from './Home.module.css';
import phoneImage from './assets/phone.jpg';
import storesImage from './assets/stores.png';

export const Home = component(() => {
  const { doc, text } = provide(HomeLogic);

  console.log(text.json);

  return (
    <Layout>
      <div className={s.top}>
        <div className={s.topLeftSide}>
          <div className={s.ultimateTonWallet}>
            {text.json.TheUltimateTON}
          </div>
          <div className={s.designedSecure}>
            {text.json.DesignedSecure}
          </div>
          <div className={s.stores}>
            <img src={storesImage} />
            <div className={s.comingSoon}>
              {text.json.ComingSoon}
            </div>
          </div>
        </div>
        <div className={s.topRightSide}>
          <img src={phoneImage} />
        </div>
      </div>

      <div className={s.features}>
        <div className={s.featuresTitle}>
          {text.json.Features}
        </div>

        <div className={s.boxes}>
          <div className={s.box}>

          </div>
          <div className={s.box}>

          </div>
          <div className={s.box}>

          </div>
          <div className={s.box}>

          </div>
          <div className={s.box}>

          </div>
          <div className={s.box}>

          </div>
        </div>
      </div>


      <div className={s.container}>
        {Object.keys(text.json).map((key) =>
          <p>{text.json[key]}</p>
        )}
        <FormattedText text={doc.text} />
      </div>
    </Layout>
  )
});
