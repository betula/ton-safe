import { Theme } from '../Theme/Theme';
import { Footer } from '../Footer/Footer';
import s from './Layout.module.css';
import { Header } from '../Header/Header';
import { cx } from '../../lib/cx';


type Props = {
  children: any;
  className?: string;
}

export const Layout = ({ children, className }: Props) => {
  return (
    <Theme>
      <div className={s.headerContainer}>
        <Header />
      </div>
      <div className={cx(s.middleContainer, className)}>
        {children}
      </div>
      <div className={s.footerContainer}>
        <Footer />
      </div>
    </Theme>
  )
}
