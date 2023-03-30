import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';
import styles from './icon-link.module.css';

type TProps = {
    icon: ({ type }: TIconProps) => JSX.Element;
    children: string,
    href: string,
    isActive2?: boolean
};

const IconLink: FC<TProps> = ({ icon: Icon, children, href, isActive2 }) => {
    return (
        <NavLink to={href} className={`${styles.link} pt-4 pb-4 pr-5 pl-5`}>
            {({ isActive }) => (
                <>
                    <Icon type={isActive || isActive2 ? "primary" : "secondary"} />
                    <span className={`text text_type_main-default ml-2 ${isActive || isActive2 ? "text_color_primary" : "text_color_inactive"}`}>
                        {children}
                    </span>
                </>
            )}
        </NavLink>
    );
}

export default IconLink;