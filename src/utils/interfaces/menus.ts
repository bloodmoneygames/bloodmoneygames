export interface IMenuData {
    
}

export interface IMenu {
    id: string;
    menuItems: Array<object>
    locations: Array<string>
}

export interface IMenuItem {
    cssClasses: Array<string>;
    id: string;
    parentId?: string;
    label: string;
    title?: string;
    target?: string;
    path: string;
    csOptionsMenu: {
        menuIcon:string
    };
    children?: Array<IMenuItem>
}

export interface IMenuItemsTree extends Array<IMenuItem> {}