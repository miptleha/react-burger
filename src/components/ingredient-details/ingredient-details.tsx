import { useMemo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getData } from '../../services/selectors';
import { loadIngredientsAction } from '../../services/actions/load-ingredients';
import { MESSAGE_ERROR, MESSAGE_LOADING } from '../../utils/message';

import styles from './ingredient-details.module.css';
import { TIngredient } from '../../utils/types';

type TProps = {
    item?: TIngredient;
}

const IngredientDetails: FC<TProps> = ({ item }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const { data, dataLoading, dataHasErrors } = useSelector(getData);
    let item1 = useMemo(() => {
        if (item) {
            return item;
        } else if (params.id && data && data.length > 0) {
            return data.find((i: TIngredient) => i._id === params.id);
        }
        return null;
    }, [item, params.id, data]);
    
    if (!item1 && !dataLoading && !dataHasErrors && params && params.id) {
        dispatch(loadIngredientsAction() as any);
    }

    return item1 ? (
        <>
            <img className={`${styles.image} mb-4`} src={item1.image_large} alt="Изображение ингридиента" />
            <p className={`${styles.name} text-center text text_type_main-medium mb-8`}>{item1.name}</p>
            <div className={`${styles.detail} mb-15`}>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item1.calories}</div>
                </div>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Белки, г</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item1.proteins}</div>
                </div>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Жиры, г</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item1.fat}</div>
                </div>
                <div className={styles['detail-item']}>
                    <div className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</div>
                    <div className="text-center text text_type_digits-default text_color_inactive">{item1.carbohydrates}</div>
                </div>
            </div>
        </>
    ) : (
    <p className="text text_type_main-medium">
        {dataLoading ? MESSAGE_LOADING : dataHasErrors ? MESSAGE_ERROR : undefined}
    </p>
    );
}

export default IngredientDetails;