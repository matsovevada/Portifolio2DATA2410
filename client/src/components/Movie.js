import React, { useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as RBS from 'react-bootstrap'
import ModalPop from './ModalPop.js'

const Movie = ({movie, updateCart}) => {


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
            <h3>Description: {movie.shortDescription}</h3>
            <h3>Price: {movie.price}</h3>
            { movie.img ? <img src={`data:image/png;base64,${arrayBufferToBase64(movie.img.data.data)}`}/> : null} 

            { showExtendedInformation ? <h3>Genre: {movie.genre}</h3> : null }
            <ModalPop title={movie.title} longDescription={movie.longDescription} genre={movie.genre} price={movie.price} img={movie.img ? <img src={`data:image/png;base64,${arrayBufferToBase64(movie.img.data.data)}`}/> : null}/>
            <RBS.Button variant='secondary' onClick={() => updateCart(movie)}>Add to cart</RBS.Button>
        </div>
    )
}

export default Movie