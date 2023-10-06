
import { shopActions } from '../Store/shop';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillCartFill, BsFillTrashFill } from 'react-icons/bs';
import { Link,useNavigate } from 'react-router-dom';
import Style from './Shop.module.css';
import { useEffect } from 'react';
import _ from 'lodash';

import { v4 as uuidv4 } from 'uuid';
import emptyWishlist from '../assets/empty-wishlist.png';

const Wishlist = () => {
    const dispatch = useDispatch();
    const shoppingWishlist = [...useSelector((state) => state.shop.wishlist)];
    const shoppingCart = [...useSelector((state) => state.shop.cart)];

    let cachedShoppingCart = [];
    const navigate = useNavigate();
    useEffect(() => {
        let emailId = localStorage.getItem('loggedin');
        if(_.isEmpty(emailId)) {
            navigate("/login");
            return;
        }
        let wishlist = localStorage.getItem(`${emailId}_wishlist`);
        let cachedShoppingCart = localStorage.getItem(`${emailId}_cart`);
        cachedShoppingCart = _.isEmpty(cachedShoppingCart) ? [] : JSON.parse(cachedShoppingCart);
        wishlist = _.isEmpty(wishlist) ? [] : JSON.parse(wishlist);
        dispatch(shopActions.addToWishlist(wishlist));
        dispatch(shopActions.addToCart(cachedShoppingCart));
    }, []);

    // C A R T   H A N D L E R
    const addToCartHandler = (itemId) => {
        const product = shoppingWishlist.find((item) => item.id == itemId);
        if(cachedShoppingCart.some((item) => item.id === product.id)) {
            return
        }
        _.set(product, "uuid", uuidv4());
        shoppingCart.push(product);
        shoppingCart.push(...cachedShoppingCart);
        dispatch(shopActions.addToCart(shoppingCart));
        let emailId = localStorage.getItem('loggedin');
        let cart = localStorage.getItem(`${emailId}_cart`);
        cart = _.isEmpty(cart) ? [] : JSON.parse(cart);
        cart.push(product);
        localStorage.setItem(`${emailId}_cart`, JSON.stringify(cart));
    };
    // R E M O V E    H A N D L E R
    const removeHandler = (itemId) => {
        const productIndex = shoppingWishlist.findIndex(
            (item) => item.id == itemId
        );
        shoppingWishlist.splice(productIndex, 1);
        dispatch(shopActions.removeFromWishlist(shoppingWishlist));
        let emailId = localStorage.getItem('loggedin');
        let wishlist = localStorage.getItem(`${emailId}_wishlist`);
        wishlist = _.isEmpty(wishlist) ? [] : JSON.parse(wishlist);
        _.remove(wishlist, (c) => _.get(c, "id") == itemId);
        localStorage.setItem(`${emailId}_wishlist`, JSON.stringify(wishlist));
    };
    // R E M O V E   A L L    H A N D L E R
    const clearHandler = () => {
        dispatch(shopActions.addToWishlist([]));
        let emailId = localStorage.getItem('loggedin');
        localStorage.setItem(`${emailId}_wishlist`, JSON.stringify([]));
    };
    return (
        <section className="py-5">
            <div className="container">
                <div
                    className={`${Style['item-wrapper']} mx-auto d-flex justify-content-between align-items-center mb-3 rounded-3 shadow p-4`}
                >
                    <h6>Total Items : {shoppingWishlist.length}</h6>
                    <button className="btn btn-danger" onClick={clearHandler}>
                        Remove all
                    </button>
                </div>
                {shoppingWishlist.length === 0 && (
                    <div
                        className={`${Style['item-wrapper']} fs-3 text-center mx-auto rounded-3 shadow p-4`}
                    >
                        <p className="fs-4">
                            You have not added any items yet !
                        </p>
                        <img
                            src={emptyWishlist}
                            alt="empty cart"
                            className={`${Style['empty-img']} d-block mx-auto `}
                        />
                        <Link
                            to="/shop"
                            className="mt-3 btn btn-outline-dark px-4"
                        >
                            Explore
                        </Link>
                    </div>
                )}
                {shoppingWishlist.length > 0 &&
                    shoppingWishlist.map((item) => {
                        return (
                            <div
                                id={item.id}
                                key={item.id}
                                className={`${Style['item-wrapper']} wishlist mx-auto p-4 rounded-4 mb-3 shadow d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-start`}
                            >
                                <div
                                    className={`${Style['img-wrapper']} mb-sm-0 mb-4 px-2 mx-auto mx-sm-0 me-sm-4 text-center position-relative rounded-2 overflow-hidden`}
                                >
                                    <img
                                        className={`mx-auto`}
                                        src={item.image}
                                        alt={item.title}
                                    />
                                    <button
                                        className=" btn btn-light py-1 px-2  position-absolute top-50 start-50 translate-middle"
                                        onClick={()=>addToCartHandler(item.id)}
                                    >
                                        <BsFillCartFill className="fs-5" />
                                    </button>
                                </div>
                                <div
                                    className={`${Style['details-wrapper']} d-flex justify-content-between`}
                                >
                                    <div>
                                        <h4 className="me-4 fs-5 mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-info">
                                            {item.category}
                                        </p>
                                        <strong className="text-secondary fs-5">
                                            EGP {item.price}
                                        </strong>
                                    </div>
                                    <div
                                        className="btn text-danger h-25 border-0 ms-auto"
                                        onClick={() => removeHandler(item.id)}
                                    >
                                        <BsFillTrashFill className="fs-5" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
};

export default Wishlist;
