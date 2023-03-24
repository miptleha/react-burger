import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getAuth } from '../../services/selectors';
import { authLoginAction } from '../../services/actions/auth';
import { URL_FORGOT_PASSWORD, URL_PROFILE, URL_PROFILE_LOGOUT, URL_REGISTER, URL_ROOT } from '../../utils/routes';

import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../../components/loader/loader';
import { TLoginUser, TSubmit } from '../../utils/types';

type TState = TLoginUser & TSubmit;

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const submitCb = useCallback((state: TState) => {
        dispatch(authLoginAction(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        email: "",
        password: ""
    }, submitCb);

    const { requestStart, requestError, userLoggedIn } = useSelector(getAuth);
    
    useEffect(() => {
        if (userLoggedIn) {
            const { from } = location.state || { from: { pathname: "/" } };
            if (from.pathname === `${URL_PROFILE}/${URL_PROFILE_LOGOUT}`) {
                from.pathname = URL_ROOT;
            }
            navigate(from.pathname, { replace: true });
        }
    }, [dispatch, location.state, userLoggedIn, navigate]);

    return (
        <main className="page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                {requestStart ? <Loader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Вход</h1>
                        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
                        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} />
                        {!!requestError && state.wasSubmit && <p className={`mb-2 error-text text text_type_main-default`}>{requestError}</p>}
                        <Button type="primary" extraClass="button-bottom" htmlType="submit" disabled={state.email === "" || state.password === ""}>Войти</Button>
                        <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь? <Link className="page-link" to={URL_REGISTER}>Зарегистрироваться</Link></p>
                        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className="page-link" to={URL_FORGOT_PASSWORD}>Восстановить пароль</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default Login;