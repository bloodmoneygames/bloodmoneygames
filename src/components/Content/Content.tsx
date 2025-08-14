import { ReactNode } from 'react';
import ClassName from '@/utils/models/classname';

import styles from './styles/Content.module.scss';

type TContentProps = {
    children: ReactNode,
    className?: string,
    [x:string]: any;
}

const Content = ({ children, className }: TContentProps) => {
    const contentClassName = new ClassName(styles.content);

    contentClassName.addIf(className);

    return (
        <section className= { contentClassName.toString() } >
            { children }
        </section>
    );
};

export default Content;
