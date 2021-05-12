import React from 'react'

const Order = ({order}) => {

    function getMovieInformation() {
        let information = "<table id='ordersTable'><tr><th>Title</th><th>Quantity</th><th>Price</th></tr>"
        order.movies.forEach(movie => {
            information += `<tr><td>${movie.title}</td><td>${movie.count}</td><td>${movie.price*movie.count},-</td></tr>`
        })
        information += '</table>'
        return {__html: information};
    }

    function getTotalPrice() {
        let totalPrice = 0;
        order.movies.forEach(movie => {
            totalPrice += (movie.price * movie.count);
        })
        return totalPrice;
    }

    return (
        <div className='orderHistoryViewBox'>
            <p id='orderTimestamp'>{order.timestamp}</p>
            <div dangerouslySetInnerHTML={getMovieInformation()} />
            <p id='orderTotalPrice'>Total price: {getTotalPrice()},-</p>
        </div>
    )
}

export default Order
