'use client';

// Imports
import Link from 'next/link';

// Components
import Navmenu from './Navmenu';

import styles from './styles/Navbar.module.scss';
import ClassName from "@/utils/models/classname";
import {useNavbarContext} from "@/utils/hooks/NavbarProvider";
import {useState} from "react";
import {IMenuItemsTree} from "@/utils/interfaces/menus";
import Actions from "@/components/Header/Actions";

type TNavbarProps = {
    className?: string,
    menu: IMenuItemsTree,
    actions: IMenuItemsTree,
}

const Navbar = ({className, menu, actions}: TNavbarProps) => {
    const navbarClassName = new ClassName([styles.navbar]);
    navbarClassName.addIf(className);
    let {isNavOpen} = useNavbarContext();

    if (isNavOpen) {
        navbarClassName.addIf(styles.navbarCollapsed);
    }

    return (
        <div className={navbarClassName.toString()}>
            <div
                className={styles.navbar__menu}
            >
                <Navmenu menu={menu}/>
            </div>

            <div className={styles.navbar__actions}>
              <Actions menu={actions}/>
            </div>
        </div>
    );
};

export default Navbar;