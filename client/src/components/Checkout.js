import React from 'react'

const Checkout = ({cart, checkout}) => {
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

export default Checkout
