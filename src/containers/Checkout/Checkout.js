import React, {useState} from "react";

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout = () => {


    const [state, setState] = useState({
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    });

    return (
        <div>
            <CheckoutSummary ingredients={state.ingredients} />
        </div>
    );
};

export default Checkout;