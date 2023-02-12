import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { getAuth } from '../services/selectors';
import { authResetPasswordAction, AUTH_CLEAR_ERRORS } from '../services/actions/auth';

import './pages.css';
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/loader/loader';

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state) => {
        dispatch(authResetPasswordAction(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm({
        password: "",
        token: ""
    }, submitCb);

    const { requestStart, requestError, requestSuccess, userLoggedIn, forgotPassword } = useSelector(getAuth);
   
    useEffect(() => {
        if (userLoggedIn) {
            navigate('/', { replace: true });
        } else if (!forgotPassword) {
            navigate('/forgot-password', { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Сброс пароля] ${requestError}`);
            dispatch({type: AUTH_CLEAR_ERRORS});
        } else if (state.wasSubmit && requestSuccess) {
            navigate('/login', { replace: true });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, forgotPassword, requestError, requestSuccess, navigate]);

    return (
        <main className="page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <PasswordInput placeholder='Введите новый пароль' name="password" value={state.password} onChange={onChange} extraClass="mb-6" />
                <Input placeholder='Введите код из письма' name="token" value={state.token} onChange={onChange} extraClass="mb-6" />
                {requestStart ? <Loader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.password === "" || state.token === ""}>Сохранить</Button>}
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to="/login">Войти</Link></p>
            </form>
        </main>
    );
}

export default ResetPassword;