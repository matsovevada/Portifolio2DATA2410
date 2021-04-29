import React, { useState } from 'react'


export default function GetMovies() {


//array 
const [movie, setMovie] = useState()

const requestOptions = {
    method: 'GET',
};

fetch('http://localhost:8080/webshop/movies', requestOptions)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();
        setMovie(data)
        

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

    })
    .catch(error => {
        console.error('There was an error!', error);
    });


return (
    <div className='showMovies'>
        {console.log(movie)}
        {movie.forEach(movie => {<div>{console.log}</div>}) }
    </div>
)
}
