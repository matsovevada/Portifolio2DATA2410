import React from 'react'
import Movie from './Movie'

const Movies = ({movies}) => {
    return (
        <>
        {movies.forEach(movie => {
            <Movie movie={movie}/>
        })}
        
        </>
    )
}

export default Movies
