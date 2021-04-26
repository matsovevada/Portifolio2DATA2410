import React from 'react'

export default function getMovies() {

const home = () => {

    return (
        <div>
            <p>movies!!!</p>
        </div>    
    )
}

const requestOptions = {
    method: 'GET',
    body: formData

};
fetch(url, requestOptions)
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson && await response.json();

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

)
}
