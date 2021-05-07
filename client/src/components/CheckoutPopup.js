import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal';
import Order from './Order'

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

export default function ModalPop({checkout, orders}){
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
      <div>
        <Button onClick={openModal}>Show more</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Checkout:</h2>
          {orders.map((orders) => (
          <Order order={orders}/>))}
          <p>Congratulations! Your IP-address has been picked out to get 100% discount for the rest of your life!</p>
          <Button variant='secondary' onClick={checkout}>Add to cart</Button>
          {' '}
          <Button onClick={closeModal}>Close</Button>
        </Modal>
      </div>
    );
}