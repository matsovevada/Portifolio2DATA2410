import React from 'react'
import Movie from './Movie'

const Movies = ({movies, updateCart, admin_deleteMovie, admin_editMovie, user}) => {
    return (
        <div className='movieView'>
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