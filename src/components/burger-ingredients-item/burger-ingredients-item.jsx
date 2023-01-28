import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import propTypes from 'prop-types';
import { dataPropTypes } from '../../utils/dataPropTypes';
import { SET_DISPLAYED_INGREDIENT } from '../../services/actions/ingredient-window';

import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsItem({ item, count }) {
    const dispatch = useDispatch();

    function showDialogItem() {
        dispatch({type: SET_DISPLAYED_INGREDIENT, item: item});
    }

    const [, dragRef] = useDrag({
        type: item.type,
        item: item
    });

    return (
        <li className={`${styles.card} mt-6 mb-2 ml-3 mr-2`} onClick={showDialogItem} ref={dragRef}>
            <img className={`${styles.image} ml-4 mr-4 mb-1`} src={item.image} alt="Ингридиент" />
            <div className={`${styles.price} mb-1`}>
                <span className="text text_type_digits-default mr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles.title} text text_type_main-default`}>{item.name}</div>
            {count > 0 && <Counter count={count} size="default" extraClass={styles.count} />}
        </li>
    );
}

BurgerIngredientsItem.propTypes = {
    item: dataPropTypes.isRequired,
    count: propTypes.number
}

export default React.memo(BurgerIngredientsItem);
