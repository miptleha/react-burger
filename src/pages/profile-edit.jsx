import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { getAuth } from '../services/selectors';
import { authPatchUserAction, authGetUserAction, AUTH_CLEAR_ERRORS } from '../services/actions/auth';

import './pages.css';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/loader/loader';

function ProfileEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state) => {
        dispatch(authPatchUserAction(state));
        setLoadState({ loadUser: false, patchUser: true });
    }, [dispatch]);

    const { requestStart, requestError, requestSuccess, user } = useSelector(getAuth);

    const { state, setState, onChange, onSubmit } = useForm({
        name: "",
        email: "",
        password: ""
    }, submitCb);

    const [ loadState, setLoadState ] = useState({
        loadUser: true,
        patchUser: false
    });

    const valueChange = (user.name !== "" && (state.name !== user.name || state.email !== user.email || state.password.length > 0));

    const onReset = useCallback((e) => {
        e.preventDefault();
        setState({ name: user.name, email: user.email, password: "" });
    }, [setState, user]);

    useEffect(() => {
        if (user.name === "") {
            dispatch(authGetUserAction());
        }
        setLoadState({ loadUser: true, patchUser: false });
    }, [user.name, navigate, dispatch]);

    useEffect(() => {
        if (requestSuccess) {
            if (loadState.loadUser) {
                setState({ name: user.name, email: user.email, password: "" });
                setLoadState({ loadUser: false, patchUser: false });
            } else if (loadState.patchUser) {
                navigate('/profile', { replace: true });
            }
        } else if (requestError && (loadState.loadUser || loadState.patchUser)) {
            alert(`[Профиль ${loadState.loadUser ? "загрузка" : loadState.patchUser ? "сохранение" : "?"}] ${requestError}`);
            setLoadState({ loadUser: false, patchUser: false });
            dispatch({type: AUTH_CLEAR_ERRORS});
        }
    }, [dispatch, requestSuccess, loadState, setLoadState, setState, user, navigate, requestError]);

    return (
        <form className="page-container-inner" onSubmit={onSubmit} onReset={onReset}>
            <Input extraClass="mb-6" name="name" placeholder="Имя" value={state.name} onChange={onChange} icon="EditIcon" />
            <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} icon="EditIcon" />
            <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} icon="EditIcon" />
            {requestStart ? <Loader /> : valueChange ? (<div>
                <Button type="primary" htmlType='reset'>Отмена</Button>
                <Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
            </div>) : undefined}
        </form>
    );
}

export default ProfileEdit;