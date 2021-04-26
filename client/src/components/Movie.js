import React from 'react'

const movie = ({movie}) => {

    const [showGenre, setShowGenre] = React.useState(false)
    const [showLongDesc, setLongDesc] = React.useState(false)

    const showMore = () => {setShowGenre(true); setLongDesc(true)} 

    return (
        <div>
            <h3>Title: {movie.title}</h3>
            <h3>Description: {movie.shortDescription}</h3>
            <h3>Price: {movie.price}</h3>
            { showGenre ? <h3>Genre: {movie.genre}</h3> : null }
            { showLongDesc ? <h3>Long desc: {movie.longDescription}</h3> : null }
            <button onClick={showMore()}>Show more</button>
        </div>
    )
}

export default movie