import { useContext, useEffect } from 'react';
import styles from './burger-constructor.module.css';
import { BUN } from '../../utils/dataNames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorOrder from '../burger-constructor-order/burger-constructor-order';
import { OrderContext } from '../../services/order-context';

function BurgerConstructor() {

    const { data, bun, setBun, ingredients, setIngredients, sumDispatcher } = useContext(OrderContext);

    useEffect(() => {
        const buns = data.filter(item => item.type === BUN);
        setBun(buns[Math.floor(Math.random() * buns.length)]);

        const list = data.filter(item => item.type !== BUN &&
            Math.round(Math.random()) === 1);
        setIngredients(list);
    }, [data, setBun, setIngredients]);

    useEffect(() => {
        if (bun) {
            const sum = bun.price * 2 + ingredients.reduce((sum, item) => sum += item.price, 0);
            sumDispatcher({ type: 'set', value: sum });
        }
    }, [bun, ingredients, sumDispatcher]);

    return bun && (
        <section className={styles.section}>
            <div className={`${styles.burger} mt-25 ml-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={`${styles.ingredient} ml-8`}
                />
                <ul className={`${styles.scroll} mt-4 mb-4`}>
                    {ingredients.map((item, index) => (
                        <li className={`${styles['list-item']} mt-4`} key={index}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                extraClass={`${styles.ingredient} ml-2`}
                            />
                        </li>
                    ))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={`${styles.ingredient} ml-8`}
                />
            </div>

            <BurgerConstructorOrder />
        </section>
    );
}

export default BurgerConstructor;