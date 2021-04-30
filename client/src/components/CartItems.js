import React from 'react'

const CartItems = ({cart}) => {
    return (
        <>
        {cart.map((item) => (
            <Movie 
                item={item}
            />)
        )}
        </>
    )
}

export default CartItems
