import { Theme } from '../Theme/Theme';
import { Footer } from '../Footer/Footer';
import s from './Layout.module.css';


type Props = {
  children: any
}

export const Layout = ({ children }: Props) => {
  return (
    <Theme>
      {children}
      <div className={s.footerContainer}>
        <Footer />
      </div>
    </Theme>
  )
}
