import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from './food.jpg';
import classes from './Header.module.css';

const  Header= props =>{
return(
    <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
           <HeaderCartButton />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="a table full of delicious meal" />
        </div>
    </React.Fragment>
);
};

export default Header;