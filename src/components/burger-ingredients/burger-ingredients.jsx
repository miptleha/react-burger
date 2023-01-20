import { useContext, useMemo, useRef, useState } from 'react';
import { BUN, SAUCE, MAIN, names } from '../../utils/dataNames';
import { OrderContext } from '../../services/order-context';

import styles from './burger-ingredients.module.css';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

function BurgerIngredients() {
    const [itemShow, setItemShow] = useState(null);
    
    const { data } = useContext(OrderContext);
    
    const groups = useMemo(() => {
        let res = {};
        res[BUN] = data.filter(i => i.type === BUN);
        res[SAUCE] = data.filter(i => i.type === SAUCE);
        res[MAIN] = data.filter(i => i.type === MAIN);
        return res;
    }, [data]);
    
    const headers = {};
    headers[BUN] = useRef(null);
    headers[SAUCE] = useRef(null);
    headers[MAIN] = useRef(null);

    function tabChange(value) {
        headers[value].current.scrollIntoView({ behavior: "smooth" });
    }

    function showDialog(item) {
        setItemShow(item);
    }

    function hideDialog(e) {
        setItemShow(null);
        e.stopPropagation();
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
                            {groups[type].map((item) => (
                                <BurgerIngredientsItem key={item._id} item={item} onShowDetails={showDialog}/>
                            ))}
                        </ul>
                    </div> 
                ))}
            </div>

            {itemShow && (
                <Modal caption="Детали ингридиента" onClose={hideDialog}>
                    <IngredientDetails item={itemShow} />
                </Modal>
            )}
        </section>
    );
}

export default BurgerIngredients;