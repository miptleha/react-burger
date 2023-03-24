import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "../../hooks/redux";
import { getData } from "../../services/selectors";
import { TIngredient, TOrder } from "../../utils/types";
import styles from './orders-list-item.module.css';

type TProp = {
  order: TOrder,
  isPerson?: boolean
};

const OrdersListItem: FC<TProp> = ({ order, isPerson }) => {
  const location = useLocation();
  const maxIngredients = 6;

  const { data: ingredients } = useSelector(getData);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) {
      return null;
    }

    let words = order.name.split(' ');
    if (words.length > 7) {
      words.length = 7;
      words[6] = "бургер";
    }
    const orderName = words.join(' ');


    const status = order.status === 'done'
      ? 'Выполнен'
      : order.status === 'created'
        ? 'Создан'
        : 'Готовится';

    const colorStatus = order.status === 'done' ? styles.status_done : styles.status_default;

    const orderIngredients = order.ingredients.reduce<Array<TIngredient>>(
      (acc, elemId) => {
        const ingredient = ingredients.find((elem) => elem._id === elemId);
        if (ingredient) {
          acc.push(ingredient);
        }
        return acc;
      }, []);

    const displayedItems = orderIngredients.slice(0, maxIngredients);

    const totalCost = orderIngredients.reduce((amount, elem) =>
      elem.price + amount, 0);


    return { orderName, status, colorStatus, displayedItems, totalCost };
  }, [order, ingredients])

  if (!orderInfo) {
    return null;
  }


  return (
    <Link className={`p-6 ${styles.order}`}
      to={`${location.pathname}/${order.number}`}
      state={{ location: location }}
    >
      <div className={`mb-6 ${styles.order_header}`}>
        <p className='text text_type_digits-default'>#{String(order.number).padStart(6, "0")}</p>
        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
      </div>

      <p className={`${isPerson ? "mb-2" : "mb-6"} ${styles.title_order} text text_type_main-medium`}>
        {orderInfo.orderName}
      </p>

      {isPerson &&
        <p className={`mb-6 ${orderInfo.colorStatus} text text_type_main-default`}>
          {orderInfo.status}
        </p>
      }

      <div className={styles.filling}>
        <div className={styles.images_selection}>
          {orderInfo.displayedItems.map((item, i) => {
            let right = -2 * 10;
            let countHide = order.ingredients.length - maxIngredients;
            return (
              <li
                key={i}
                style={{ marginRight: right }}
                className={styles.image_fill}>
                <img
                  style={{ opacity: maxIngredients === (i + 1) && countHide > 0 ? '0.6' : '1' }}
                  src={item.image_mobile}
                  alt={item.name}
                  className={styles.image_position} />
                {countHide > 0 && i === (maxIngredients - 1) &&
                  <span className={`${styles.count_hidden} text text_type_main-default`}>+{countHide}</span>
                }
              </li>
            )
          })}
        </div>
        <div className={styles.price}>
          <span className={`text text_type_digits-default`}>{orderInfo.totalCost}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}

export default OrdersListItem;