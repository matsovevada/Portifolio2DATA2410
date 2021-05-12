import React from 'react'
import CartItem from './CartItem'
import CheckoutPopup from './CheckoutPopup'

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
            <div className='CartPopBtn'>
                {cart.length > 0 ? <CheckoutPopup checkout={checkout} cart={cart} updateCart={updateCart} decreaseCount={decreaseCount}/> : 
                <h1 className='EmptyCartTag'>Your cart is empty!</h1>}
            </div>
        </div>
    )
}

export default Cart
