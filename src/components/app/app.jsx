import { useEffect, useState } from 'react';
import styles from './app.module.css';
//import { data } from '../../utils/data';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const DOMAIN = "https://norma.nomoreparties.space";
const API = "/api/ingredients";

function App() {

    const [state, setState] = useState({ data: null, isLoading: true, isError: false });

    useEffect(() => {
        fetch(`${DOMAIN}${API}`)
            .then(res => {
                if (res.status !== 200) {
                    throw Error(`Неверный html-статус ответа: ${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
            .then(res => {
                if (!res.success) {
                    throw Error('В json-ответе success !== true');
                }
                setState({ data: res.data, isLoading: false, isError: false });
            })
            .catch(err => {
                console.log(err);
                setState({ data: null, isLoading: false, isError: true });
            });
    }, [])

    let waitMessage = null;
    if (state.isLoading) {
        waitMessage = "Подождите, идет загрузка...";
    }
    else if (state.isError) {
        waitMessage = "Возникла ошибка при получении данных";
    }

    return (
        <>
            {waitMessage && <main className={styles.wait}><p className="text text_type_main-large">{waitMessage}</p></main>}
            {!state.waitMessage && state.data && (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <div className={styles.inner}>
                            <BurgerIngredients data={state.data} />
                            <BurgerConstructor data={state.data} />
                        </div>
                    </main>
                </>
            )}
        </>
    );
}

export default App;