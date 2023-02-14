import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import { getAuth } from '../services/selectors';
import { authGetUserAction } from '../services/actions/auth';
import { URL_LOGIN } from '../utils/routes';
import Loader from './loader/loader';

function ProtectedRoute({ element }) {
    const { requestStart, requestError, user } = useSelector(getAuth);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.name === "") {
            dispatch(authGetUserAction());
        }
    }, [dispatch, user.name]);

    useEffect(() => {
        if (requestError) {
            navigate(URL_LOGIN, { replace: true, state: { from: location } });
            return undefined;
        }
    }, [requestError, navigate, location]);

    return requestStart || user.name === "" ? <Loader /> : element;
}

ProtectedRoute.propTypes = {
    element: propTypes.element.isRequired
}

export default ProtectedRoute;