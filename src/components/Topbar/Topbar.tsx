// Components
import Container from '@/components/Container';

import styles from './styles/Topbar.module.scss';
import {IMenu, IMenuItemsTree} from "@/utils/interfaces/menus";
import ClassName from "@/utils/models/classname";
import Navmenu from "@/components/Header/Navmenu";
import Topnav from "@/components/Topbar/Topnav";
import {getMenusContext} from "@/utils/hooks/ServerContext";
import {findMenuByLocation} from "@/utils/lib/menus";

type TTopbarProps = {
    className?: string,
}

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Topbar = ({className}: TTopbarProps) => {
    const topbarClassName = new ClassName([styles.topbar]);
    topbarClassName.addIf(className);

    const menus: Array<IMenu> = getMenusContext();
    const topnav = findMenuByLocation(menus, 'topbar');

    return (
        <nav className={styles.topbar}>
            <Container>
                <Topnav menu={topnav}/>
            </Container>
        </nav>
    );
};

export default Topbar;