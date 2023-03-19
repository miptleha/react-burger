import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { getOrdersUser } from '../../services/selectors';
import { ORDERS_USER_END, ORDERS_USER_START } from '../../services/actions/orders-user';
import { WS_URL } from '../../utils/api';

import styles from './profile-orders.module.css';
import Loader from '../../components/loader/loader';
import OrdersList from '../../components/orders-list/orders-list';
import { TOrdersList } from '../../utils/types';

function ProfileOrders() {
    const dispatch = useDispatch();
    const { connected, error, message } = useSelector(getOrdersUser);

    //заказы пользователя почему-то приходят в прямом порядке
    const messageSorted: TOrdersList | null = useMemo(() => {
        if (!message) {
            return null;
        }
        let orders = [...message.orders];
        return { ...message, orders: orders.sort((a, b) => b.number - a.number) };
    }, [message]);

    useEffect(() => {
        dispatch({ type: ORDERS_USER_START, url: `${WS_URL}/orders`, addToken: true });
        return () => {
            dispatch({ type: ORDERS_USER_END });
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {!connected && <Loader />}
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {connected && !!messageSorted && (
                <OrdersList data={messageSorted!} />
            )}
        </div>
    );
}

export default ProfileOrders;