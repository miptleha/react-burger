import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getAuth } from '../../services/selectors';
import { authPatchUserAction, AUTH_CLEAR_ERRORS } from '../../services/actions/auth';
import { TPatchUser } from '../../utils/api';

import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../../components/loader/loader';

type TState = TPatchUser & {
    wasSubmit?: boolean;
};

function ProfileEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state: TState) => {
        dispatch(authPatchUserAction(state) as any);
    }, [dispatch]);

    const { requestStart, requestError, requestSuccess, user } = useSelector(getAuth);

    const { state, setState, onChange, onSubmit } = useForm<TState>({
        name: "",
        email: "",
        password: ""
    }, submitCb);

    const [nameDisabled, setNameDisabled] = useState<boolean>(true);

    const valueChange = (user.name !== "" && (state.name !== user.name || state.email !== user.email || state.password.length > 0));

    const onReset = useCallback<React.FormEventHandler>((e: React.FormEvent) => {
        e.preventDefault();
        setState({ name: user.name, email: user.email, password: "" });
    }, [setState, user]);

    useEffect(() => {
        if (requestError) {
            alert(`[Профиль сохранение] ${requestError}`);
            dispatch({ type: AUTH_CLEAR_ERRORS });
        } else {
            setState({ name: user.name, email: user.email, password: "" });
        }
    }, [dispatch, setState, user, navigate, requestError, requestSuccess]);

    const nameRef = useRef<HTMLInputElement>(null);

    const nameClick = useCallback(() => {
        setNameDisabled(false);
        setTimeout(() => {
            nameRef.current?.focus();
        }, 0);
    }, [setNameDisabled, nameRef]);

    return (
        <form className="page-container-inner" onSubmit={onSubmit} onReset={onReset}>
            <Input extraClass="mb-6" name="name" placeholder="Имя" value={state.name} onChange={onChange} icon="EditIcon" disabled={nameDisabled} onIconClick={nameClick} ref={nameRef} />
            <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} isIcon />
            <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} icon="EditIcon" />
            {requestStart ? <Loader /> : valueChange ? (<div>
                <Button type="primary" htmlType='reset'>Отмена</Button>
                <Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
            </div>) : undefined}
        </form>
    );
}

export default ProfileEdit;