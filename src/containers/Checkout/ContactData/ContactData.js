import React, {useState} from "react";
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

const ContactData = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        address: {
            street: ''
        },
        loading: false
    });

    function orderHandler (event) {
        event.preventDefault();
        setState(prevState => ({...prevState, loading: true}))
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer: {
                name: 'Artem Vitte',
                address: {
                    street: 'Test street'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(response => {
                setState(prevState => ({...prevState, loading: false}));
                props.history.push('/')
            })
            .catch(error => {
                setState(prevState => ({...prevState, loading: false}));
            })
    }

    let form = (
        <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Your street"/>
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );

    if (state.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

export default ContactData;