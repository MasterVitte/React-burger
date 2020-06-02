import React, {useEffect, useState} from "react";

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.3,
    meat: 0.2
};

const BurgerBuilder = (props) => {

    const [state, setState] = useState({
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    });

    useEffect(() => {
        console.log(props);
        axios.get('https://react-newburger.firebaseio.com/ingredients.json')
            .then(response => {
                if (response) {
                    setState(prevState => ({...prevState, ingredients: response.data}) )
                } else {
                    setState(prevState => ({...prevState, error: true}) )
                }
            })
            .catch(error => {
                setState(prevState => ({...prevState, error: true}) )
            })
    }, [state.ingredients === null]);

    function updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        setState(prevState => ({...prevState, purchasable: sum > 0}));
    };

    let addIngredientHandler = (type) => {
        const oldCount = state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        setState(prevState => ({...prevState, totalPrice: newPrice, ingredients: updatedIngredients}));
        updatePurchaseState(updatedIngredients);
    };

    let removeIngredientHandler = (type) => {
        const oldCount = state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        setState({totalPrice: newPrice, ingredients: updatedIngredients});
        updatePurchaseState(updatedIngredients);
    };

    let purchaseHandler = () => {
        setState(prevState => ({...prevState, purchasing: true}));
    };

    let purchaseCancelHandler = () => {
        setState(prevState => ({...prevState, purchasing: false}));
    };

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }
        setState(prevState => ({...prevState, ingredients: ingredients}))
    }, []);

    let purchaseContinueHandler = () => {
        // // alert('You confirmed!');
        // setState(prevState => ({...prevState, loading: true}));
        // const order = {
        //     ingredients: state.ingredients,
        //     price: state.totalPrice,
        //     customer: {
        //         name: 'Artem Vitte',
        //         address: {
        //             street: 'Test',
        //             country: 'Test'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         setState(prevState => ({...prevState, loading: false, purchasing: false}));
        //     })
        //     .catch(error => {
        //         setState(prevState => ({...prevState, loading: false}));
        //     })
        const queryParams = [];
        for (let i in state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(state.ingredients[i]));
        }
        queryParams.push('price=' + state.totalPrice)
        const queryString = queryParams.join('&');
        props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    };

    const disabledInfo = {
        ...state.ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = state.error ? <p>Ingredients can`t be loaded</p> : <Spinner />;

    if (state.ingredients) {
        burger = (
            <Auxiliary>
                <Burger ingredients={state.ingredients}/>
                <BuildControls
                    ingredientAdded={addIngredientHandler}
                    ingredientRemoved={removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={state.purchasable}
                    price={state.totalPrice}
                    ordered={purchaseHandler}
                />
            </Auxiliary>
        );
        orderSummary = <OrderSummary
            ingredients={state.ingredients}
            price={state.totalPrice}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
        />
        if (state.loading) {
            orderSummary = <Spinner/>
        }
    }


    return (
        <Auxiliary>
            <Modal
                show={state.purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
};

export default withErrorHandler(BurgerBuilder, axios);