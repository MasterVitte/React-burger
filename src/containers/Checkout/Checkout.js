// import React, {useEffect, useState, useRef} from "react";
// import { Route } from 'react-router-dom';
// import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
// import ContactData from "./ContactData/ContactData";
// const Checkout = (props) => {
//
//     const [state, setState] = useState({
//         ingredients: {},
//         totalPrice: 0
//     });
//
//     const val = React.useRef();
//
//     useEffect(() => {
//
//         val.current = props;
//         const query = new URLSearchParams(val.current.location.search);
//         const ingredients = {};
//         let price = 0;
//         for (let param of query.entries()) {
//             if (param[0] === 'price') {
//                 price = param[1];
//             } else {
//                 ingredients[param[0]] = +param[1]
//             }
//         }
//         setState(prevState => ({...prevState, ingredients: ingredients, totalPrice: price }) )
//
//     }, [props]);
//
//     useEffect(() => {
//
//         const query = new URLSearchParams(val.current.location.search);
//         const ingredients = {};
//         let price = 0;
//         for (let param of query.entries()) {
//             if (param[0] === 'price') {
//                 price = param[1];
//             } else {
//                 ingredients[param[0]] = +param[1]
//             }
//         }
//         setState(prevState => ({...prevState, ingredients: ingredients, totalPrice: price }) )
//
//     }, []);
//
//     function onCheckoutCancelled() {
//         props.history.goBack();
//     }
//
//     function onCheckoutContinued() {
//         props.history.replace('/checkout/contact-data');
//         console.log(val.current.location.search)
//     }
//
//     return (
//         <div>
//             <CheckoutSummary
//                 ingredients={state.ingredients}
//                 onCheckoutCancelled={onCheckoutCancelled}
//                 onCheckoutContinued={onCheckoutContinued}
//             />
//             <Route path={props.match.path + '/contact-data'}
//                    render={() => (<ContactData ingredients={state.ingredients} price={state.totalPrice} />)} />
//         </div>
//     );
// };
//
// export default Checkout;
//
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState(prevState => ({...prevState, ingredients: ingredients, totalPrice: price}) );
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'}
                       render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>
        );
    }
}

export default Checkout;