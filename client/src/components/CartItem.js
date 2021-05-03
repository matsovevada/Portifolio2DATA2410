import React from 'react'
import * as RBS from 'react-bootstrap'


// onClick={() => inc()
const CartItem = ({item}) => {
    return (
        <div style={{ margin: 100}}> 
            {console.log(item)}
            <h3>Count: {item.count}</h3>
            { item.img ? <img src={`data:image/png;base64,${item.img.data}`}/> : null} 
            <h3>Short description: {item.shortDescription}</h3>
            <h3>Movie: {item.title}</h3>
            <h3>Price: {item.price},-</h3>
            <RBS.Button variant='dark'>+</RBS.Button>
            <RBS.Button variant='dark'>-</RBS.Button>
        </div>
    )
}

export default CartItem
