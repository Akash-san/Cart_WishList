
import { shopActions } from '../Store/shop';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Style from './Shop.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { useEffect } from 'react';
import _ from 'lodash';
import emptyCart from '../assets/empty-shopping-cart.png';
const Cart = () => {
    const dispatch = useDispatch();
    const shoppingCart = [...useSelector((state) => state.shop.cart)];
    const totalPrice = shoppingCart.reduce((acc, item) => {
        return acc + +item.price;
    }, 0);

    const navigate = useNavigate();

    useEffect(() => {
        let emailId = localStorage.getItem('loggedin');
        if(_.isEmpty(emailId)) {
            navigate("/login");
            return;
        }
        let cart = localStorage.getItem(`${emailId}_cart`);
        cart = _.isEmpty(cart) ? [] : JSON.parse(cart);
        dispatch(shopActions.addToCart(cart));
    }, []);

    // R E M O V E
    const removeHandler = (ProductId) => {
        const productIndex = shoppingCart.findIndex(
            (item) => item.id == ProductId
        );
        shoppingCart.splice(productIndex, 1);
        dispatch(shopActions.removeFromCart(shoppingCart));
        let emailId = localStorage.getItem('loggedin');
        let cart = localStorage.getItem(`${emailId}_cart`);
        cart = _.isEmpty(cart) ? [] : JSON.parse(cart);
        _.remove(cart, (c) => _.get(c, "id") == ProductId);
        localStorage.setItem(`${emailId}_cart`, JSON.stringify(cart));
    };
    // R E M O V E   A L L
    const clearHandler = () => {
        let emailId = localStorage.getItem('loggedin');
        dispatch(shopActions.addToCart([]));
        localStorage.setItem(`${emailId}_cart`, JSON.stringify([]));
    };
    return (
        <section className="py-5">
            <div className="container">
                <div
                    className={`${Style['item-wrapper']} mx-auto d-flex justify-content-between align-items-center mb-3 rounded-3 shadow p-4`}
                >
                    <h6>Total Items : {shoppingCart.length}</h6>
                    <button className="btn btn-danger" onClick={clearHandler}>
                        Remove all
                    </button>
                </div>
                {shoppingCart.length === 0 && (
                    <div
                        className={`${Style['item-wrapper']} text-center mx-auto rounded-3 shadow p-4`}
                    >
                        <p className="fs-4">
                            You have not added any items yet !
                        </p>
                        <img
                            src={emptyCart}
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
                {shoppingCart.length > 0 &&
                    shoppingCart.map((item) => {
                        return (
                            <div
                                key={item.id}
                                id={item.id}
                                className={`${Style['item-wrapper']} ${Style['cart']} cart mx-auto p-4 rounded-4 mb-3 shadow d-flex flex-wrap flex-sm-nowrap justify-content-between align-items-start`}
                            >
                                <div
                                    className={`${Style['img-wrapper']} mb-sm-0 mb-4 px-2 mx-auto mx-sm-0 me-sm-4 text-center position-relative rounded-2 overflow-hidden`}
                                >
                                    <img
                                        className={`mx-auto`}
                                        src={item.image}
                                        alt={item.title}
                                    />
                                    {/* <span className="text-light fw-bold fs-6 position-absolute top-50 start-50 translate-middle">
                                        {item.rating.count > 0
                                            ? 'In Stock'
                                            : 'Out of Stock'}
                                    </span> */}
                                </div>
                                <div
                                    className={`${Style['details-wrapper']} d-flex justify-content-between mx-auto mx-sm-0`}
                                >
                                    <div>
                                        <h4 className="me-4 fs-5 mb-3">
                                            {item.title}
                                        </h4>
                                        <p className="text-info">
                                            {item.category}
                                        </p>
                                        <strong className="fs-5 text-secondary">
                                            EGP {item.price}
                                        </strong>
                                    </div>
                                    <div
                                        className="btn text-danger h-25 border-0 ms-auto"
                                        onClick={()=>removeHandler(item.id)}
                                    >
                                        <BsFillTrashFill className="fs-5" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                <div className="text-end fw-bold mt-3">
                    Total price : EGP {totalPrice.toFixed(2)}
                </div>
            </div>
        </section>
    );
};

export default Cart;