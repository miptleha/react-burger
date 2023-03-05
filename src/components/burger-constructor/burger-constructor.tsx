import { useEffect, useCallback, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { SET_BUN, SET_SUM, DELETE_INGREDIENT, addIngredient } from '../../services/actions/burger-constructor';
import { getIngredients } from '../../services/selectors';
import { TIngredientConstructor } from '../../utils/types';

import styles from './burger-constructor.module.css';
import { BUN, SAUCE, MAIN } from '../../utils/dataNames';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorOrder from '../burger-constructor-order/burger-constructor-order';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(getIngredients);

    useEffect(() => {
        let sum = 0;
        if (bun) {
            sum += bun.price * 2;
        }
        sum += ingredients.reduce((sum: number, item: TIngredientConstructor) => sum += item.price, 0);
        dispatch({ type: SET_SUM, sum });
    }, [bun, ingredients, dispatch]);

    const [, dropTargetBunUp] = useDrop({
        accept: BUN,
        drop(item) {
            dispatch({ type: SET_BUN, item: item });
        }
    });

    const [, dropTargetBunDown] = useDrop({
        accept: BUN,
        drop(item) {
            dispatch({ type: SET_BUN, item: item });
        }
    });

    const [, dropTargetIngredient] = useDrop({
        accept: [SAUCE, MAIN],
        drop(item) {
            dispatch(addIngredient(item));
        }
    });

    const deleteIngredient = useCallback((index: number) => {
        dispatch({ type: DELETE_INGREDIENT, index: index })
    }, [dispatch]);

    return (
        <section className={styles.section}>
            <div className={`${styles.burger} mt-25 ml-4`}>
                <div ref={dropTargetBunUp}>
                    {bun ?
                        (<ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={`${styles.ingredient} ml-8`}
                        />) :
                        (<div className={`${styles["empty-element"]} constructor-element constructor-element_pos_top ml-8`}>
                            <div className={`${styles["empty-element-text"]} text text_type_main-default`}>Перетащите булку</div>
                        </div>)
                    }
                </div>
                <ul className={`${styles.scroll} mt-4 mb-4`} ref={dropTargetIngredient}>
                    {ingredients && ingredients.length > 0 ? ingredients.map((item: TIngredientConstructor, index: number) => (
                        <BurgerConstructorIngredient key={item.id} item={item} index={index} onDelete={deleteIngredient} />
                    )) :
                        (<div className={`${styles["empty-element"]} constructor-element ml-8`}>
                            <div className={`${styles["empty-element-text"]} text text_type_main-default`}>Перетащите ингридиенты</div>
                        </div>)}
                </ul>
                <div ref={dropTargetBunDown}>
                    {bun ?
                        (<ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={`${styles.ingredient} ml-8`}
                        />) :
                        (<div className={`${styles["empty-element"]} constructor-element constructor-element_pos_bottom ml-8`}>
                            <div className={`${styles["empty-element-text"]} text text_type_main-default`}>Перетащите булку</div>
                        </div>)
                    }
                </div>
            </div>

            <BurgerConstructorOrder />
        </section>
    );
}

export default BurgerConstructor;