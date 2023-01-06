import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';

function BurgerIngridient({ img, title, price }) {
    return (
        <div className={`${styles.card} mt-6 mb-8`}>
            <div className={`${styles['card-image']} ml-4 mr-4 mb-1`}><img src={img} alt={title} /></div>
            <div className={styles['card-price']}>
                <span className="text text_type_digits-default mr-2 mb-1">{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles['card-title']} text text_type_main-default`}>{title}</div>
        </div>
    );
}

function BurgerIngridientGroup({type, text}) {
    const items = data.filter(i => i.type === type);
    return (
        <div className="group">
            <h2 className="text text_type_main-medium mt-2" id={`${type}-header`}>{text}</h2>
            <div className={styles['group-content']}>
                {items.map((item, index) => (
                    <BurgerIngridient title={item.name} price={item.price} img={item.image} key={type + index}/>
                ))}
            </div>
        </div>
    );
}

function BurgerIngredients() {
    const [tab, setTab] = React.useState('bun');

    function tabChange(value) {
        setTab(value);
        document.getElementById(`${value}-header`).scrollIntoView();
    }

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <div className={`${styles.tabs} mb-8`}>
                <Tab value="bun" active={tab === 'bun'} onClick={tabChange}>Булки</Tab>
                <Tab value="sauce" active={tab === 'sauce'} onClick={tabChange}>Соусы</Tab>
                <Tab value="main" active={tab === 'main'} onClick={tabChange}>Начинки</Tab>
            </div>

            <div className={`${styles.list} custom-scroll`}>
                <BurgerIngridientGroup type="bun" text="Булки" />
                <BurgerIngridientGroup type="sauce" text="Соусы" />
                <BurgerIngridientGroup type="main" text="Начинки" />
            </div>
        </section>
    );
}

export default BurgerIngredients;