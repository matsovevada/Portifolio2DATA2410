import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register() {

    function handleSubmit(event) {
        event.preventDefault();
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
                    <Form.Control
                        autoFocus
                        name="title"
                        type="title"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="shortDescription">
                    <Form.Label>Short description</Form.Label>
                    <Form.Control
                        autoFocus
                        name="shortDescription"
                        type="shortDescription"
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='longDescription'>
                    <Form.Label>Long description</Form.Label>
                    <Form.Control
                        autoFocus
                        name="longDescription"
                        type="longDescription"
                        as='textarea'
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        autoFocus
                        name="price"
                        type="price"
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='genre'>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        autoFocus
                        name="genre"
                        type="genre"
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        autoFocus
                        type="file"
                        name="image"
                    />
                </Form.Group>
                <Button block size='lg' type='submit'>Register</Button>
            </Form>   
        </div>
    )
}
