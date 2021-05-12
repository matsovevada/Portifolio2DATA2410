import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal';
import CheckoutItem from './CheckoutItem'

const customStyle1 = {
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

export default function CheckoutPopup({checkout, cart, totalPrice}){
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
      <div className='CheckoutPop'>
        <Button variant='danger' block size='xl' onClick={openModal}>Go to checkout</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyle1}
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Checkout:</h2>
          <div>
            {cart.map((item) => (<CheckoutItem item={item}/>))}
            <p className='CheckoutPopTotal'>Total: {totalPrice()},-</p>
          </div>
          <div className='CheckoutPopText'>
            <p>Congratulations! Your IP-address has been picked out to get 100% discount for the rest of your life!</p>
            <p>This is NOT a scam ;)</p>
            <p className='CheckoutPopFinalTotal'>Checkout total: 0,-</p>
          </div>
          <Button variant='secondary' onClick={checkout}>Checkout</Button>
          {' '}
          <Button variant='danger' onClick={closeModal}>Close</Button>
        </Modal>
      </div>
    );
}