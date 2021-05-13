import React from 'react'

//Lists all the items in the cart on the checkoutpopup
const CheckoutItem = ({item}) => {
    return (
        <> 
            <h4>{item.count}x {item.title}, Price: {item.price * item.count},-</h4>
        </>
    )
}

export default CheckoutItem
