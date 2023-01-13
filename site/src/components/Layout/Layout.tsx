import { Theme } from '../Theme/Theme';
import { Footer } from '../Footer/Footer';
import s from './Layout.module.css';
import { Header } from '../Header/Header';


type Props = {
  children: any
}

export const Layout = ({ children }: Props) => {
  return (
    <Theme>
      <div className={s.headerContainer}>
        <Header />
      </div>
      {children}
      <div className={s.footerContainer}>
        <Footer />
      </div>
    </Theme>
  )
}
