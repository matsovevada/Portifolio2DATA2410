import React from 'react'
import Button from 'react-bootstrap/Button'

const NavbarCart = ({cart}) => {

    function getNumberOfCartItems() {

        let numberOfCartItems = 0;

        cart.forEach((item) => {
            numberOfCartItems += item.count;
        })

        return numberOfCartItems;
    }

    return (
        <div>
            <Button variant='outline-danger'>Cart ({getNumberOfCartItems()})</Button>
        </div>
    )
}

export default NavbarCart
