import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';
import { URL_PROFILE_LOGOUT, URL_PROFILE_ORDERS } from '../../utils/routes';

function Profile() {
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
                <p className="text text_type_main-default text_color_dark mt-20">В этом разделе вы можете изменить свои персональные данные</p>
            </nav>
            
            <Outlet />
            </div>
        </main>
    );
}

export default Profile;