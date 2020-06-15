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
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: '',
                valid: true
            }
        },
        formIsValid: false,
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

    function checkValidity(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length <= rules.minLength
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength
        }

        return isValid;
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid
        }
        setState(prevState => ({...prevState, orderForm: updatedOrderForm, formIsValid: formIsValid}))
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
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button btnType="Success" clicked={orderHandler} disabled={!state.formIsValid}>ORDER</Button>
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
