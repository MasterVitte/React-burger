import React, {useState} from "react";
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

const ContactData = (props) => {

    const [state, setState] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    });

    function orderHandler(event) {
        event.preventDefault();
        setState(prevState => ({...prevState, loading: true}))
        const formData = {};
        for (let formElementIdentifier in state.orderForm) {
            formData[formElementIdentifier] = state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData
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

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        setState(prevState => ({...prevState, orderForm: updatedOrderForm}))
    }

    const formElementsArray = [];

    for (let key in state.orderForm) {
        formElementsArray.push({
            id: key,
            config: state.orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" clicked={orderHandler}>ORDER</Button>
        </form>
    );

    if (state.loading) {
        form = <Spinner/>
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

export default ContactData;
