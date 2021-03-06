import React from 'react'
import Button from 'react-bootstrap/Button'
import DefaultPicture from '../pics/default-movie-image.png'

//Converts from the objects buffered array representasion of the image to a Base64 string
//Credit: https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

//Controlls how each item in the carts looks
const CartItem = ({item, updateCart,decreaseCount}) => {
    return (
        <div className='CartItem'>
            <div>
                { item.img ? <img alt='Movie img' src={`data:image/png;base64,${arrayBufferToBase64(item.img.data.data)}`} className='CartImg'/> : <img alt='Movie img' src={DefaultPicture} />}
            </div>
            <div className='CartInfo'>
                <h3 className='CartTitle'>{item.title}</h3>
                <h3 className='CartDesc'>Short description: {item.shortDescription}</h3>
                <h3 className='CartPrice'>Price: {item.price},-</h3>
                <div className='CartCounter'>
                    <Button variant='dark' onClick={() => updateCart(item)}>+</Button>
                    <p className='CartCount'>Qty: {item.count}</p>
                    <Button variant='dark' onClick={() => decreaseCount(item)}>-</Button>
                </div>
            </div>
        </div>
    )
}

export default CartItem
