import React from 'react'

const Order = ({order}) => {

    function getMovieInformation() {
        let information = ""
        order.movies.forEach(movie => {
            information += `Count: ${movie.count}, Title: ${movie.title}, total price: ${movie.price*movie.count}`
        })
        return information;
    }

    return (
        <div>
            <h3>Order from  {order.timestamp}</h3>
            {getMovieInformation()}
        </div>
    )
}

export default Order
