import React, {useState} from "react";

import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.3,
    meat: 0.2
};

const BurgerBuilder = () => {

    const [state, setState] = useState({
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false
    });

    return (
        <Auxiliary>
            <Burger ingredients={state.ingredients}/>
        </Auxiliary>
    );
};

export default BurgerBuilder;