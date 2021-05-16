import React from 'react'
import Order from './Order'

const Orderhistory = ({orders}) => {
    //Passes all user orders to the order component
    return (
        <div>
            <h1 id="orderHistoryHeader">Orders</h1>
            { orders.length > 0 ? orders.map((order) => (
            <Order 
                order={order}
            />)
        ) : <h2 id="noOrders">You have no orders</h2>}
        </div>
    )
}

export default Orderhistory
