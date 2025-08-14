// Interfaces
import { IMenu, IMenuItem, IMenuItemsTree } from '@/utils/interfaces/menus';

import { getClient } from '@/utils/lib/apollo-client';
import { getTopLevelPages } from '@/utils/lib/pages';
import { QUERY_ALL_MENUS } from '@/utils/data/menus';
import {IPage, IPageCard} from '../interfaces/pages';
import {IQueryData} from "@/utils/interfaces/commons";
import appConfig from "@/utils/lib/config";
import {unstable_noStore} from "next/cache";

export const MENU_LOCATION_NAVIGATION_DEFAULT = 'navmenu';

if (!appConfig.export) {
    unstable_noStore();
}
/**
 * getAllMenus
 */

export async function getAllMenus() {
    const apolloClient = getClient();

    const data = await apolloClient.query({
        query: QUERY_ALL_MENUS,
    });

    const menus = data?.data.menus.edges.map(mapMenuData);

    const defaultNavigation = createMenuFromPages(
        [MENU_LOCATION_NAVIGATION_DEFAULT],
        await getTopLevelPages(),
    );

    menus.push(defaultNavigation);

    return {
        menus,
    };
}

/**
 * mapMenuData
 */

export function mapMenuData(menu: IQueryData) {
    const { node } = menu;
    const data = { ...node };

    data.menuItems = data.menuItems.edges.map(({ node }: IQueryData) => {
        return { ...node };
    });

    return data;
}

/**
 * mapPagesToMenuItems
 */

export function mapPagesToMenuItems(pages: Array<IPageCard>) {
    return pages.map(({ pageId, uri, title }: IPageCard) => {
        return {
            label: title,
            path: uri,
            pageId,
        };
    });
}

/**
 * createMenuFromPages
 */

export function createMenuFromPages( 
    locations: Array<string>, 
    pages: Array<IPageCard>
): IMenu {
    return {
        id: 'defaultpages',
        menuItems: mapPagesToMenuItems(pages),
        locations,
    };
}

/**
 * Parse hierarchical menu from Menu object
 * 
 * @param data Flat list of menu items
 * @param param1 object of keys
 * @returns Hierarchical tree of menu
 */

export const parseHierarchicalMenu = (
    data: IQueryData = []
): IMenuItemsTree => {
    const tree: Array<IMenuItem> = [];
    const childrenOf: {[propName: string]: any;} = {};

    data.forEach((item: IMenuItem) => {
        // create copy of item
        const newItem: IMenuItem = { ...item };

        // desctruct id and parent id from item
        const {
            id,
            parentId = 0
        } = newItem;

        // initialize array of children elements (if not exist)
        childrenOf[id] = childrenOf[id] || [];

        // Add children field for newItem
        newItem['children'] = childrenOf[id];

        // add children node for new item if parent id exist
        // else add node for root array "tree"
        parentId ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem) : tree.push(newItem);
    });

    return tree;
};

/**
 * Find menu from all menus data by location
 * 
 * @param menus All menus
 * @param location Menu location
 * @returns Tree of menu items
 */
export function findMenuByLocation(menus: Array<IMenu>, location: string): IMenuItemsTree {
    if (typeof location !== 'string') {
        throw new Error('Find menu by location - location is not a string.');
    }

    const menu = menus.find(
        ({ locations }: IMenu) => {
            return locations.map(
                (loc: string) => loc.toUpperCase()).includes(location.toUpperCase()
                );
        }
    );

    if (menu === undefined || menu.menuItems === undefined) {
        throw new Error('Find menu by location - menu not found.');
    }

    return menu && parseHierarchicalMenu(menu.menuItems);
}
