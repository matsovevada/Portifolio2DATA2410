import React from 'react'
import CartItem from './CartItem'

const Cart = ({cart}) => {

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
        </div>
    )
}

export default Cart
