// Components

// Styles
import styles from './styles/Promo.module.scss';
import {ReactNode} from "react";
import ClassName from '@/utils/models/classname';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */

type TPromoProps = {
  children: ReactNode,
  className?: string
}

const Promo = ({children, className}: TPromoProps) => {
  const promoClassName = new ClassName(styles.promo);

  if (className) {
    promoClassName.addIf(styles[className]);
  }

  return (
    <div className={promoClassName.toString()}>
      {children}
    </div>
  );
};

export default Promo;