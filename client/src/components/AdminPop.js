import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'

const MAX_FILE_SIZE = 500000 // 500 kb

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

/*Modal module fetched from https://www.npmjs.com/package/react-modal. We have used the examplecode
and tweaked it to fit our program.*/

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

  //OnChange which checks the length of Title in the form where Admin can edit movies 
  function checkTitle(event) {
    if (event.target.value.length < 1) {
        document.getElementById('registerMovieTitleError').className = 'registerMovieErrorLabelVisible'
    }
    else document.getElementById('registerMovieTitleError').className = 'registerMovieErrorLabelHidden' 
  }

  //OnChange which checks the length of Short Description in the form where Admin can edit movies 
  function checkShortDescription(event) {
      if (event.target.value.length < 1) {
          document.getElementById('registerMovieShortDescriptionError').className = 'registerMovieErrorLabelVisible'
      }
      else document.getElementById('registerMovieShortDescriptionError').className = 'registerMovieErrorLabelHidden' 
    }
  
  //OnChange which checks the length of Long Description in the form where Admin can edit movies 
  function checkLongDescription(event) {
      if (event.target.value.length < 1) {
          document.getElementById('registerMovieLongDescriptionError').className = 'registerMovieErrorLabelVisible'
      }
      else document.getElementById('registerMovieLongDescriptionError').className = 'registerMovieErrorLabelHidden' 
    }

  //OnChange which checks the length of price in the form where Admin can edit movies 
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


  //Handles the API/DB-calls when you submit changes to a movie as admin
  function handleSubmit(event) {
    event.preventDefault();

    if (!check()) return;

    // check image file size
    const file = document.getElementById('imageFile')
    const fileSize = file.files.item(0).size;
    if (fileSize > MAX_FILE_SIZE) return alert("The selected file is too big, please select a file less than 500 kb");

    const form = event.currentTarget;
    const url = form.action;
    const formData = new FormData(form);

    const requestOptions = {
        method: 'PUT',
        credentials: "include",
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
                if (data.illegalRequest) alert("Illegal request: you do not have the permissions for this API call. Only admin users can add movies.")
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    
  }


    //The HTML for the Admin Edit Popup
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
                          id='imageFile'
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