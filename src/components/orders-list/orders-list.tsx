import { FC } from 'react';
import { TOrder, TOrdersList } from '../../utils/types';
import OrdersListItem from '../orders-list-item/orders-list-item';

type TProp = {
    data: TOrdersList,
    isPerson?: boolean
};

const OrdersList: FC<TProp> = ({ data, isPerson }) => {
    return (
        <div className="feed_orders mt-4">
            {data.orders && data.orders.map((elem: TOrder, index: number) =>
                <OrdersListItem key={index} order={elem} isPerson={isPerson} />
            )}
        </div>
    );
}

export default OrdersList;