import React from 'react'

const CheckoutItem = ({item}) => {
    return (
        <> 
            <h3>{item.count}x {item.title}, Price: {item.price * item.count},-</h3>
        </>
    )
}

export default CheckoutItem
