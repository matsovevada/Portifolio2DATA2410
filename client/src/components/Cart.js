import React from 'react'
import CartItem from './CartItem'

const Cart = ({cart, updateCart, decreaseCount, checkout}) => {


    //console.log("CARTMAN!")
    //let cartman = JSON.parse(window.localStorage.getItem('cart'))
    //console.log(JSON.parse(localStorage.getItem('cart')))


    return (
        <div>
            {cart.map((item) => (
            <CartItem 
                item={item}
                updateCart={updateCart}
                decreaseCount={decreaseCount}
            />)
        )}
        <button onClick={() => checkout()}>Confirm order</button>
        </div>
    )
}

export default Cart
