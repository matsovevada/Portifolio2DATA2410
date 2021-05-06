import React from 'react'
import CartItem from './CartItem'

const Cart = ({cart}) => {


    console.log("CARTMAN!")
    let cartman = JSON.parse(window.localStorage.getItem('cart'))
    console.log(cartman)
    console.log(JSON.parse(localStorage.getItem('cart')))
    console.log(cart)

    return (
        <div>
            {cartman.map((item) => (
            <CartItem 
                item={item}
            />)
        )}
        </div>
    )
}

export default Cart
