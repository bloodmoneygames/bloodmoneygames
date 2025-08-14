'use client';

// Components
import NavListItem from '@/components/NavListItem';

import styles from './styles/Topnav.module.scss';
import {IMenuItemsTree} from '@/utils/interfaces/menus';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
type TTopnavProps = {
  menu: IMenuItemsTree
}

const Topnav = ({menu}: TTopnavProps) => {
  return (
    <ul className={styles.topnav}>
      {menu?.map((listItem) => {
        return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
      })}
    </ul>
  );
};

export default Topnav;