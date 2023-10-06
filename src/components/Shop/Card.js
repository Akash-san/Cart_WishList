
import Style from './Shop.module.css';
import { shopActions } from '../Store/shop';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillCartFill, BsFillHeartFill } from 'react-icons/bs';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { authActions } from '../Store/auth';
const Card = (props) => {
    const product = props.product;
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.isLoggedin);
    // C A R T   H A N D L E R
    const shoppingCart = [...useSelector((state) => state.shop.cart)];

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

    const addToCartHandler = () => {
        if (!auth) {
            dispatch(authActions.showAlert(true));
            return;
        }
        if(shoppingCart.some((item) => item.id === product.id)) {
            return;
        }
        _.set(product, "uuid", uuidv4());
        shoppingCart.push(product);
        let emailId = localStorage.getItem('loggedin');
        dispatch(shopActions.addToCart(shoppingCart));
        let cart = localStorage.getItem(`${emailId}_cart`);
        cart = _.isEmpty(cart) ? [] : JSON.parse(cart);
        cart.push(product);
        localStorage.setItem(`${emailId}_cart`, JSON.stringify(cart));
    };
    // W I S H L I S T   H A N D L E R
    const shoppingWishlist = [...useSelector((state) => state.shop.wishlist)];
    const addToWishlistHandler = () => {
        if (!auth) {
            dispatch(authActions.showAlert(true));
            return;
        }
        if(shoppingWishlist.some((item) => item.id === product.id)) {
            return;
        }
        _.set(product, "uuid", uuidv4());
        shoppingWishlist.push(product);
        dispatch(shopActions.addToWishlist(shoppingWishlist));
        let emailId = localStorage.getItem('loggedin');
        let wishlist = localStorage.getItem(`${emailId}_wishlist`);
        wishlist = _.isEmpty(wishlist) ? [] : JSON.parse(wishlist);
        wishlist.push(product);
        localStorage.setItem(`${emailId}_wishlist`, JSON.stringify(wishlist));
    };
    return (
        <div
            id={product.id}
            className={`col-lg-3 col-10 col-sm-5 my-3 p-4 mx-md-1 rounded-4 shadow ${Style['card-style']}`}
        >
            <div
                className={`${Style['img-wrapper-shop']} mb-3 position-relative rounded-3 overflow-hidden`}
            >
                <img
                    src={product.image}
                    className="card-img-top mb-3"
                    alt={product.title}
                />
            </div>
          
                <div className="card-body">
                    <p className="text-start text-danger fs-6">
                        {product.category}
                    </p>
                    <h5
                        title={product.title}
                        className="card-title mb-3 text-start text-dark"
                    >
                        {product.title}
                    </h5>
                    <p className="card-text d-flex justify-content-between align-items-center">
                        <strong className="text-dark">
                            EGP {product.price}
                        </strong>
                        <span className="text-muted">
                            Rating :{' '}
                            <span className="text-warning fw-bold">
                                {product.rating.rate}
                            </span>
                        </span>
                    </p>
                   
                    <div className="d-flex justify-content-center">
        <Button
            variant="outline-secondary"
            title="add to cart"
            className="btn btn-light me-2 py-1 px-2"
            onClick={addToCartHandler}
        >
            <BsFillCartFill className="fs-5" />addToCart
        </Button>
        <Button
            variant="outline-secondary"
            title="add to wishlist"
            className="btn btn-light py-1 px-2"
            onClick={() => addToWishlistHandler(product.id)}
        >
            <BsFillHeartFill className="fs-5" />addToWishlist
        </Button>
    </div>
                </div>
           
        </div>
    );
};

export default Card;
