import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IconLink from '../icon-link/icon-link';

function AppHeader() {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <nav className={styles.left}>
                    <ul className={styles.list}>
                        <li><IconLink href="/" icon={BurgerIcon} isActive>Конструктор</IconLink></li>
                        <li><IconLink href="/" icon={ListIcon}>Лента заказов</IconLink></li>
                    </ul>
                </nav>

                <div className={styles.center}>
                    <Logo />
                </div>

                <div className={styles.right}>
                    <IconLink href="/" icon={ProfileIcon}>Личный кабинет</IconLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;