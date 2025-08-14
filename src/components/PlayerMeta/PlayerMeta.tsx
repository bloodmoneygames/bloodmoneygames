// Components

// Styles
import styles from './styles/PlayerMeta.module.scss';
import {ReactNode} from "react";
import ClassName from '@/utils/models/classname';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */

type TPlayerMetaProps = {
  children: ReactNode,
  className?: string
}

const PlayerMeta = ({children, className}: TPlayerMetaProps) => {
  const componentClassName = new ClassName(styles.promo);

  if (className) {
    componentClassName.addIf(styles[className]);
  }

  return (
    <div className={componentClassName.toString()}>
      {children}
    </div>
  );
};

export default PlayerMeta;