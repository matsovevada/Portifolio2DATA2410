import React from 'react';
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export default function AdminPop({admin_editMovie, _id, title, shortDescription, longDescription, img, price, genre}){

  let url_action = "http://localhost:8080/admin/movie/" + _id

  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;
    const formData = new FormData(form);
  


    const requestOptions = {
        method: 'PUT',
        body: formData, img
    };
    fetch(url, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            admin_editMovie();
            closeModal();

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
      <div>
        <Button onClick={openModal}>Edit</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Admin modal"
        >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Edit movie</h2>

       
        <div>{img}</div>
        
        <div className='editMovie'>
          <Form action={url_action} method="PUT" encType="multipart/form-data" onSubmit={handleSubmit}>

                <Form.Group size='lg' controlId='image'>
                    <Form.Label>Edit image</Form.Label>
                    <Form.Control
                        autoFocus
                        type="file"
                        name="image"
                    />
                </Form.Group>  

                <Form.Group size='lg' controlId='title'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        autoFocus
                        name="title"
                        type="title"
                        defaultValue={title}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="shortDescription">
                    <Form.Label>Short description</Form.Label>
                    <Form.Control
                        autoFocus
                        name="shortDescription"
                        type="shortDescription"
                        defaultValue={shortDescription}
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='longDescription'>
                    <Form.Label>Long description</Form.Label>
                    <Form.Control
                        autoFocus
                        name="longDescription"
                        type="longDescription"
                        defaultValue={longDescription}
                        as='textarea'
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        autoFocus
                        name="price"
                        type="price"
                        defaultValue={price}
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='genre'>
                    <Form.Label>Genre</Form.Label>
                    <Form.Control
                        autoFocus
                        name="genre"
                        type="genre"
                        defaultValue={genre}
                    />
                </Form.Group>          
                <Button block size='lg' type='submit'>Submit changes</Button>
            </Form> 

          </div>
       
          <Button onClick={closeModal}>Close</Button>
        </Modal>
      </div>
    );
}