// Imports
import {getMenus, getMenusContext} from "@/utils/hooks/ServerContext";
import { findMenuByLocation, MENU_LOCATION_NAVIGATION_DEFAULT } from '@/utils/lib/menus';

// Components
import NavListItem from '@/components/NavListItem';

import styles from './styles/Footmenu.module.scss';
import { IMenu } from '@/utils/interfaces/menus';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Footmenu = () => {
    const menus: Array<IMenu> = getMenusContext();

    const navigationLocation = process.env.WORDPRESS_FOOTMENU_LOCATION || MENU_LOCATION_NAVIGATION_DEFAULT;
    const navigation = findMenuByLocation(menus, navigationLocation);

    return (
        <ul className={styles.footmenu}>
            {navigation?.map((listItem) => {
                return <NavListItem key={listItem.id} className={styles.navSubMenu} item={listItem} />;
            })}
        </ul>
    );
};

export default Footmenu;