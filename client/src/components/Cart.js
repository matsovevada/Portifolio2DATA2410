import React from 'react'
import CartItem from './CartItem'

const Cart = ({cart}) => {

    console.log("CART!")
    console.log(cart)

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
