import { useMemo, FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/redux';
import { useParams } from 'react-router';
import { getData, getOrder } from '../../services/selectors';
import { getOrderAction } from '../../services/actions/get-order';

import styles from './order-info.module.css';
import { TIngredient, TIngredientQty } from '../../utils/types';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderAction(id));
  }, [dispatch, id]);

  const { order } = useSelector(getOrder);
  const { data: ingredients } = useSelector(getData);

  const orderData = useMemo(() => {
    if (order === null) {
      return null;
    }

    let orderIngredients: Array<TIngredientQty> = [];
    let group: Record<string, TIngredientQty> = {};
    for (let item of order.ingredients) {
      let ingredient = ingredients.find((elem: TIngredient) => elem._id === item);
      if (ingredient) {
        if (!group[item]) {
          group[item] = { ...ingredient, qty: 0 };
        }
        group[item].qty += 1;
      }
    }
    for (let item of order.ingredients) {
      if (group[item]) {
        orderIngredients.push(group[item]);
        delete group[item];
      }
    }
  
    const orderStatus = order.status === 'done'
          ? 'Выполнен'
          : order.status === 'created'
            ? 'Создан'
            : 'Готовится';
  
    const totalSum = orderIngredients.reduce((amount: number, elem: TIngredient) => elem.price + amount, 0);

    return { orderIngredients, orderStatus, totalSum }
  
  }, [order, ingredients]);

  return (
    <main className={styles.main_container}>
      {order && orderData &&
        <>
          <p className={`text text_type_digits-default mb-10 text-center`}>
            #{String(order.number).padStart(6, "0")}
          </p>
          <p className={`text text_type_main-medium mb-3`}>
            {order.name}
          </p>
          <p className={`text text_type_main-default ${styles.status_order}`}>
            {orderData.orderStatus}
          </p>
          <p className="text text_type_main-medium mb-2">
            {'Состав:'}
          </p>
          <section className={styles.container_order}>
            {orderData.orderIngredients.map((item, i: number) => {
              return (
                <li key={i} className="mt-4 mr-6">
                  <div className={styles.container_row}>
                    <div className={styles.image_name}>
                      <div className={styles.image_fill}>
                        <img src={item.image_mobile} alt={item.name} />
                      </div>
                      <p className={`text text_type_main-default ml-4 ${styles.name}`}>{item.name}</p>
                    </div>
                    <div className={styles.count_price}>
                      <span className="text text_type_digits-default mr-2">{`${item.qty} x ${item.price}`}</span>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </li>
              )
            })}
          </section>
          <section className={`text text_type_main-default mt-10 mb-6 ${styles.food_order}`}>
            <p className='text text_type_main-default text_color_inactive'>
              <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
            </p>

            <div className={styles.count_price}>
              <span className={`text text_type_digits-default mr-2`}>{orderData.totalSum}</span>
              <CurrencyIcon type="primary" />
            </div>
          </section>
        </>
      }
    </main>
  );
}

export default OrderInfo;