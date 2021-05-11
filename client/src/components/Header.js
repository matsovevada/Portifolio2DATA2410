import React from 'react'
import * as RBS from 'react-bootstrap'
import logo from '../pics/NewNewNideoVova.svg'
import NavbarCart from './NavbarCart'
import LogoutGoogle from './LogoutGoogle'


const Header = ({cart, user}) => {
    return (
        <RBS.Navbar bg="light" expand="lg" fixed='top'>
            <img src={logo} alt='logo' id='headerLogo'></img>
            <RBS.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <RBS.Navbar.Collapse id="basic-navbar-nav">
            <RBS.Nav className="mr-auto">
                <RBS.Nav.Link href="/">Home</RBS.Nav.Link>
                <RBS.NavDropdown title="Genre" id="basic-nav-dropdown">
                    <RBS.NavDropdown.Item href="/food">Action</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/tech">Comedy</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/clothes">Drama</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="/furniture">Rom-Com</RBS.NavDropdown.Item>
                </RBS.NavDropdown>
                <RBS.Nav.Link href="/about-us">About Us</RBS.Nav.Link>
                {(user != null && user.isAdmin) && <RBS.Nav.Link href="/formMovie">Add a movie</RBS.Nav.Link>}
                <RBS.Nav.Link href="/test">Test</RBS.Nav.Link>
                </RBS.Nav>
                <RBS.Form inline>
                    <RBS.FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <RBS.Button variant="outline-success" id='searchbar'>Search</RBS.Button>
                </RBS.Form>
                {user != null && <RBS.Navbar.Brand href="/cart"><NavbarCart cart={cart}/></RBS.Navbar.Brand>}
                {user == null ? <RBS.Button variant="outline-success" id='searchbar' type='submit' href='/login'>Login</RBS.Button> : <RBS.Button variant="outline-success" id='searchbar' type='submit' href='/changeUserInfo'>{user.email}</RBS.Button>}
                {user != null && <LogoutGoogle/>}
            </RBS.Navbar.Collapse>
        </RBS.Navbar>
    )
}

export default Header
