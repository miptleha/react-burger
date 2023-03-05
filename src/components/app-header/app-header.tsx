import { FC } from 'react';
import { URL_PROFILE, URL_ROOT, URL_LENTA } from '../../utils/routes';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IconLink from '../icon-link/icon-link';

const AppHeader: FC = () => {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <nav className={styles.left}>
                    <ul className={styles.list}>
                        <li><IconLink href={URL_ROOT} icon={BurgerIcon}>Конструктор</IconLink></li>
                        <li><IconLink href={URL_LENTA} icon={ListIcon}>Лента заказов</IconLink></li>
                    </ul>
                </nav>

                <div className={styles.center}>
                    <Logo />
                </div>

                <div className={styles.right}>
                    <IconLink href={URL_PROFILE} icon={ProfileIcon}>Личный кабинет</IconLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;