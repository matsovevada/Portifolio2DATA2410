import React from 'react'
import Movie from './Movie'
import SortHeader from './SortHeader'

const Movies = ({movies, updateCart, admin_deleteMovie, admin_editMovie, filter_movies, user, sort_movies, search_movie}) => {

    //Passes data and functions to the movie components
    return (
        <div className='movieView'>
            <SortHeader filter_movies={filter_movies} sort_movies={sort_movies} search_movie={search_movie}></SortHeader>
            <div id='showSearchText' className='setSearchTextHidden'></div>
            <div id='showFilterText' className='setFilterTextHidden'></div>
            {movies.map((movie) => (
                <Movie 
                    movie={movie}
                    updateCart={updateCart}
                    admin_deleteMovie={admin_deleteMovie}
                    admin_editMovie={admin_editMovie}
                    user = {user}
                />)
            )}
        </div>
    )
}


export default Movies