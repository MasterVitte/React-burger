import React, {useState} from "react";

import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {

    const [state, setState] = useState({
        showSideDrawer: false
    });

    function sideDrawerClosedHandler() {
        setState({showSideDrawer: false})
    }

    function sideDrawerToggleHandler() {
        setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }


    return (
        <Auxiliary>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer open={state.showSideDrawer}
                        closed={sideDrawerClosedHandler}
            />
            <main className={classes.Layout}>
                {props.children}
            </main>
        </Auxiliary>
    )

    };

export default Layout;