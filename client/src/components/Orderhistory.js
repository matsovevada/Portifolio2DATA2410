import React from 'react'

const Orderhistory = ({order}) => {
    function orderParser(order){
        let out = <h3>Order from {order.timestamp}</h3>
        for(let i = 0; i < order.movies.length; i++){
            out += <p>Item {i}: {order.movies[i].count}: {order.movies[i].title}, {order.movies[i].price * order.movies[i].count} NOK</p>
        }

        return out
    }

    

    return (
        <div>
            {orderParser(order)}
        </div>
    )
}

export default Orderhistory
