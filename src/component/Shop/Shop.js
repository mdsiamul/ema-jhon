import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb, getStoredCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);

    useEffect(() => {
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayProducts(data);
            })
    }, [])
    useEffect(() => {
        const savedCart = getStoredCart();
        const storedCart = [];
        for (const name in savedCart) {
            const addedProduct = products.find(product => product.name === name);
            storedCart.push(addedProduct);
        }
        setCart(storedCart);
    }, [products])

    const handelAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }
    const handelSearch = event => {
        const searchResult = event.target.value;
        const marchedProducts = products.filter(product => product.name.toLowerCase().includes(searchResult.toLowerCase()));
        setDisplayProducts(marchedProducts);
    }
    return (
        <>
            <div className="search-container">
                <input type="text" placeholder='Search Product' onChange={handelSearch} />
            </div>
            <div className='shop-container'>
                <div className="product-container">

                    {displayProducts.map(product => <Product
                        key={product.id}
                        product={product}
                        handelAddToCart={handelAddToCart}>

                    </Product>)}
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                    ></Cart>
                </div>

            </div></>
    );
};

export default Shop;