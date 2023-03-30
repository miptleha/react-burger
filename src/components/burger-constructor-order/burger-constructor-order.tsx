import { useMemo, useCallback, FC } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from '../../hooks/redux';
import { CLEAR_ORDER, createOrderAction } from '../../services/actions/create-order';
import { getAuth, getIngredients, createOrder } from '../../services/selectors';
import { URL_LOGIN } from '../../utils/routes';

import styles from './burger-constructor-order.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import Loader from '../loader/loader';
import { TIngredient } from '../../utils/types';
import { CLEAR_CONSTRUCTOR } from '../../services/actions/burger-constructor';

const BurgerConstructorOrder: FC = () => {
    const { bun, ingredients, sum } = useSelector(getIngredients);
    const { orderNumber, orderLoading, orderHasErrors } = useSelector(createOrder);

    const disabled = useMemo(() => {
        let hasIngredient = (ingredients && ingredients.length > 0) || bun;
        let hasOrder = orderNumber !== null || orderLoading;
        return !hasIngredient || hasOrder;
    }, [bun, ingredients, orderNumber, orderLoading]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLoggedIn, requestStart } = useSelector(getAuth);

    const showOrder = useCallback(() => {
        if (requestStart) {
            return;
        }

        if (!userLoggedIn) {
            navigate(URL_LOGIN, { replace: true });
        } else {
            const orderIngredients: Array<TIngredient> = [...ingredients];
            if (bun) {
                orderIngredients.unshift(bun);
                orderIngredients.push(bun);
            }
            dispatch(createOrderAction(orderIngredients));
        }
    }, [requestStart, userLoggedIn, navigate, ingredients, bun, dispatch]);

    function hideOrder() {
        dispatch({ type: CLEAR_ORDER });
        dispatch({ type: CLEAR_CONSTRUCTOR });
    }

    return (
        <>
            {orderHasErrors && (
                <p className={`mt-2 page-container-inner error-text text text_type_main-default`}>Ошибка при создании заказа</p>
            )}
            {orderLoading ? <Loader /> : (
                <div className={`${styles.total} mr-4 mt-10`}>
                    <div className="text text_type_digits-medium mr-2 mb-1">{sum}</div>
                    <div className={`${styles['total-icon']} mr-10`}><CurrencyIcon type="primary" /></div>
                    <Button htmlType="button" type="primary" disabled={disabled} onClick={showOrder}>Оформить заказ</Button>
                    {orderNumber && (
                        <Modal onClose={hideOrder}>
                            <OrderDetails number={orderNumber} />
                        </Modal>
                    )}
                </div>
            )}
        </>
    );
}

export default BurgerConstructorOrder;