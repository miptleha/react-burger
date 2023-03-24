import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { useForm } from '../../hooks/useForm';
import { getAuth } from '../../services/selectors';
import { authGetUserAction, authPatchUserAction } from '../../services/actions/auth';

import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../../components/loader/loader';
import { TPatchUser, TSubmit } from '../../utils/types';

type TState = TPatchUser & TSubmit;

function ProfileEdit() {
    const dispatch = useDispatch();

    const submitCb = useCallback((state: TState) => {
        dispatch(authPatchUserAction(state));
        setNameDisabled(true);
    }, [dispatch]);

    const { requestStart, requestError, requestSuccess, user } = useSelector(getAuth);

    const { state, setState, onChange, onSubmit } = useForm<TState>({
        name: "",
        email: "",
        password: ""
    }, submitCb);

    useEffect(() => {
        //при открытии страницы еще раз запрашиваем данные пользователя (если параллельно в другой вкладке вышли или поменяли пользователя)
        dispatch(authGetUserAction());
    }, [dispatch]);

    useEffect(() => {
        //получили данные пользователя, заполняем форму
        if (requestSuccess) {
            setState({ name: user ? user.name : "", email: user ? user.email : "", password: "" });
        }
    }, [setState, user, requestSuccess]);

    const [nameDisabled, setNameDisabled] = useState<boolean>(true);

    const valueChange = (state.name !== user?.name || state.email !== user?.email || state.password.length > 0);

    const onReset = useCallback<React.FormEventHandler>((e: React.FormEvent) => {
        e.preventDefault();
        setState({ name: user ? user.name : "", email: user ? user.email : "", password: "" });
        setNameDisabled(true);
    }, [setState, user]);

    const nameRef = useRef<HTMLInputElement>(null);

    const nameClick = useCallback(() => {
        setNameDisabled(false);
        setTimeout(() => {
            nameRef.current?.focus();
        }, 0);
    }, [setNameDisabled, nameRef]);

    return (
        <form className="page-top page-container-inner" onSubmit={onSubmit} onReset={onReset}>
            <Input extraClass="mb-6" name="name" placeholder="Имя" value={state.name} onChange={onChange} icon="EditIcon" disabled={nameDisabled} onIconClick={nameClick} ref={nameRef} />
            <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} isIcon />
            <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} icon="EditIcon" />
            {!!requestError && state.wasSubmit && <p className={`mb-2 error-text text text_type_main-default`}>{requestError}</p>}
            {requestStart ? <Loader /> : valueChange ? (<div>
                <Button type="primary" htmlType='reset'>Отмена</Button>
                <Button type="primary" extraClass="ml-5" htmlType='submit'>Сохранить</Button>
            </div>) : undefined}
        </form>
    );
}

export default ProfileEdit;