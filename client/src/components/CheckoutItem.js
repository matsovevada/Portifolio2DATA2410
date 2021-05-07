import React from 'react'

const CheckoutItem = ({item}) => {
    return (
        <> 
            <h3>{item.title}, Qty: {item.count}, Price: {item.price * item.count},-</h3>
        </>
    )
}

export default CheckoutItem
