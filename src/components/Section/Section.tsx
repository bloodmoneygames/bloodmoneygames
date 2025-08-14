import ClassName from '@/utils/models/classname';

import styles from './styles/Section.module.scss';
import SectionHeading from './SectionHeading';
import {ReactNode} from 'react';

type TSectionProps = {
  children: ReactNode,
  id?: string,
  className?: string,
  title?: string,
  [x: string]: any;
}

const Section = (
  {
    children,
    id = '',
    title = '',
    className,
    ...rest
  }: TSectionProps) => {
  const sectionClassName = new ClassName(styles.section);

  sectionClassName.addIf(className);

  return (
    <section id={id} className={sectionClassName.toString()} {...rest}>
      {title && <SectionHeading>{title}</SectionHeading>}
      {children}
    </section>
  );
};

export default Section;
