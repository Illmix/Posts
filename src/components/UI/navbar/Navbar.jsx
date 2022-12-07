import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import classes from './Navbar.module.css'
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
const Navbar = () => {
    const {setIsAuth} = useContext(AuthContext)
    const logout = (e) => {
        e.preventDefault();
        setIsAuth(false);
        localStorage.removeItem('auth');
    }
    return (
        <div className={classes.navbar}>
            <div className={classes.navbar__links}>
                <MyButton onClick={logout}>
                    Logout
                </MyButton>
                <Link to="/about">
                    About us
                </Link>
                <Link to="posts">
                    Posts
                </Link>
            </div>
        </div>
    );
};

export default Navbar;