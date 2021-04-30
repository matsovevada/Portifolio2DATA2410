import React from 'react'
import Cart from './Cart'

const CartItems = ({cart}) => {
    return (
        <>
        {cart.map((item) => (
            <Cart 
                item={item}
            />)
        )}
        </>
    )
}

export default CartItems
