import ClassName from '@/utils/models/classname';

import styles from './styles/PlayerMeta.module.scss';
import Shares from "@/components/Shares";
import Link from "next/link";

type TPlayerMetaProps = {
  handlerFullscreen: any,
  className?: string,
  [x: string]: any;
}
const PlayerMeta = ({handlerFullscreen, className, ...rest}: TPlayerMetaProps) => {
  const playerMetaClassName = new ClassName(styles.playerMeta);

  playerMetaClassName.addIf(className);

  return (
    <div className={playerMetaClassName.toString()} {...rest}>
      <div className={styles.playerMeta__item}>
        <Shares/>
      </div>
      <div className={styles.playerMeta__item}>
        <Link
          href={`#related`}
          className="btn btn--accent"
          title="More games"
        >
          <svg className="icon" width="24px" height="24px">
            <use href="#icon-link"></use>
          </svg>
          More games
        </Link>
      </div>
      <div className={styles.playerMeta__item}>
      <Link
        href={`#comments`}
          className="btn btn--accent"
          title="Comment"
        >
          <svg className="icon" width="24px" height="24px">
            <use href="#icon-comment"></use>
          </svg>
          Comment
        </Link>
      </div>
      <div className={styles.playerMeta__item}>
        <Link
          href="#"
          className="btn btn--accent btn--icon"
          title="Fullscreen"
          onClick={handlerFullscreen}
        >
          <svg className="icon" width="24px" height="24px">
            <use href="#icon-fullscreen"></use>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default PlayerMeta;
