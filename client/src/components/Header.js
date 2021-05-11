import React from 'react'
import * as RBS from 'react-bootstrap'
import logo from '../pics/NewNewNideoVova.svg'
import NavbarCart from './NavbarCart'


const Header = ({cart, search_movie, filter_movies}) => {


    return (
        <RBS.Navbar bg="light" expand="lg" fixed='top'>
            <img src={logo} alt='logo' id='headerLogo'></img>
            <RBS.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <RBS.Navbar.Collapse id="basic-navbar-nav">
            <RBS.Nav className="mr-auto">
                <RBS.Nav.Link href="/">Home</RBS.Nav.Link>
                <RBS.NavDropdown title="Genre" id="basic-nav-dropdown">
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Horor")}>Action</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Horor")}>Comedy</RBS.NavDropdown.Item> 
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Horor")}>Drama</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Horor")}>Rom-Com</RBS.NavDropdown.Item>
                </RBS.NavDropdown>
                <RBS.Nav.Link href="/about-us">About Us</RBS.Nav.Link>
                <RBS.Nav.Link href="/formMovie">Add a movie</RBS.Nav.Link>
                <RBS.Nav.Link href="/test">Test</RBS.Nav.Link>
                </RBS.Nav>
                <RBS.Form inline>
                    <RBS.FormControl type="text" id="search_string"  placeholder="Search" className="mr-sm-2" />
                    <RBS.Button variant="outline-success" id='searchbar' onClick={() => search_movie(document.getElementById('search_string').value)}>Search</RBS.Button>
                </RBS.Form>
                <RBS.Navbar.Brand href="/cart"><NavbarCart cart={cart}/></RBS.Navbar.Brand>
                <RBS.Button variant="outline-success" id='searchbar' type='submit' href='/login'>Login</RBS.Button>
            </RBS.Navbar.Collapse>
        </RBS.Navbar>
    )
}

export default Header
