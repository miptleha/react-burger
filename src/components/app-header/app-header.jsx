import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function HeaderLink({ isActive, icon: Icon, children, href }) {
    return (
        <a href={href} className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}>
            <Icon type={isActive ? "primary" : "secondary"} />
            <span className={`text text_type_main-default ml-2 ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
                {children}
            </span>
        </a>
    )
}

function AppHeader() {
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.container}>
                <nav className={styles.left}>
                    <ul className={styles.list}>
                        <li><HeaderLink href="/" icon={BurgerIcon} isActive={true}>Конструктор</HeaderLink></li>
                        <li><HeaderLink href="/" icon={ListIcon} isActive={false}>Лента заказов</HeaderLink></li>
                    </ul>
                </nav>

                <div className={styles.center}>
                    <Logo />
                </div>

                <div className={styles.right}>
                    <HeaderLink href="/" icon={ProfileIcon} isActive={false}>Личный кабинет</HeaderLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;