import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';
import Modal from '../modal/modal';
import { dataPropTypes } from '../../utils/dataPropTypes';

function IngredientDetails({ item, onClose }) {
    return (
        <Modal caption="Детали ингридиента" onClose={onClose}>
            <img className={`${styles.image} mb-4`} src={item.image_large} alt="Изображение ингридиента" />
            <p className={`${styles.name} text-center text text_type_main-medium mb-8`}>{item.name}</p>
            <div className={`${styles.detail} mb-15`}>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item.calories}</div>
                </div>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Белки, г</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item.proteins}</div>
                </div>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Жиры, г</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item.fat}</div>
                </div>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item.carbohydrates}</div>
                </div>
            </div>
        </Modal>
    );
}

IngredientDetails.propTypes = {
    item: dataPropTypes.isRequired,
    onClose: PropTypes.func.isRequired
}

export default IngredientDetails;