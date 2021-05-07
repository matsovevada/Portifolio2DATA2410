import React from 'react'
import Button from 'react-bootstrap/Button'


// onClick={() => inc()
const CartItem = ({item, updateCart,decreaseCount}) => {
    return (
        <div style={{ margin: 100}}> 
            {console.log(item)}
            <h3>Count: {item.count}</h3>
            { item.img ? <img src={`data:image/png;base64,${item.img.data}`}/> : null} 
            <h3>Short description: {item.shortDescription}</h3>
            <h3>Movie: {item.title}</h3>
            <h3>Price: {item.price},-</h3>
            <Button variant='dark' onClick={() => updateCart(item)}>+</Button>
            <Button variant='dark' onClick={() => decreaseCount(item)}>-</Button>
        </div>
    )
}

export default CartItem
