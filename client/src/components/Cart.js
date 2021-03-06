import React from 'react'
import CartItem from './CartItem'
import CheckoutPopup from './CheckoutPopup'

const Cart = ({cart, updateCart, decreaseCount, checkout}) => {

    //Gets total price of all items in the cart
    function getTotalPrice() {
        let totalPrice = 0;
        cart.map((item) => (totalPrice += (item.price * item.count)))
        return totalPrice;
    }


    return (
        <div>
            {/*Uses map to list the users cart to the screen*/}
            {cart.map((item) => (
            <CartItem 
                item={item}
                updateCart={updateCart}
                decreaseCount={decreaseCount}
            />)
            )}
            <div className='CartPopBtn'>
                {cart.length > 0 ? <CheckoutPopup checkout={checkout} cart={cart} totalPrice={getTotalPrice}/> : 
                <h1 className='EmptyCartTag'>Your cart is empty!</h1>}
            </div>
        </div>
    )
}

export default Cart
