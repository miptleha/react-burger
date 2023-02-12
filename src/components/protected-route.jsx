import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from '../services/selectors';
import { authGetUserAction } from '../services/actions/auth';
import Loader from './loader/loader';

function ProtectedRoute({ element }) {
    const { userLoggedIn, requestStart, requestError } = useSelector(getAuth);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userLoggedIn) {
            dispatch(authGetUserAction());
        }
    }, [userLoggedIn, dispatch]);

    useEffect(() => {
        if (requestError) {
            navigate("/login", { replace: true, state: { from: location } });
            return undefined;
        }
    }, [requestError, navigate, location]);

    return !userLoggedIn || requestStart ? <Loader /> : element;
}

export default ProtectedRoute;