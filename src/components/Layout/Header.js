import React from "react";
import chicken from '../../assets/chicken.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>Asparagus</h1>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={chicken} alt='Asparagus!'/>
        </div>
    </React.Fragment>
};
export default Header;