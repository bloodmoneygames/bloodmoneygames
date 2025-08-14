import styles from './styles/Container.module.scss';
import ClassName from "@/utils/models/classname";

interface IContainerProps {
    children: React.ReactNode;
    className?: string;
}

const Container: React.FC<IContainerProps> = ({ children, className }) => {
  const containerClassName = new ClassName(styles.container);
  containerClassName.addIf('container');
  containerClassName.addIf(className);

  return <div className={containerClassName.toString()}>{children}</div>;
};

export default Container;
