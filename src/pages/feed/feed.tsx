import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { ORDERS_ALL_END, ORDERS_ALL_START } from '../../services/actions/orders-all';
import { WS_URL_ALL } from '../../utils/api';
import { getOrdersAll } from '../../services/selectors';

import styles from './feed.module.css';
import OrdersList from '../../components/orders-list/orders-list';
import OrdersStatus from '../../components/orders-status/orders-status';
import Loader from '../../components/loader/loader';

function FeedPage() {
    const dispatch = useDispatch();
    const { connected, error, message } = useSelector(getOrdersAll);

    useEffect(() => {
        dispatch({ type: ORDERS_ALL_START, url: WS_URL_ALL });
        return () => {
            dispatch({ type: ORDERS_ALL_END });
        };
    }, [dispatch]);

    return (
        <div className="feed">
            {!connected && <Loader />}
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {connected && !!message && (
                <main className={styles.content}>
                    <section className={styles.left_section}>
                        <p className="text text_type_main-large mt-6">Лента заказов</p>
                        <OrdersList data={message} />
                    </section>
                    <section className={styles.right_section}>
                        <OrdersStatus data={message} />
                    </section>
                </main>
            )}
        </div>
    );
}

export default FeedPage;