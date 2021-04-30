import React from 'react'
import Movie from './Movie'

const Movies = ({movies, updateCart}) => {
    return (
        <>
            {movies.map((movie) => (
                <Movie 
                    movie={movie}
                    updateCart={updateCart}
                />)
            )}
        </>
    )
}


export default Movies