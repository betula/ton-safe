import { provide } from 'provi/client';
import { component } from 'remini/preact';
import { FormattedText } from '../../components/FormattedText/FormattedText';
import { Layout } from '../../components/Layout/Layout';
import { HomeLogic } from './HomeLogic.service';

import s from './Home.module.css';
import phoneImage from './assets/phone.jpg';
import storesImage from './assets/stores.png';

import boxWalletsImage from './assets/wallets.svg';
import boxStakingImage from './assets/staking.svg';
import boxNftImage from './assets/nft.svg';
import boxSwapImage from './assets/swap.svg';
import boxMultisigImage from './assets/multisig.svg';
import boxBrowserImage from './assets/browser.svg';

export const Home = component(() => {
  const { doc, text } = provide(HomeLogic);

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
            <div className={s.boxImage}>
              <img src={boxWalletsImage} />
            </div>
            <div className={s.boxTitle}>
              {text.json.MultipleWallets}
            </div>
            <div className={s.boxText}>
              {text.json.MultipleWallets_Text}
            </div>
          </div>
          <div className={s.box}>
            <div className={s.boxImage}>
              <img src={boxStakingImage} />
            </div>
            <div className={s.boxTitle}>
              {text.json.Staking}
            </div>
            <div className={s.boxText}>
              {text.json.Staking_Text}
            </div>
          </div>
          <div className={s.box}>
            <div className={s.boxImage}>
              <img src={boxNftImage} />
            </div>
            <div className={s.boxTitle}>
              {text.json.NFT}
            </div>
            <div className={s.boxText}>
              {text.json.NFT_Text}
            </div>
          </div>
          <div className={s.box}>
            <div className={s.boxImage}>
              <img src={boxSwapImage} />
            </div>
            <div className={s.boxTitle}>
              {text.json.Swap}
            </div>
            <div className={s.boxText}>
              {text.json.Swap_Text}
            </div>
          </div>
          <div className={s.box}>
            <div className={s.boxImage}>
              <img src={boxMultisigImage} />
            </div>
            <div className={s.boxTitle}>
              {text.json.MultisigVault}
            </div>
            <div className={s.boxText}>
              {text.json.MultisigVault_Text}
            </div>
          </div>
          <div className={s.box}>
            <div className={s.boxImage}>
              <img src={boxBrowserImage} />
            </div>
            <div className={s.boxTitle}>
              {text.json.Browser}
            </div>
            <div className={s.boxText}>
              {text.json.Browser_Text}
            </div>
          </div>
        </div>
      </div>

      <div className={s.final}>
        <div className={s.finalTitle}>
          {text.json.ComingSoonOnStores}
        </div>

        <div className={s.finalStores}>
          <img src={storesImage} />
        </div>

        <div className={s.finalText}>
          <FormattedText text={doc.text} />
        </div>
      </div>
    </Layout>
  )
});
