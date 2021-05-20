import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-modal';


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
/*Modal module fetched from https://www.npmjs.com/package/react-modal. We have used the examplecode
and tweaked it to fit our program.*/
Modal.setAppElement('#root')

export default function MovieViewPop({movie, title, longDescription, img, price, genre, updateCart, user}){
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
        <Button variant='danger' onClick={openModal}>Show more</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="MovieViewPop Modal"
        >
          <div className='MoviePop'>
            <div className='MoviePopImg'>{img}</div>
            <div className='MoviePopInfo'>
              <h2 ref={_subtitle => (subtitle = _subtitle)}>{title}</h2>
              <div>
                <p className='MoviePopDesc'>Description:</p>
                <p>{longDescription}</p>
                <p>Genre: {genre}</p>
                <p>Price: {price} NOK</p>
                {(user != null && !user.isAdmin) && <Button variant='secondary' onClick={() => updateCart(movie)}>Add to cart</Button>}
                {' '}
                <Button onClick={closeModal} variant='danger'>Close</Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
}