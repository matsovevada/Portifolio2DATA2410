import React from 'react'
import CartItem from './CartItem'

const Cart = ({cart, checkout}) => {

    let cartman = localStorage.getItem('cart')

    console.log("CARTMAN!")
    console.log(cartman)

    return (
        <div>
            {cart.map((item) => (
            <CartItem 
                item={item}
            />)
        )}
        <button onClick={() => checkout()}>Confirm order</button>
        </div>
    )
}

export default Cart
