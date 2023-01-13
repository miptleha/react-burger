import { useState } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor-order.module.css';
import OrderDetails from '../order-details/order-details';

function BurgerConstructorOrder({ sum, number }) {
    const [show, setShow] = useState(false);

    function showOrder() {
        setShow(true);
    }

    function hideOrder() {
        setShow(false);
    }

    return (
        <div className={`${styles.total} mr-4 mt-10`}>
            <div className="text text_type_digits-medium mr-2 mb-1">{sum}</div>
            <div className={`${styles['total-icon']} mr-10`}><CurrencyIcon type="primary" /></div>
            <Button htmlType="button" type="primary" onClick={showOrder}>Оформить заказ</Button>
            {show && <OrderDetails number={number} onClose={hideOrder} />}
        </div>
    );
}

BurgerConstructorOrder.propTypes = {
    sum: PropTypes.number.isRequired,
    number: PropTypes.string.isRequired
}

export default BurgerConstructorOrder;