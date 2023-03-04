import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import styles from './icon-link.module.css';

type TProps = {
    icon: ({ type }: TIconProps) => JSX.Element;
    children: string,
    href: string
};

const IconLink: FC<TProps> = ({ icon: Icon, children, href }) => {
    return (
        <NavLink to={href} className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}>
            {({ isActive }) => (
                <>
                    <Icon type={isActive ? "primary" : "secondary"} />
                    <span className={`text text_type_main-default ml-2 ${isActive ? "text_color_primary" : "text_color_inactive"}`}>
                        {children}
                    </span>
                </>
            )}
        </NavLink>
    );
}

export default IconLink;