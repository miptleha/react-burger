import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getAuth } from '../../services/selectors';
import { authGetUserAction, authRegisterAction, AUTH_CLEAR_ERRORS } from '../../services/actions/auth';
import { URL_LOGIN, URL_ROOT } from '../../utils/routes';

import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../../components/loader/loader';
import { TRegisterUser } from '../../utils/api';

type TState = TRegisterUser & {
    wasSubmit?: boolean;
}

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(authGetUserAction() as any);
    }, [dispatch]);

    const submitCb = useCallback((state: TState) => {
        dispatch(authRegisterAction(state) as any);
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        name: "",
        email: "",
        password: ""
    }, submitCb);

    const { requestStart, requestError, userLoggedIn } = useSelector(getAuth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate(URL_ROOT, { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Регистрация] ${requestError}`);
            dispatch({ type: AUTH_CLEAR_ERRORS });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, navigate, requestError]);

    return (
        <main className="page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                {requestStart || userLoggedIn ? <Loader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                        <Input placeholder="Имя" extraClass="mb-6" name="name" value={state.name} onChange={onChange} />
                        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
                        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} />
                        {requestStart ? <Loader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.name === "" || state.email === "" || state.password === ""}>Зарегистрироваться</Button>}
                        <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link className="page-link" to={URL_LOGIN}>Войти</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default Register;