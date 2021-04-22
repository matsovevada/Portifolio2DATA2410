import React from 'react'
import * as RBS from 'react-bootstrap'



const Header = () => {
    return (
        <RBS.Navbar bg="light" expand="md">
            <RBS.Navbar brand={require('../pics/NideoVova.png')}href="/"/>
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
                <RBS.Nav.Link href="/contact-us">Contact us</RBS.Nav.Link>
                </RBS.Nav>
                <RBS.Form inline>
                    <RBS.FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <RBS.Button variant="outline-success" id='searchbar'>Search</RBS.Button>
                </RBS.Form>
                <RBS.Navbar.Brand href="/cart">Cart: </RBS.Navbar.Brand>
                <RBS.Form inline>
                    <RBS.FormControl type="username" placeholder="Username" className="mr-sm-2" />
                    <RBS.FormControl type="password" placeholder="Password" className="mr-sm-2" />
                    <RBS.Button variant="outline-success" id='searchbar' type='submit'>Login</RBS.Button>
                </RBS.Form>
            </RBS.Navbar.Collapse>
        </RBS.Navbar>
    )
}

export default Header
