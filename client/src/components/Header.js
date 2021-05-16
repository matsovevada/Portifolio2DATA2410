import React from 'react'
import * as RBS from 'react-bootstrap'
import logo from '../pics/NewNewNideoVova.svg'
import NavbarCart from './NavbarCart'
import LogoutGoogle from './LogoutGoogle'


const Header = ({cart, search_movie, filter_movies, user, sort_movies}) => {

    //function to serach for movies when pressing ENTER after writing in the search bar
    const handleKeyPress = (event) => {
        if (event.charCode === 13 || event.key === 'Enter') {
            event.preventDefault();
            search_movie(document.getElementById('search_string').value)
        }   
    }

    //HTML for the Header
    return (
        <RBS.Navbar bg="light" expand="xl" fixed='top'>
            <a href='/'><img src={logo} alt='logo' id='headerLogo' href='/'></img></a>
            <RBS.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <RBS.Navbar.Collapse id="basic-navbar-nav">
            <RBS.Nav className="mr-auto">
                <RBS.Nav.Link href="/">Home</RBS.Nav.Link>
                <RBS.NavDropdown title="Genre" id="basic-nav-dropdown">
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Action")}>Action</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Comedy")}>Comedy</RBS.NavDropdown.Item> 
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Drama")}>Drama</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Fantasy")}>Fantasy</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Horror")}>Horror</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Mystery")}>Mystery</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Romance")}>Romance</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => filter_movies("Thriller")}>Thriller</RBS.NavDropdown.Item>
                </RBS.NavDropdown>
                <RBS.NavDropdown title="Sort by" id="basic-nav-dropdown">
                    <RBS.NavDropdown.Item onClick={() => sort_movies("price_asc/")}>Price: low &rarr; high</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => sort_movies("price_desc/")}>Price: high &rarr; low</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => sort_movies("title_asc/")}>Title: A &rarr; Z</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item onClick={() => sort_movies("title_desc/")}>Title: Z &rarr; A</RBS.NavDropdown.Item>
                </RBS.NavDropdown>
                
                <RBS.Nav.Link href="/about-us">About Us</RBS.Nav.Link>
                {(user != null && user.isAdmin) && <RBS.Nav.Link href="/formMovie">Add a movie</RBS.Nav.Link>}
                {(user != null && user.isAdmin === false) && <RBS.Nav.Link href="/orderhistory">Order</RBS.Nav.Link>}
                </RBS.Nav>
                <RBS.Form inline>
                    <RBS.FormControl type="text" id="search_string"  placeholder="Search for title" className="mr-sm-2" onKeyPress={handleKeyPress}/>
                    <RBS.Button variant="outline-danger" id='searchbar' onClick={() => search_movie(document.getElementById('search_string').value)}>Search</RBS.Button>
                </RBS.Form>
                
                {(user != null && user.isAdmin === false) && <RBS.Navbar.Brand href="/cart"><NavbarCart cart={cart}/></RBS.Navbar.Brand>}
                {user === null ? <RBS.Button variant="outline-danger" id='searchbar' type='submit' href='/login'>Login</RBS.Button> : <RBS.Button variant="outline-danger" id='searchbar' type='submit' href='/changeUserInfo'>{user.email}</RBS.Button>}
                {user != null && <LogoutGoogle/>}
            </RBS.Navbar.Collapse>
        </RBS.Navbar>
    )
}

export default Header
