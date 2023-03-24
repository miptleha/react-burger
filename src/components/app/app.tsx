import { useEffect } from 'react';
import { useDispatch } from '../../hooks/redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
    URL_ROOT, URL_INGREDIENTS, URL_LOGIN, URL_REGISTER, URL_RESET_PASSWORD, URL_FORGOT_PASSWORD,
    URL_PROFILE, URL_PROFILE_ORDERS, URL_PROFILE_LOGOUT, URL_ANY, URL_FEED
} from '../../utils/routes';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import {
    MainPage, IngredientPage,
    Profile, ProfileEdit, ProfileOrders, ProfileLogout,
    Login, Register, ResetPassword, ForgotPassword, NotFound404, FeedPage, OrderPage
} from '../../pages';
import ProtectedRoute from '../protected-route';
import { loadIngredientsAction } from '../../services/actions/load-ingredients';
import { authCheckUserAction } from '../../services/actions/auth';
import OrderInfo from '../order-info/order-info';
import Modal from '../modal/modal';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadIngredientsAction());
        dispatch(authCheckUserAction());
    }, [dispatch]);

    const stateLocation = location.state && location.state.location;

    const handleCloseModalDetail = () => {
        navigate(-1);
    }

    return (
        <div className={styles.container}>
            <AppHeader />
            <div className={styles.main}>
                <Routes location={stateLocation || location}>
                    <Route path={URL_ROOT} element={<MainPage />} />
                    <Route path={URL_FEED} element={<FeedPage />} />
                    <Route path={`${URL_INGREDIENTS}/:id`} element={<IngredientPage />} />
                    <Route path={`${URL_FEED}/:id`} element={<OrderPage />} />
                    <Route path={URL_LOGIN} element={<Login />} />
                    <Route path={URL_REGISTER} element={<ProtectedRoute anonymous element={<Register />} />} />
                    <Route path={URL_RESET_PASSWORD} element={<ProtectedRoute anonymous element={<ResetPassword />} />} />
                    <Route path={URL_FORGOT_PASSWORD} element={<ProtectedRoute anonymous element={<ForgotPassword />} />} />
                    <Route path={URL_PROFILE} element={<ProtectedRoute element={<Profile />} />}>
                        <Route index element={<ProfileEdit />} />
                        <Route path={URL_PROFILE_ORDERS} element={<ProfileOrders />} />
                        <Route path={`${URL_PROFILE_ORDERS}/:id`} element={<OrderPage />} />
                        <Route path={URL_PROFILE_LOGOUT} element={<ProfileLogout />} />
                        <Route path={URL_ANY} element={<NotFound404 />} />
                    </Route>
                    <Route path={URL_ANY} element={<NotFound404 />} />
                </Routes>
                {stateLocation &&
                    <Routes>
                        <Route path="/ingredients/:id" element={
                            <div>
                                <Modal onClose={handleCloseModalDetail} caption="Детали ингредиента">
                                    <IngredientPage />
                                </Modal>
                            </div>
                        } />
                        <Route path={`${URL_FEED}/:id`} element={
                            <Modal onClose={handleCloseModalDetail}>
                                <OrderInfo />
                            </Modal>
                        } />
                        <Route path={`${URL_PROFILE}/${URL_PROFILE_ORDERS}/:id`} element={
                            <Modal onClose={handleCloseModalDetail}>
                                <OrderInfo />
                            </Modal>
                        } />
                    </Routes>
                }
            </div>
        </div >
    );
}

export default App;