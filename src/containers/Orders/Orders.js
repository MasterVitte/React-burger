import React, {useEffect, useState} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = () => {

    const [state, setState] = useState({
        orders: [],
        loading: true
    });

    useEffect(() => {
        axios.get('orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                setState(prevState => ({...prevState, loading: false, orders: fetchedOrders}))
            })
            .catch(err => {
                setState(prevState => ({...prevState, loading: false}))
            })
    }, [state.orders === null]);

    return (
        <div>
            {state.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ))}
        </div>
    );
};

export default withErrorHandler(Orders, axios);
