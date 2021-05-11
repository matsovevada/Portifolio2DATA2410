import React from 'react'
import Button from 'react-bootstrap/Button'
import DefaultPicture from '../pics/default-movie-image.png'

const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

const CartItem = ({item, updateCart,decreaseCount}) => {
    return (
        <div style={{ margin: 100}}> 
            <h3>Count: {item.count}</h3>
            { item.img ? <img src={`data:image/png;base64,${arrayBufferToBase64(item.img.data.data)}`}/> : <img src={DefaultPicture} />} 
            <h3>Short description: {item.shortDescription}</h3>
            <h3>Movie: {item.title}</h3>
            <h3>Price: {item.price},-</h3>
            <Button variant='dark' onClick={() => updateCart(item)}>+</Button>
            <Button variant='dark' onClick={() => decreaseCount(item)}>-</Button>
        </div>
    )
}

export default CartItem
