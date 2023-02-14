import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { authLogoutAction, AUTH_CLEAR_ERRORS } from '../../services/actions/auth';
import { getAuth } from '../../services/selectors';
import { URL_LOGIN } from '../../utils/routes';

import Loader from '../../components/loader/loader';

function ProfileLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { requestError, requestSuccess, userLoggedIn } = useSelector(getAuth);

    useEffect(() => {
        if (userLoggedIn) {
            dispatch(authLogoutAction());
            setStarted(true);
        }
    }, [userLoggedIn, dispatch]);

    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (started && requestError) {
            alert(`[Выход] ${requestError}`);
            dispatch({type: AUTH_CLEAR_ERRORS});
            setStarted(false);
        } else if (started && requestSuccess) {
            navigate(URL_LOGIN, { replace: true });
        }
    }, [dispatch, started, requestError, requestSuccess, navigate]);

    return (
        <div className="page-container-inner">
            {started && <Loader />}
        </div>
    );
}

export default ProfileLogout;