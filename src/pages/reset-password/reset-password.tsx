import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getAuth } from '../../services/selectors';
import { authResetPasswordAction } from '../../services/actions/auth';
import { URL_FORGOT_PASSWORD, URL_LOGIN, URL_ROOT } from '../../utils/routes';

import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../../components/loader/loader';
import { TResetPassword, TSubmit } from '../../utils/types';

type TState = TResetPassword & TSubmit;

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state: TState) => {
        dispatch(authResetPasswordAction(state) as any);
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        password: "",
        token: ""
    }, submitCb);

    const { requestStart, requestError, requestSuccess, userLoggedIn, forgotPassword } = useSelector(getAuth);
   
    useEffect(() => {
        if (userLoggedIn) {
            navigate(URL_ROOT, { replace: true });
        } else if (!forgotPassword) {
            navigate(URL_FORGOT_PASSWORD, { replace: true });
        } else if (state.wasSubmit && requestSuccess) {
            navigate(URL_LOGIN, { replace: true });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, forgotPassword, requestSuccess, navigate]);

    return (
        <main className="page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <PasswordInput placeholder='Введите новый пароль' name="password" value={state.password} onChange={onChange} extraClass="mb-6" />
                <Input placeholder='Введите код из письма' name="token" value={state.token} onChange={onChange} extraClass="mb-6" />
                {!!requestError && state.wasSubmit && <p className={`mb-2 error-text text text_type_main-default`}>{requestError}</p>}
                {requestStart ? <Loader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.password === "" || state.token === ""}>Сохранить</Button>}
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to={URL_LOGIN}>Войти</Link></p>
            </form>
        </main>
    );
}

export default ResetPassword;