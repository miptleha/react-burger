import { useMemo, useRef, FC } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { BUN, SAUCE, MAIN, names } from '../../utils/dataNames';
import { SET_TAB } from '../../services/actions/tab-info';
import { getData, getIngredients, getTab } from '../../services/selectors';
import { TIngredient } from '../../utils/types';

import styles from './burger-ingredients.module.css';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';

const BurgerIngredients: FC = () => {
    const { data } = useSelector(getData);
    const tab = useSelector(getTab);
    const { bun, ingredients } = useSelector(getIngredients);

    const countData = useMemo(() => {
        const res: Record<string, number> = {};
        if (bun) {
            res[bun._id] = 2;
        }
        for (let item of ingredients) {
            if (!(item._id in res)) {
                res[item._id] = 0;
            }
            res[item._id]++;
        }
        return res;
    }, [bun, ingredients]);

    const dispatch = useDispatch();

    const groups = useMemo(() => {
        let res: Record<string, Array<TIngredient>> = {};
        res[BUN] = data.filter((i: TIngredient) => i.type === BUN);
        res[SAUCE] = data.filter((i: TIngredient) => i.type === SAUCE);
        res[MAIN] = data.filter((i: TIngredient) => i.type === MAIN);
        return res;
    }, [data]);

    const headers: Record<string, React.RefObject<HTMLHeadingElement>> = {};
    headers[BUN] = useRef(null);
    headers[SAUCE] = useRef(null);
    headers[MAIN] = useRef(null);

    function tabChange(value: string) {
        headers[value].current?.scrollIntoView({ behavior: "smooth" });
    }

    function handleScroll(e: React.UIEvent<HTMLDivElement>) {
        const pos = e.currentTarget ? e.currentTarget.scrollTop: 0;
        const distance = [];
        for (let h of Object.values(headers)) {
            if (h.current) {
                const hPos = h.current.offsetTop;
                distance.push(Math.abs(pos - hPos));
            }
        }
        const min = Math.min(...distance);
        const minIndex = distance.indexOf(min);
        const newTab = Object.keys(headers)[minIndex];

        if (tab !== newTab) {
            dispatch({ type: SET_TAB, tab: newTab });
        }
    }

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <BurgerIngredientsTabs tabChange={tabChange} />

            <div className={styles.list} onScroll={handleScroll}>
                {[BUN, SAUCE, MAIN].map((type, typeIndex) => (
                    <div key={typeIndex}>
                        <h2 className="text text_type_main-medium mt-8" ref={headers[type]}>{names[type]}</h2>
                        <ul className={styles['group-content']}>
                            {groups[type].map((item: TIngredient) => (
                                <BurgerIngredientsItem key={item._id} item={item} count={countData[item._id]} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BurgerIngredients;