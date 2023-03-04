import { FC } from 'react';
import styles from './loader.module.css';

const Loader: FC = () => {
    return (
        <div className={styles.loader}>loading</div>
    );
}

export default Loader;