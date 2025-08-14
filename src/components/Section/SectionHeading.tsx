import ClassName from '@/utils/models/classname';

import styles from './styles/SectionHeading.module.scss';
import { ReactNode } from 'react';

type TSectionHeadingProps = {
    children: ReactNode,
    className?: string,
    [x:string]: any;
}
const SectionHeading = ({ children, className, ...rest }: TSectionHeadingProps) => {
  const sectionClassName = new ClassName(styles.sectionHeading);

  sectionClassName.addIf(className);

  return (
    <div className={sectionClassName.toString()} {...rest}>
        <h2 className={styles.sectionHeading__title}>
        {children}
        </h2>
    </div>
  );
};

export default SectionHeading;
