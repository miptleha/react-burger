import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ORDER, createOrderAction } from '../../services/actions/create-order';

import styles from './burger-constructor-order.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

function BurgerConstructorOrder() {
    const { bun, ingredients, sum } = useSelector(state => state.burgerConstructor);
    const { orderNumber, orderLoading, orderHasErrors } = useSelector(state => state.createOrder);

    useEffect(() => {
        if (orderHasErrors) {
            alert("Ошибка при создании заказа");
        }
    }, [orderHasErrors]);
    
    const disabled = useMemo(() => {
        let hasIngredient = (ingredients && ingredients.length > 0) || bun;
        let hasOrder = orderNumber !== null || orderLoading;
        return !hasIngredient || hasOrder;
    }, [bun, ingredients, orderNumber, orderLoading]);
    
    const dispatch = useDispatch();

    function showOrder() {
        const orderIngredients = [...ingredients];
        if (bun) {
            orderIngredients.push(bun, bun);
        }
        dispatch(createOrderAction(orderIngredients));
    }

    function hideOrder() {
        dispatch({ type: CLEAR_ORDER });
    }

    return (
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
    );
}

export default BurgerConstructorOrder;