

import Card from './Card';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { shopActions } from '../Store/shop';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
        getProducts();
    }, []);
    const getProducts = () => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((json) => {
                setProducts(json);
            });
    };
    if (products.length === 0) return <Spinner />;

    return (
        <section className="py-5">
            {products.length > 0 && (
                <div className="container text-center fs-3">
                    <div className="row justify-content-evenly">
                        {products.map((product) => {
                            return <Card key={product.id} product={product} />;
                        })}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Shop;