'use client';

// Components
import NavListItem from '@/components/NavListItem';

import styles from './styles/Navmenu.module.scss';
import {IMenuItemsTree} from '@/utils/interfaces/menus';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
type TNavmenuProps = {
    menu: IMenuItemsTree
}

const Navmenu = ({menu}: TNavmenuProps) => {
    return (
        <ul className={styles.navmenu}>
            {menu?.map((listItem) => {
                return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
            })}
        </ul>
    );
};

export default Navmenu;