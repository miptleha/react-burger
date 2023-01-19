import { useState, useContext, useMemo } from 'react';
import { dataPropTypes } from '../../utils/dataPropTypes';
import { OrderContext } from '../../services/order-context';

import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BUN } from '../../utils/dataNames';

function BurgerIngredientItem({ item }) {
    const [ show, setShow ] = useState(false);
    const { ingredients, bun } = useContext(OrderContext);

    const count = useMemo(() => {
        if (item.type === BUN && bun) {
            return bun._id === item._id ? 1 : 0;
        }
        else {
            const list = ingredients.filter(i => i._id === item._id);
            return list.length;
        }
    }, [item, bun, ingredients]);

//    useEffect(() => {
//        const list = ingredients.filter(i => i._id = item._id);
//        console.log(`item: ${item.name}, list: ${list.length}, ing: ${ingredients.length}`);
//        setCount(list.length);
  //  }, [item, ingredients, setCount]);

    function showDialog() {
        setShow(true);
    }

    function hideDialog(e) {
        setShow(false);
        e.stopPropagation();
    }

    return (
        <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} onClick={showDialog}>
            <img className={`${styles.image} ml-4 mr-4 mb-1`} src={item.image} alt="Ингридиент" />
            <div className={`${styles.price} mb-1`}>
                <span className="text text_type_digits-default mr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles.title} text text_type_main-default`}>{item.name}</div>
            {count > 0 && <Counter count={count} size="default" extraClass={styles.count} />}
            {show && <IngredientDetails item={item} onClose={hideDialog} />}
        </li>
    );
}

BurgerIngredientItem.propTypes = {
    item: dataPropTypes.isRequired
}

export default BurgerIngredientItem;