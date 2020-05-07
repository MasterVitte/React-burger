import React from "react";

import classes from './BuildControls.css'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>0</strong></p>
        {controls.map(ctrl => (
            <div>controls</div>
        ))}
        <button
            className={classes.OrderButton}
        >
            ORDER NOW
        </button>
    </div>
);

export default buildControls;