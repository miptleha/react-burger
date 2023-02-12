import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './icon-link.module.css';

function IconLink({ icon: Icon, children, href }) {
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

IconLink.propTypes = {
    icon: PropTypes.elementType.isRequired,
    children: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default IconLink;