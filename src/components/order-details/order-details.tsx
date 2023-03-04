import { FC } from 'react';
import img from '../../images/done.png';
import styles from './order-details.module.css';

type TProps = {
    number: string;
}

const OrderDetails: FC<TProps> = ({ number }) => {
    return (
        <>
            <p className={`${styles["order-number"]} text text_type_digits-large mb-8 text-center`}>{number}</p>
            <p className="text text_type_main-medium mb-15 text-center">идентификатор заказа</p>
            <img src={img} className={`${styles.image} mb-15 text-center`} alt="Заказ принят" />
            <p className="text text_type_main-default mb-2 text-center">Ваш заказ начали готовить</p>
            <p className={`${styles["last-p"]} text text_type_main-default text_color_inactive mb-30 text-center`}>Дождитесь готовности на орбитальной станции</p>
        </>
    );
}

export default OrderDetails;