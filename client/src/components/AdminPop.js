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
      <>
        <Button variant='outline-danger' onClick={openModal}>Edit</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Admin modal"
        >

        <h2 ref={_subtitle => (subtitle = _subtitle)} className='AdminPopTitle'>Edit movie</h2>

        <div className='AdminPop'>
          <div className='AdminPopImg'>{img}</div>
          
          <div className='editMovie'>
            <Form action={url_action} method="PUT" encType="multipart/form-data" onSubmit={handleSubmit}>

                  <Form.Group size='lg' controlId='image'>
                      <Form.Label>Edit image</Form.Label>
                      <Form.Control
                          autoFocus
                          type="file"
                          name="image"
                          accept="image/*"
                      />
                  </Form.Group>  

                  <Form.Group size='lg' controlId='title'>
                      <Form.Label>Title</Form.Label>
                      <Form.Label id='registerMovieTitleError' className='registerMovieErrorLabelHidden'>Title can't be blank</Form.Label>
                      <Form.Control
                          autoFocus
                          name="title"
                          type="title"
                          defaultValue={title}
                          onChange={event => checkTitle(event)}
                      />
                  </Form.Group>
                  <Form.Group size="lg" controlId="shortDescription">
                      <Form.Label className='Label'>Short description</Form.Label>
                      <Form.Label id='registerMovieShortDescriptionError' className='registerMovieErrorLabelHidden'>Short description can't be blank</Form.Label>
                      <Form.Control
                          autoFocus
                          name="shortDescription"
                          type="shortDescription"
                          defaultValue={shortDescription}
                          onChange={event => checkShortDescription(event)}
                      />
                  </Form.Group>
                  <Form.Group size='lg' controlId='longDescription'>
                      <Form.Label>Long description</Form.Label>
                      <Form.Label id='registerMovieLongDescriptionError' className='registerMovieErrorLabelHidden'>Long description can't be blank</Form.Label>
                      <Form.Control
                          autoFocus
                          name="longDescription"
                          type="longDescription"
                          defaultValue={longDescription}
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
                          defaultValue={price}
                          onChange={event => checkPrice(event)}
                      />
                  </Form.Group>
                  <Form.Group size='lg' controlId='genre'>
                      <Form.Label>Genre</Form.Label>
                      <Form.Control as="select" autoFocus name="genre" type="genre" defaultValue={genre}>
                          <option>Action</option>
                          <option>Comdedy</option>
                          <option>Fantasy</option>
                          <option>Horror</option>
                          <option>Mystery</option>
                          <option>Romance</option>
                          <option>Thriller</option>
                        </Form.Control>
                  </Form.Group>
                  <div className='AdminPopBtn'>          
                    <Button variant='outline-danger' block size='md' type='submit'>Submit changes</Button>
                    <Button variant='danger' block size='md' onClick={closeModal}>Close</Button>
                  </div>
              </Form> 

            </div>
          </div>
          
        </Modal>
      </>
    );
}