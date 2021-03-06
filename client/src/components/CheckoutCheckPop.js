import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal';
import {useHistory} from 'react-router-dom'

export default function CheckoutCheckPop({checkout}){

/*Modal module fetched from https://www.npmjs.com/package/react-modal. We have used the examplecode
and tweaked it to fit our program.*/
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

const [modalIsOpen,setIsOpen] = React.useState(false);
function openModal() {
    setIsOpen(true);
}

function afterOpenModal() {
    // references are now sync'd and can be accessed.
   //subtitle.style.color = '#f00';
}

function closeModal(){
    setIsOpen(false);
}

const history = useHistory();

const routeChange = () =>{ 
  let path = `/`; 
  history.push(path);
}
    //HTML for the after-checkout popup
    return (
        <>
          <Button id='' variant='danger' onClick={() => {
              openModal()
              checkout()
          }}>Checkout</Button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Confirm Checkout modal"
          > 
            <h5>Checkout successful!</h5>
            <p>You can find you order under orderhistory.</p>
            <Button id='confirmCheckout' variant='danger' onClick={() => routeChange}>OK</Button>
          </Modal>
        </>
      );
}