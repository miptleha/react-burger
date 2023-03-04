import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadIngredientsAction } from '../../services/actions/load-ingredients';
import { getData } from '../../services/selectors';
import { MESSAGE_ERROR } from '../../utils/message';

import styles from './main.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import Loader from '../../components/loader/loader';

function MainPage() {

    const { data, dataLoading, dataHasErrors } = useSelector(getData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredientsAction() as any);
    }, [dispatch]);


    return (
        (dataLoading || dataHasErrors || !data || data.length === 0) ? (
            <main className={styles["wait-container"]}>
                {dataLoading ? (<Loader />) : dataHasErrors ? (<p className="text text_type_main-medium">{MESSAGE_ERROR}</p>) : undefined}
            </main>
        ) : (
            <>
                <main className={styles.main}>
                    <div className={styles.inner}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </div>
                </main>
            </>
        )
    );
}

export default MainPage;