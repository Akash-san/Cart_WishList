
import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Navbar.module.css';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { BsFillCartFill, BsFillHeartFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { shopActions } from '../Store/shop';
import { authActions } from '../Store/auth';
import _ from 'lodash';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Navbar = () => {
    // ... (your existing code)
    const shoppingCart = [...useSelector((state) => state.shop.cart)];
    const shoppingWishlist = [...useSelector((state) => state.shop.wishlist)];
    const authStatus = useSelector((state) => state.auth.isLoggedin);
    const dispatch = useDispatch();

    const linkStyle = {
        marginRight: '10px',
    };
    // L O G O U T    H A N D L E R
    const logoutHandler = () => {
        dispatch(authActions.authStatus(false));
        localStorage.removeItem('loggedin');
        toast.success('Logged out successfully!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
        });
    };
    // C H E C K    A U T H
    // useEffect(() => {
    //     checkAuth();
    //     let wishlist = localStorage.getItem("wishlist");
    //     let cachedShoppingCart = localStorage.getItem("cart");
    //     cachedShoppingCart = _.isEmpty(cachedShoppingCart) ? [] : JSON.parse(cachedShoppingCart);
    //     wishlist = _.isEmpty(wishlist) ? [] : JSON.parse(wishlist);
    //     dispatch(shopActions.addToWishlist(wishlist));
    //     dispatch(shopActions.addToCart(cachedShoppingCart));
    // }, []);
    // const checkAuth = () => {
    //     const isLoggedIn = localStorage.getItem('loggedin');
    //     isLoggedIn
    //         ? dispatch(authActions.authStatus(true))
    //         : dispatch(authActions.authStatus(false));
    // };
    useEffect(() => {
        checkAuth();
        let emailId = localStorage.getItem('loggedin');
        let wishlist = localStorage.getItem(`${emailId}_wishlist`);
        let cachedShoppingCart = localStorage.getItem(`${emailId}_cart`);
        cachedShoppingCart = _.isEmpty(cachedShoppingCart) ? [] : JSON.parse(cachedShoppingCart);
        wishlist = _.isEmpty(wishlist) ? [] : JSON.parse(wishlist);
        dispatch(shopActions.addToWishlist(wishlist));
        dispatch(shopActions.addToCart(cachedShoppingCart));
    }, []);
    const checkAuth = () => {
        const isLoggedIn = localStorage.getItem('loggedin');
        isLoggedIn
            ? dispatch(authActions.authStatus(true))
            : dispatch(authActions.authStatus(false));
    };

    return (
        <BootstrapNavbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <div className="container d-flex justify-content-between align-items-center">
                <div className={`d-flex align-items-center ${Style['logo']}`}>
                    <BootstrapNavbar.Brand>
                        <Link to="/">SHOP</Link>
                    </BootstrapNavbar.Brand>
                </div>
                <div>
                    <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                    <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link as={Link} to="/shop" style={linkStyle}>Shop</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            {authStatus ? (
                                <>
                                    <Nav.Link as={Link} to="/cart" className="text-success ml-2" style={linkStyle}>
                                        <BsFillCartFill className="fs-4" />
                                        <span className="position-absolute text-center fw-bold text-light bg-dark rounded-circle">
                                            {shoppingCart.length}
                                        </span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/wishlist" className="text-danger ml-2" style={linkStyle}>
                                        <BsFillHeartFill className="fs-4" />
                                        <span className="position-absolute text-center fw-bold text-light bg-dark rounded-circle">
                                            {shoppingWishlist.length}
                                        </span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/" onClick={logoutHandler} className="ml-2" style={linkStyle}>
                                        Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login" style={linkStyle}>Login</Nav.Link>
                                    <Nav.Link as={Link} to="/signup" style={linkStyle}>Signup</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </BootstrapNavbar.Collapse>
                </div>
            </div>
        </BootstrapNavbar>
    );
};

export default Navbar;

