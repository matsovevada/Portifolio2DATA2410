import React from 'react'
import Order from './Order'

const Orderhistory = ({orders}) => {

    return (
        <div>
            <h3>1</h3>
            <h3>1</h3>
            <h3>1</h3>
            <h3>1</h3>
            <h3>1</h3>
            <h3>1</h3>
            {orders.map((order) => (
            <Order 
                order={order}
            />)
        )}
        </div>
    )
}

export default Orderhistory
