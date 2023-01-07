import React from 'react';
import styles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerIngredients({data}) {
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

            <div className={styles.list}>
                <BurgerIngridientGroup type="bun" text="Булки" data={data.filter(i => i.type === "bun")} />
                <BurgerIngridientGroup type="sauce" text="Соусы" data={data.filter(i => i.type === "sauce")} />
                <BurgerIngridientGroup type="main" text="Начинки" data={data.filter(i => i.type === "main")} />
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired //более точная проверка во вложенном компоненте
}

function BurgerIngridientGroup({ type, text, data }) {
    return (
        <div className="group">
            <h2 className="text text_type_main-medium mt-2" id={`${type}-header`}>{text}</h2>
            <ul className={styles['group-content']}>
                {data.map((item, index) => (
                    <BurgerIngridient title={item.name} price={item.price} img={item.image} key={type + index}/>
                ))}
            </ul>
        </div>
    );
}

BurgerIngridientGroup.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

function BurgerIngridient({ img, title, price }) {
    return (
        <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`}>
            <img className={`${styles['card-image']} ml-4 mr-4 mb-1`} src={img} alt={title} />
            <div className={`${styles['card-price']} mb-1`}>
                <span className="text text_type_digits-default mr-2">{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles['card-title']} text text_type_main-default`}>{title}</div>
        </li>
    );
}

BurgerIngridient.propTypes = {
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired

}

export default BurgerIngredients;