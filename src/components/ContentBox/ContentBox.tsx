import { ReactNode } from 'react';
import ClassName from '@/utils/models/classname';

import styles from './styles/ContentBox.module.scss';

type TContentBoxProps = {
    children: ReactNode,
    className?: string,
    [x:string]: any;
}

const ContentBox = ({ children, className }: TContentBoxProps) => {
    const contentClassName = new ClassName(styles.contentBox);

    contentClassName.addIf(className);
    contentClassName.addIf('content');

    return (
        <section className= { contentClassName.toString() } >
            { children }
        </section>
    );
};

export default ContentBox;
