import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SET_DISPLAYED_INGREDIENT } from '../../services/actions/ingredient-window';
import { URL_ROOT, URL_INGREDIENTS, URL_LOGIN, URL_REGISTER, URL_RESET_PASSWORD, URL_FORGOT_PASSWORD,
    URL_PROFILE, URL_PROFILE_ORDERS, URL_PROFILE_LOGOUT, URL_ANY } from '../../utils/routes';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { MainPage, IngredientPage, 
    Profile, ProfileEdit, ProfileOrders, ProfileLogout,
    Login, Register, ResetPassword, ForgotPassword, NotFound404 
} from '../../pages';
import ProtectedRoute from '../protected-route';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const stateLocation = location.state && location.state.location;
    const item = location.state && location.state.item;
    useEffect(() => {
        dispatch({type: SET_DISPLAYED_INGREDIENT, item: item});
    }, [dispatch, item]);

    return (
        <div className={styles.container}>
            <AppHeader />
            <div className={styles.main}>
                <Routes location={stateLocation || location}>
                    <Route path={URL_ROOT} element={<MainPage />} />
                    <Route path={`${URL_INGREDIENTS}/:id`} element={<IngredientPage />} />
                    <Route path={URL_LOGIN} element={<Login />} />
                    <Route path={URL_REGISTER} element={<Register />} />
                    <Route path={URL_RESET_PASSWORD} element={<ResetPassword />} />
                    <Route path={URL_FORGOT_PASSWORD} element={<ForgotPassword />} />
                    <Route path={URL_PROFILE} element={<ProtectedRoute element={<Profile />} />}>
                        <Route index element={<ProfileEdit />} />
                        <Route path={URL_PROFILE_ORDERS} element={<ProfileOrders />} />
                        <Route path={URL_PROFILE_LOGOUT} element={<ProfileLogout />} />
                        <Route path={URL_ANY} element={<NotFound404 />} />
                    </Route>
                    <Route path={URL_ANY} element={<NotFound404 />} />
                </Routes>
            </div>
        </div >
    );
}

export default App;