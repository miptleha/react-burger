import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerConstructor({ data }) {
    const list = data.filter(item => item.type !== "bun");
    const bun = data.find(item => item.name.includes("Краторная булка"));
    return (
        <section className={styles.section}>
            <div className="mt-25 ml-4">
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
                        <BurgerInnerItem text={item.name} price={item.price} thumbnail={item.image} key={index}/>
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

            <div className={`${styles.total} mr-4 mt-10`}>
                <div className="text text_type_digits-medium mr-2 mb-1">{bun.price * 2 + list.reduce((sum, item) => sum += item.price, 0)}</div>
                <div className={`${styles['total-icon']} mr-10`}><CurrencyIcon type="primary" /></div>
                <Button htmlType="button" type="primary">Оформить заказ</Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array //более точная проверка во вложенном компоненте
}

function BurgerInnerItem({ text, price, thumbnail }) {
    return (
        <li className={`${styles['list-item']} mt-4`}>
            <span className={styles.draggable}><DragIcon type="primary" /></span>
            <ConstructorElement
                text={text}
                price={price}
                thumbnail={thumbnail}
                extraClass={`${styles.ingredient} ml-2`}
            />
        </li>
    );
}

BurgerInnerItem.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
}

export default BurgerConstructor;