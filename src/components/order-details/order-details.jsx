import PropTypes from 'prop-types';
import img from '../../images/done.png';
import Modal from '../modal/modal';
import styles from './order-details.module.css';

function OrderDetails({ number, onClose }) {
    return (
        <Modal onClose={onClose}>
            <p className={`${styles["order-number"]} text text_type_digits-large mb-8`}>{number}</p>
            <p className="text text_type_main-medium mb-15 text-center">идентификатор заказа</p>
            <img src={img} className={`${styles.image} mb-15 text-center`} alt="Заказ принят" />
            <p className="text text_type_main-default mb-2 text-center">Ваш заказ начали готовить</p>
            <p className={`${styles["last-p"]} text text_type_main-default text_color_inactive mb-30 text-center`}>Дождитесь готовности на орбитальной станции</p>
        </Modal>
    );
}

OrderDetails.propTypes = {
    number: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default OrderDetails;