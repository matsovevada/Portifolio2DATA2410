import React from 'react'
import * as RBS from 'react-bootstrap'
import logo from '../pics/NewNewNideoVova.svg'
import NavbarCart from './NavbarCart'
import LogoutGoogle from './LogoutGoogle'


const Header = ({cart, user}) => {

    //HTML for the Header
    return (
        <RBS.Navbar bg="light" expand="xl" fixed='top'>
            <a href='/'><img src={logo} alt='logo' id='headerLogo' href='/'></img></a>
            <RBS.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <RBS.Navbar.Collapse id="basic-navbar-nav">
            <RBS.Nav className="mr-auto">
                <RBS.Nav.Link href="/">Home</RBS.Nav.Link>
                <RBS.Nav.Link href="/about-us">About Us</RBS.Nav.Link>
                {(user != null && user.isAdmin) && <RBS.Nav.Link href="/formMovie">Add a movie</RBS.Nav.Link>}
                {(user != null && user.isAdmin === false) && <RBS.Nav.Link href="/orderhistory">Orders</RBS.Nav.Link>}
                </RBS.Nav>
                {(user != null && user.isAdmin === false) && <RBS.Navbar.Brand href="/cart"><NavbarCart cart={cart}/></RBS.Navbar.Brand>}
                {user === null ? <RBS.Button variant="outline-danger" id='searchbar' type='submit' href='/login'>Login</RBS.Button> : <RBS.Button variant="outline-danger" id='searchbar' type='submit' href='/changeUserInfo'>{user.email}</RBS.Button>}
                {user != null && <LogoutGoogle/>}
            </RBS.Navbar.Collapse>
        </RBS.Navbar>
    )
}

export default Header
