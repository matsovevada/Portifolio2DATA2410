import React from 'react'
import CartItems from './CartItems'

const Cart = ({cart}) => {
    return (
        <div>
            <h3>Hello, cart!</h3>
            <CartItems cart={cart}/>
        </div>
    )
}

export default Cart
