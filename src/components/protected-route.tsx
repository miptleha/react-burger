import { FC } from 'react';
import { useSelector } from '../hooks/redux';
import { useLocation, Navigate } from 'react-router-dom';
import { getAuth } from '../services/selectors';

type TProps = {
    element: React.ReactElement;
    anonymous?: boolean;
};

const ProtectedRoute: FC<TProps> = ({ element, anonymous }) => {
  const { userLoggedIn } = useSelector(getAuth);
    const location = useLocation();

    const from = location.state?.from || '/';
    //Если разрешен неавторизованный доступ, а пользователь авторизован
    if (anonymous && userLoggedIn) {
      //то отправляем его на предыдущую страницу
      return <Navigate to={ from } />;
    }
  
    //Если требуется авторизация, а пользователь не авторизован
    if (!anonymous && !userLoggedIn) {
      //то отправляем его на страницу логин
      return <Navigate to="/login" state={{ from: location}}/>;
    }
  
    //Если все ок, то рендерим внутреннее содержимое
    return element;
}

export default ProtectedRoute;