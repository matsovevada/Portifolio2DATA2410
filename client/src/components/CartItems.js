import React from 'react'
import Cart from './Cart'

const CartItems = ({cart}) => {
    return (
        <div>
        {cart.map((item) => (
            <Cart 
                item={item}
            />)
        )}
        </div>
    )
}

export default CartItems
