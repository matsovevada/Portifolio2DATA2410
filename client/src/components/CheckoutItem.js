import React from 'react'

const CheckoutItem = ({item}) => {
    return (
        <> 
            <h4>{item.count}x {item.title}, Price: {item.price * item.count},-</h4>
        </>
    )
}

export default CheckoutItem
