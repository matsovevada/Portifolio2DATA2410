import React from 'react'
import Order from './Order'

const Orderhistory = ({orders}) => {

    console.log("ORDERS")
    console.log(orders)

    function orderParser(){

        let out;

        orders.forEach(order => {

            <Order></Order>


            out += <h3>Order from  ${order.timestamp}</h3>
            for(let i = 0; i < order.movies.length; i++){
                out += <p>Item {i}: {order.movies[i].count}: {order.movies[i].title}, {order.movies[i].price * order.movies[i].count} NOK</p>
            }
        })
        
        return out
    }

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
