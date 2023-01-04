import { cx } from '../../lib/cx';
import s from './Theme.module.css';

type Props = {
  className?: string;
  children: any
}

export const Theme = ({ className, children }: Props) => {
  return (
    <div className={cx(
      className,
      s.defaultTheme
    )}>
      {children}
    </div>
  )
};
