import styles from './styles/BestGames.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import BestGame from './BestGame';

import { getSidePostsContext } from '@/utils/hooks/ServerContext';
import { postPathBySlug } from '@/utils/helpers/posts';
import { pagePathBySlug } from '@/utils/lib/pages';

const BestGames = ({ ...rest }) => {
  const sidePosts = getSidePostsContext();

  return (
    <section {...rest} className={styles.bestGames}>

      <div
        className={styles.sideWidget}
      >
        <div className={styles.bestGames__heading}>
            <p className={styles.bestGames__title}>Top rated:</p>
        </div>
        <div className={styles.bestGames__items}>
          {sidePosts.map((post) => {
            return (
                <BestGame
                    post={post}
                    key={post.slug}
                />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BestGames;
