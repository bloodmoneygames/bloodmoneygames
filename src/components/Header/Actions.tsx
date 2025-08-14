'use client';

// Components
import NavListItem from '@/components/NavListItem';

import styles from './styles/Actions.module.scss';
import {IMenuItemsTree} from '@/utils/interfaces/menus';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
type TActionsProps = {
  menu: IMenuItemsTree
}

const Actions = ({menu}: TActionsProps) => {
  return (
    <ul className={styles.actions}>
      {menu?.map((listItem) => {
        return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
      })}
    </ul>
  );
};

export default Actions;