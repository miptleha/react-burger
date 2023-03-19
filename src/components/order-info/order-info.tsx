import { useMemo, FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { useParams } from 'react-router';
import { getData, getOrder } from '../../services/selectors';
import { getOrderAction } from '../../services/actions/get-order';

import styles from './order-info.module.css';
import { TIngredient } from '../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type TProps = {
  item?: TIngredient;
}

const OrderInfo: FC<TProps> = ({ item }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderAction(id));
  }, [dispatch, id]);

  const { order } = useSelector(getOrder);
  const { data: ingredients } = useSelector(getData);

  const orderIngredients = useMemo(
    () => {
      if (order === null) {
        return null;
      }
      return order!.ingredients.map((elemId: string) => {
        return ingredients.find((elem: TIngredient) => elem._id === elemId)
      })
    }, [ingredients, order]
  );

  const orderAmount = useMemo(
    () => {
      if (orderIngredients === null) {
        return null;
      }
      return orderIngredients!.reduce((amount: number, elem: TIngredient | undefined) => elem!.price + amount, 0)
    }, [orderIngredients]
  );

  const orderStatus = useMemo(
    () => {
      if (order === null) {
        return null;
      }
      return order!.status === 'done'
        ? 'Выполнен'
        : order!.status === 'created'
          ? 'Создан'
          : 'Готовится'
    }, [order]
  );

  return (
    <main className={styles.main_container}>
      {order &&
        <>
          <p className={`text text_type_digits-default mb-10 ${styles.number_order}`}>
            #{order!.number}
          </p>
          <p className={`text text_type_main-medium mb-3`}>
            {order!.name}
          </p>
          <p className={`text text_type_main-default mb-10 ${styles.status_order}`}>
            {orderStatus}
          </p>
          <p className="text text_type_main-medium mb-2">
            {'Состав:'}
          </p>
          <section className={styles.fill_order}>
            {orderIngredients && orderIngredients.map((item: TIngredient | undefined, i: number) => {
              return (
                <li key={i} className="mt-4 mr-6">
                  <div className={styles.row_fill}>
                    <div className={styles.image_name}>
                      <div className={styles.image_fill}>
                        <img src={item!.image_mobile} alt={item!.name} />
                      </div>
                      <p className={`text text_type_main-default ml-4 ${styles.pname}`}>{item!.name}</p>
                    </div>
                    <div className={styles.count_price}>
                      <span className="text text_type_digits-default mr-2">{`1 x ${item!.price}`}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              )
            })}
          </section>
          <section className={`text text_type_main-default mt-10 mb-6 ${styles.food_order}`}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order!.createdAt)} className='text text_type_main-default text_color_inactive' />
            </p>

            <div className={styles.count_price}>
              <span className={`text text_type_digits-default mr-2`}>{orderAmount}</span>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </>
      }
    </main>
  );
}

export default OrderInfo;