import { useMemo } from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { dataPropTypes } from '../../utils/dataPropTypes';
import { BUN } from '../../utils/dataNames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorOrder from '../burger-constructor-order/burger-constructor-order';


function BurgerConstructor({ data }) {
    const list = useMemo(() => data.filter(item => item.type !== BUN), [data]);
    const bun = useMemo(() => data.find(item => item.type === BUN), [data]);
    const sum = useMemo(() => bun.price * 2 + list.reduce((sum, item) => sum += item.price, 0), [list, bun]);

    return (
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
                    {list.map((item, index) => (
                        <li className={`${styles['list-item']} mt-4`} key={index}>
                            <span className={styles.draggable}><DragIcon type="primary" /></span>
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

            <BurgerConstructorOrder sum={sum} number="034536" />
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

export default BurgerConstructor;