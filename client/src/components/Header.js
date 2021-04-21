import React from 'react'
import * as RBS from 'react-bootstrap'



const Header = () => {
    return (
        <RBS.Navbar bg="light" expand="md">
            <RBS.Navbar.Brand href="">Webshop</RBS.Navbar.Brand>
            <RBS.Navbar.Toggle aria-controls="basic-navbar-nav" />
            <RBS.Navbar.Collapse id="basic-navbar-nav">
            <RBS.Nav className="mr-auto">
                <RBS.Nav.Link href="">Home</RBS.Nav.Link>
                <RBS.NavDropdown title="Products" id="basic-nav-dropdown">
                    <RBS.NavDropdown.Item href="">Food</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="">Tech</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="">Clothes</RBS.NavDropdown.Item>
                    <RBS.NavDropdown.Item href="">Furniture</RBS.NavDropdown.Item>
                </RBS.NavDropdown>
                <RBS.Nav.Link href="">Contact us</RBS.Nav.Link>
                </RBS.Nav>
                <RBS.Form inline>
                    <RBS.FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <RBS.Button variant="outline-success">Search</RBS.Button>
                </RBS.Form>
            </RBS.Navbar.Collapse>
        </RBS.Navbar>
    )
}

export default Header
