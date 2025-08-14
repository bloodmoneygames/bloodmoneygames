import styles from './styles/PageHeading.module.scss';

type TPageHeadingProps = {
    className?: string,
    title: string,
    [x:string]: any;
}

const PageHeading = ({ title }: TPageHeadingProps) => {
    return (
        <div className={styles.gameHead}>
            <h1>{title}</h1>
        </div>
    );
};

export default PageHeading;
