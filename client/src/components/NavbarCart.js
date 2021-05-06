import React from 'react'

const NavbarCart = ({cart}) => {

    console.log("TEST")
    console.log(cart)

    function getNumberOfCartItems() {

        let numberOfCartItems = 0;

        cart.forEach((item) => {
            numberOfCartItems += item.count;
        })

        return numberOfCartItems;
    }

    return (
        <div>
            <h3>Cart ({getNumberOfCartItems()})</h3>
        </div>
    )
}

export default NavbarCart
