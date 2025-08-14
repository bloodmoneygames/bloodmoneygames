// import ClassName from 'models/classname';
// import styles from './NavListItem.module.scss';
import { IMenuItem } from '@/utils/interfaces/menus';
import Link from 'next/link';

interface INavListItemProps {
    className: string,
    item: IMenuItem
}

const NavListItem = ({ className, item }: INavListItemProps) => {

    const nestedItems = (item.children || []).map((item: IMenuItem) => {
        return <NavListItem 
            key={item.id} 
            item={item} 
            className={item.cssClasses.join(' ')} 
        />;
    });

    return (
        <li key={item.id} className={item.cssClasses.join(' ')}>
            {/* 
        Before rendering the Link component, we first check if `item.path` exists
        and if it does not include 'http'. This prevents a TypeError when `item.path` is null.
      */}
            {item.path && !item.path.includes('http') && !item.target && (
                <Link href={item.path} title={item.title}>
                    {item.csOptionsMenu.menuIcon !== null && <svg className="icon" width="24" height="24"><use href={item.csOptionsMenu.menuIcon}></use></svg>}
                    {item.label}
                </Link>
            )}
            {/* 
        Before rendering the `a` tag, we first check if `item.path` exists
        and if it includes 'http'. This prevents a TypeError when `item.path` is null.
      */}
            {item.path && item.path.includes('http') && (
                <a href={item.path} title={item.title} target={item.target}>
                    {item.label}
                </a>
            )}

            {nestedItems.length > 0 && <ul className={className}>{nestedItems}</ul>}
        </li>
    );
};

export default NavListItem;
