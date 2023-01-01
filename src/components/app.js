import React from 'react';
import AppHeader from './app-header/app-header';
import BurgerConstructor from './burger-constructor/burger-constructor';
import BurgerIngredients from './burger-ingredients/burger-ingredients';

class App extends React.Component {
    render() {
        return (
            <>
                <AppHeader/>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </>
        );
    }
}

export default App;