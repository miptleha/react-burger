import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadIngredientsAction } from '../../services/actions/load-ingredients';
import { getData } from '../../services/selectors';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const MESSAGE_LOADING = "Подождите, идет загрузка...";
const MESSAGE_ERROR = "Возникла ошибка при получении данных";

function App() {
    const { data, dataLoading, dataHasErrors } = useSelector(getData);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredientsAction());
    }, [dispatch]);

    return (
        <>
            {(dataLoading || dataHasErrors) ? (
                <main className={styles["wait-container"]}>
                    <p className="text text_type_main-large">
                        {dataLoading ? MESSAGE_LOADING : dataHasErrors ? MESSAGE_ERROR : undefined}
                    </p>
                </main>
            ) : data && data.length > 0 ? (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <div className={styles.inner}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </div>
                    </main>
                </>)
                :
                undefined
            }
        </>
    );
}

export default App;