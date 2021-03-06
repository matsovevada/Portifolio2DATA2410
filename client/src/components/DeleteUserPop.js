import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal';

export default function DeleteUserPop({user}){

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

//API call for deleting the user from the website
function deleteUser() {
        
    
    const requestOptions = {
        method: 'DELETE',
        credentials: "include"
    };
    fetch('https://localhost:8080/user/' + user._id, requestOptions)

    .catch(error => {
        console.error('There was an error!', error);
    });

    window.location = '/'
}

    //The HTML for the delete user popup
    return (
        <>
          <Button id='DeleteUserBtn' variant='danger' onClick={openModal}>Delete user</Button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Delete user modal"
          > 
            <h5>Are you sure you want to delete your user account?</h5>
            <Button id='DeleteUserConfirmBtn' variant='danger' onClick={deleteUser}>Delete user</Button>
            <Button id='DeleteUserCancelBtn'  variant='secondary' onClick={closeModal}>Cancel</Button>
          </Modal>
        </>
      );
}