import React, { useState, useEffect } from 'react'

const Movie = ({movie}) => {


    //  { showLongDesc ? <h3>Long desc: </h3> : null
    const [showExtendedInformation, setShowExtendedInformation] = useState(false);

    const toggleShowExtendedInformation = () => {
    if (showExtendedInformation) {setShowExtendedInformation(false)}
    else setShowExtendedInformation(true)

    // showExtendedInformation ? setShowExtendedInformation(false) : setShowExtendedInformation(true)
}


    return (
        <div>
            <h3>Title: {movie.title}</h3>
            <h3>Description: {movie.description}</h3>
            <h3>Price: {movie.price}</h3>
            { showExtendedInformation ? <h3>Genre: </h3> : null }
            <button onClick={() => toggleShowExtendedInformation()}>Show more</button>
        </div>
    )
}

export default Movie