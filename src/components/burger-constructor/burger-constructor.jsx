import styles from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';

function BurgerInnerItem({text, price, thumbnail, isTop}) {
    return (
        <li className={!isTop && "mt-4"}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </li>
    );
}

function BurgerConstructor() {
    const list = data.filter(item => item.type !== "bun");
    const bun = data.find(item => item.name.includes("Краторная булка"));
    return (
        <section className={styles.section}>
            <div className={`${styles.constructor} mt-25`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass="ml-6"
                />
                <ul className={`${styles.scroll} custom-scroll mt-4 mb-4`}>
                    {list.map((item, index) => (
                        <BurgerInnerItem text={item.name} price={item.price} thumbnail={item.image} isTop={index === 0} key={index}/>
                    ))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass="ml-6"
                />
            </div>

            <div className={`${styles.total} mr-4 mt-10`}>
                <div className={`${styles.totalPrice} text text_type_digits-medium mr-2 mb-1`}>600</div>
                <div className={`${styles.totalIcon} mr-10`}><CurrencyIcon type="primary" /></div>
                <Button type="primary">Оформить заказ</Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;