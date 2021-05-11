import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register() {

    function checkTitle(event) {
        if (event.target.value.length < 1) {
            document.getElementById('registerMovieTitleError').className = 'registerMovieErrorLabelVisible'
        }
        else document.getElementById('registerMovieTitleError').className = 'registerMovieErrorLabelHidden' 
    }

    function checkShortDescription(event) {
        if (event.target.value.length < 1) {
            document.getElementById('registerMovieShortDescriptionError').className = 'registerMovieErrorLabelVisible'
        }
        else document.getElementById('registerMovieShortDescriptionError').className = 'registerMovieErrorLabelHidden' 
    }

    function checkLongDescription(event) {
        if (event.target.value.length < 1) {
            document.getElementById('registerMovieLongDescriptionError').className = 'registerMovieErrorLabelVisible'
        }
        else document.getElementById('registerMovieLongDescriptionError').className = 'registerMovieErrorLabelHidden' 
    }

    function checkPrice(event) {
        if (isNaN(event.target.value) || event.target.value.length < 1 || event.target.value < 1) {
            document.getElementById('registerMoviePriceError').className = 'registerMovieErrorLabelVisible'
        }
        else document.getElementById('registerMoviePriceError').className = 'registerMovieErrorLabelHidden' 
    }

    function check() {
        let title = document.getElementById('title').value;
        let shortDescription = document.getElementById('shortDescription').value;
        let longDescription = document.getElementById('longDescription').value;
        let price = document.getElementById('price').value;

        let titleOk = false;
        let shortDescriptionOk = false;
        let longDescriptionOk = false;
        let priceOk = false;
        
        if (title.length < 1) document.getElementById('registerMovieTitleError').className = 'registerMovieErrorLabelVisible'
        else titleOk = true;

        if (shortDescription.length < 1) document.getElementById('registerMovieShortDescriptionError').className = 'registerMovieErrorLabelVisible'
        else shortDescriptionOk = true;

        if (longDescription.length < 1) document.getElementById('registerMovieLongDescriptionError').className = 'registerMovieErrorLabelVisible'
        else longDescriptionOk = true;

        if (isNaN(price) || price.length < 1 || price < 1) document.getElementById('registerMoviePriceError').className = 'registerMovieErrorLabelVisible'
        else priceOk = true;

        if (titleOk && shortDescriptionOk && longDescriptionOk && priceOk) return true;
        else return false;
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        if (!check()) return;

        const form = event.currentTarget;
        const url = form.action;
        const formData = new FormData(form);
    
        const requestOptions = {
            method: 'POST',
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

                window.location = '/'
    
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
      }
  

    return (
        <div className='Register'>
            <Form action="http://localhost:8080/admin/movie" method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <Form.Group size='lg' controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Label id='registerMovieTitleError' className='registerMovieErrorLabelHidden'>Title can't be blank</Form.Label>
                    <Form.Control
                        autoFocus
                        name="title"
                        type="title"
                        onChange={event => checkTitle(event)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="shortDescription">
                    <Form.Label>Short description</Form.Label>
                    <div>
                    <Form.Label id='registerMovieShortDescriptionError' className='registerMovieErrorLabelHidden'>Short description can't be blank</Form.Label>
                    <Form.Control
                        autoFocus
                        name="shortDescription"
                        type="shortDescription"
                        onChange={event => checkShortDescription(event)}
                    />
                    </div>
                </Form.Group>
                <Form.Group size='lg' controlId='longDescription'>
                    <Form.Label>Long description</Form.Label>
                    <Form.Label id='registerMovieLongDescriptionError' className='registerMovieErrorLabelHidden'>Long description can't be blank</Form.Label>
                    <Form.Control
                        autoFocus
                        name="longDescription"
                        type="longDescription"
                        as='textarea'
                        onChange={event => checkLongDescription(event)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Label id='registerMoviePriceError' className='registerMovieErrorLabelHidden'>Price must be a number bigger than 0</Form.Label>
                    <Form.Control
                        autoFocus
                        name="price"
                        type="price"
                        onChange={event => checkPrice(event)}
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='genre'>
                    <Form.Label>Genre</Form.Label>
                    <Form.Label id='registerMovieGenreError' className='registerMovieErrorLabelHidden'>Price must be a number bigger than 0</Form.Label>
                    <Form.Control as="select" name="genre" type="genre" as='select' onChange={event => (event)}>
                        <option>Action</option>
                        <option>Comedy</option>
                        <option>Fantasy</option>
                        <option>Horror</option>
                        <option>Mystery</option>
                        <option>Romance</option>
                        <option>Thriller</option>
                    </Form.Control >  
                </Form.Group>
                <Form.Group size='lg' controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        autoFocus
                        type="file"
                        name="image"
                        accept="image/*"
                    />
                </Form.Group>
                <Button block size='lg' type='submit'>Register</Button>
            </Form>   
        </div>
    )
}
