import { useState, useContext } from 'react';
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor-order.module.css';
import OrderDetails from '../order-details/order-details';
import { OrderContext } from '../../services/order-context';
import { orderCreate } from '../../utils/orderCreate';
import Modal from '../modal/modal';

function BurgerConstructorOrder() {
    const [show, setShow] = useState(false);
    const [number, setNumber] = useState('');
    const { ingredients, sumState } = useContext(OrderContext);

    function showOrder() {
        orderCreate(ingredients)
            .then(num => {
                setNumber(num);
                setShow(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function hideOrder() {
        setShow(false);
    }

    return (
        <div className={`${styles.total} mr-4 mt-10`}>
            <div className="text text_type_digits-medium mr-2 mb-1">{sumState.sum}</div>
            <div className={`${styles['total-icon']} mr-10`}><CurrencyIcon type="primary" /></div>
            <Button htmlType="button" type="primary" onClick={showOrder}>Оформить заказ</Button>
            {show && (
                <Modal onClose={hideOrder}>
                    <OrderDetails number={number} />
                </Modal>
            )}
        </div>
    );
}

export default BurgerConstructorOrder;