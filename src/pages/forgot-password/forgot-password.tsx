import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getAuth } from '../../services/selectors';
import { authGetUserAction, authForgotPasswordAction, AUTH_CLEAR_ERRORS } from '../../services/actions/auth';
import { URL_LOGIN, URL_RESET_PASSWORD, URL_ROOT } from '../../utils/routes';
import { TForgotPassword } from '../../utils/api';

import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../../components/loader/loader';

type TState = TForgotPassword & {
    wasSubmit?: boolean
}

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(authGetUserAction() as any);
    }, [dispatch]);

    const submitCb = useCallback((state: TState) => {
        dispatch(authForgotPasswordAction(state) as any);
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        email: ""
    }, submitCb);

    const { requestStart, requestError, requestSuccess, userLoggedIn } = useSelector(getAuth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate(URL_ROOT, { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Восстановление пароля] ${requestError}`);
            dispatch({ type: AUTH_CLEAR_ERRORS });
        } else if (state.wasSubmit && requestSuccess) {
            navigate(URL_RESET_PASSWORD, { replace: true });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, requestError, requestSuccess, navigate]);

    return (
        <main className="page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                {requestStart || userLoggedIn ? <Loader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                        <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' name="email" value={state.email} onChange={onChange} />
                        {requestStart ? <Loader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === ""}>Восстановить</Button>}
                        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to={URL_LOGIN}>Войти</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default ForgotPassword;