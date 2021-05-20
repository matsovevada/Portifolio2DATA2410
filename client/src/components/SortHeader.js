import React from 'react'
import * as RBS from 'react-bootstrap'

const SortHeader = ({filter_movies, sort_movies, search_movie}) => {
    
    //function to search for movies when pressing ENTER after writing in the search bar
    const handleKeyPress = (event) => {
        if (event.charCode === 13 || event.key === 'Enter') {
            event.preventDefault();
            search_movie(document.getElementById('search_string').value)
        }   
    }

    return (
        <div>
            <RBS.Navbar bg="light" expand="xl">
                <RBS.Nav className="mr-auto">
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
                    <RBS.Form inline>
                        <RBS.FormControl type="text" id="search_string"  placeholder="Search for title" className="mr-sm-2" onKeyPress={handleKeyPress}/>
                        <RBS.Button variant="outline-danger" id='searchbar' onClick={() => search_movie(document.getElementById('search_string').value)}>Search</RBS.Button>
                    </RBS.Form>
                    </RBS.Nav>
            </RBS.Navbar>
        </div>
    )
}

export default SortHeader
