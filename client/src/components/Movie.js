import React, { useState, useEffect } from 'react'

const Movie = ({movie}) => {


    //  { showLongDesc ? <h3>Long desc: </h3> : null
    const [showExtendedInformation, setShowExtendedInformation] = useState(false);

    const toggleShowExtendedInformation = () => {
    if (showExtendedInformation) {setShowExtendedInformation(false)}
    else setShowExtendedInformation(true)

    // showExtendedInformation ? setShowExtendedInformation(false) : setShowExtendedInformation(true)

}

//Credit: https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};


    return (
        <div>
            <h3>Title: {movie.title}</h3>
            <h3>Description: {movie.description}</h3>
            <h3>Price: {movie.price}</h3>
            { movie.img ? <img src={`data:image/png;base64,${arrayBufferToBase64(movie.img.data.data)}`}/> : null} 
        
            { showExtendedInformation ? <h3>Genre: </h3> : null }
            <button onClick={() => toggleShowExtendedInformation()}>Show more</button>
        </div>
    )
}

export default Movie