import React, { useCallback, FC, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { SET_DISPLAYED_INGREDIENT } from '../../services/actions/ingredient-window';
import { URL_INGREDIENTS } from '../../utils/routes';

import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

type TProps = {
    item: TIngredient;
    count: number;
};

const BurgerIngredientsItem: FC<TProps> = ({ item, count }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const showDialogItem = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        navigate(`${URL_INGREDIENTS}/${item._id}`, { replace: true, state: { location: location, item: item } });
        dispatch({ type: SET_DISPLAYED_INGREDIENT, item: item });
    }, [dispatch, navigate, location, item]);

    const [, dragRef] = useDrag({
        type: item.type,
        item: item
    });

    return (
        <Link className={styles.link} to={`${URL_INGREDIENTS}/${item._id}`} onClick={showDialogItem} ref={dragRef}>
            <li className={`${styles.card} mt-6 mb-2 ml-3 mr-2`}>
                <img className={`${styles.image} ml-4 mr-4 mb-1`} src={item.image} alt="Ингридиент" />
                <div className={`${styles.price} mb-1`}>
                    <span className="text text_type_digits-default mr-2">{item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${styles.title} text text_type_main-default`}>{item.name}</div>
                {count > 0 && <Counter count={count} size="default" extraClass={styles.count} />}
            </li>
        </Link>
    );
}

export default React.memo(BurgerIngredientsItem);
