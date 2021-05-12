import React from 'react'
import Order from './Order'

const Orderhistory = ({orders}) => {

    return (
        <div>
            <h1 id="orderHistoryHeader">Orders</h1>
            {orders.map((order) => (
            <Order 
                order={order}
            />)
        )}
        </div>
    )
}

export default Orderhistory
