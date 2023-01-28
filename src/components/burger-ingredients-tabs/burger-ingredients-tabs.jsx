import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_TAB } from '../../services/actions/tab-info';
import { getTab } from '../../services/selectors';

import styles from './burger-ingredients-tabs.module.css';
import { BUN, SAUCE, MAIN, names } from '../../utils/dataNames';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsTabs({ tabChange }) {
    const tab = useSelector(getTab);
    const dispatch = useDispatch();

    function change(type) {
        dispatch({ type: SET_TAB, tab: type });
        tabChange(type);
    }

    return (
        <div className={`${styles.tabs} mb-2`}>
            <Tab value={BUN} active={tab === BUN} onClick={change}>{names[BUN]}</Tab>
            <Tab value={SAUCE} active={tab === SAUCE} onClick={change}>{names[SAUCE]}</Tab>
            <Tab value={MAIN} active={tab === MAIN} onClick={change}>{names[MAIN]}</Tab>
        </div>
    );
}

BurgerIngredientsTabs.propTypes = {
    tabChange: PropTypes.func.isRequired
};

export default BurgerIngredientsTabs;