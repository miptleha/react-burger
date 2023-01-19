import { useEffect, useState, useReducer } from 'react';
import { dataLoad } from '../../utils/dataLoad';
import { sumReducer, sumInitialValue } from '../../services/sum-reducer';
import { OrderContext } from '../../services/order-context';

import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const MESSAGE_LOADING = "Подождите, идет загрузка...";
const MESSAGE_ERROR = "Возникла ошибка при получении данных";

function App() {

    const [state, setState] = useState({ data: null, isLoading: true, isError: false });

    useEffect(() => {
        dataLoad()
            .then(data => {
                setState({ data: data, isLoading: false, isError: false });
            })
            .catch(err => {
                console.log('ошибка получения данных', err);
                setState({ data: null, isLoading: false, isError: true });
            });
    }, []);

    const [bun, setBun] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [sumState, sumDispatcher] = useReducer(sumReducer, sumInitialValue);

    return (
        <>
            {(state.isLoading || state.isError) ? (
                <main className={styles.wait}>
                    <p className="text text_type_main-large">
                        {state.isLoading ? MESSAGE_LOADING : state.isError ? MESSAGE_ERROR : undefined}
                    </p>
                </main>
            ) :
                state.data && (
                    <>
                        <AppHeader />
                        <main className={styles.main}>
                            <div className={styles.inner}>
                                <OrderContext.Provider value={{bun, setBun, 
                                    ingredients, setIngredients, sumState, sumDispatcher}}>
                                    <BurgerIngredients data={state.data} />
                                    <BurgerConstructor data={state.data} />
                                </OrderContext.Provider>
                            </div>
                        </main>
                    </>
                )}
        </>
    );
}

export default App;