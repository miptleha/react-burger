import { matchPath, Outlet, useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { URL_PROFILE, URL_PROFILE_LOGOUT, URL_PROFILE_ORDERS } from '../../utils/routes';

function Profile() {
    const { pathname } = useLocation();

    let info = "";
    if (matchPath(pathname, `${URL_PROFILE}/${URL_PROFILE_ORDERS}`)) {
        info = "В этом разделе вы можете просмотреть свою историю заказов";
    } else if (matchPath(pathname, URL_PROFILE)) {
        info = "В этом разделе вы можете изменить свои персональные данные";
    } 
    
    return (
        <main className="page-container page-container-profile">
            <div className="page-container-profile-wrapper">
            <nav className="page-container-profile-sidebar ml-5 mr-15">
                <ul>
                    <li>
                        <NavLink to="" end>{({ isActive }) => (
                            <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Профиль</span>
                        )}</NavLink>
                    </li>
                    <li>
                        <NavLink to={URL_PROFILE_ORDERS}>{({ isActive }) => (
                            <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>История заказов</span>
                        )}</NavLink>
                    </li>
                    <li>
                        <NavLink to={URL_PROFILE_LOGOUT}>{({ isActive }) => (
                            <span className={`text text_type_main-medium ${isActive ? "text_color_primary" : "text_color_inactive"}`}>Выход</span>
                        )}</NavLink>
                    </li>
                </ul>
                <p className="text text_type_main-default text_color_dark mt-20">{info}</p>
            </nav>
            
            <Outlet />
            </div>
        </main>
    );
}

export default Profile;