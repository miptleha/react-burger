import AppHeader from './app-header/app-header';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import styles from './app.module.css';

function App() {
        return (
            <>
                <AppHeader/>
                <main className={styles.main}>
                    <div className={styles.inner}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </div>
                </main>
            </>
        );
}

export default App;