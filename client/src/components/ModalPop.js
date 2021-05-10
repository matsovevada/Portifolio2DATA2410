import React from 'react';
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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

export default function ModalPop({title, longDescription, img, price, genre, updateCart}){
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

    return (
      <>
        <Button onClick={openModal}>Show more</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}>{title}</h2>
          <div>
            <p>Long description: {longDescription}</p>
            <p>Genre: {genre}</p>
            <p>Price: {price} NOK</p>
          </div>
          <div>{img}</div>
          <Button variant='secondary' onClick={updateCart}>Add to cart</Button>
          {' '}
          <Button onClick={closeModal}>Close</Button>
        </Modal>
      </>
    );
}