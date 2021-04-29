import React from 'react'

const Movie = ({movie}) => {

    const [showGenre, setShowGenre] = React.useState(false)
    const [showLongDesc, setLongDesc] = React.useState(false)

    const showMore = () => {setShowGenre(true); setLongDesc(true)} 

    return (
        <div>
            <h3>Title: </h3>
            <h3>Description: </h3>
            <h3>Price: </h3>
            { showGenre ? <h3>Genre: </h3> : null }
            { showLongDesc ? <h3>Long desc: </h3> : null }
            <button onClick={showMore()}>Show more</button>
        </div>
    )
}

export default Movie