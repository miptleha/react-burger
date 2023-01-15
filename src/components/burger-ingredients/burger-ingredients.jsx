import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import { BUN, SAUCE, MAIN, names } from '../../utils/dataNames';
import { dataPropTypes } from '../../utils/dataPropTypes';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

function BurgerIngredients({ data }) {
    const groups = React.useMemo(() => {
        let res = {};
        res[BUN] = data.filter(i => i.type === BUN);
        res[SAUCE] = data.filter(i => i.type === SAUCE);
        res[MAIN] = data.filter(i => i.type === MAIN);
        return res;
    }, [data]);
    
    const headers = {};
    headers[BUN] = React.useRef(null);
    headers[SAUCE] = React.useRef(null);
    headers[MAIN] = React.useRef(null);

    function tabChange(value) {
        headers[value].current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <BurgerIngredientsTabs tabChange={tabChange} />

            <div className={styles.list}>
                {[BUN, SAUCE, MAIN].map((type, typeIndex) => (
                    <div key={typeIndex}>
                        <h2 className="text text_type_main-medium mt-2" ref={headers[type]}>{names[type]}</h2>
                        <ul className={styles['group-content']}>
                            {groups[type].map((item, index) => (
                                <BurgerIngredientsItem title={item.name} price={item.price} img={item.image} key={type + index}/>
                            ))}
                        </ul>
                    </div> 
                ))}
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

export default BurgerIngredients;