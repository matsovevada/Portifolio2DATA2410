import React from 'react'
import 'reactjs-popup/dist/index.css';
import * as RBS from 'react-bootstrap'
import MovieViewPop from './MovieViewPop.js'
import AdminPop from './AdminPop.js'
import DefaultPicture from '../pics/default-movie-image.png'



const Movie = ({movie, updateCart, admin_deleteMovie, admin_editMovie, user}) => {

    //Converts from the objects buffered array representasion of the image to a Base64 string
    //Credit: https://stackoverflow.com/questions/9267899/arraybuffer-to-base64-encoded-string
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };


    return (
        <div className='MovieViewBox'>
            {/* Display default image if the movie does not have an image stored */}
            { movie.img ? <img alt='Movie img'src={`data:image/png;base64,${arrayBufferToBase64(movie.img.data.data)}`} className='MovieViewPicture'/> : <img alt='Movie img' src={DefaultPicture} className='MovieViewPicture'/>} 
            <div className='MovieViewInfo'>
                <h2 className='MovieViewTitle'>{movie.title}</h2>
                <h3 className='MovieViewDesTitle'>Description:</h3>
                <h3 className='MovieViewDescri'>{movie.shortDescription}</h3>
                <h3 className='MovieViewGenre'>Genre: {movie.genre}</h3>
                <h3 className='MovieViewPrice'>Price: {movie.price},-</h3>
                
                {/* Adminfunctions, buttons for deleting and editing only visible for admin */}
                {(user != null && user.isAdmin) && <RBS.Button variant='danger' onClick={() => admin_deleteMovie(movie)}>Delete</RBS.Button>}
                
                {/* Passes data to "edit" pop-up. Display default image if not present in DB */}
                {(user != null && user.isAdmin) && <AdminPop admin_editMovie={admin_editMovie} _id={movie._id} title={movie.title} shortDescription={movie.shortDescription} longDescription={movie.longDescription} genre={movie.genre} price={movie.price} 
                img={movie.img ? <img alt='Movie img' src={`data:image/png;base64,${arrayBufferToBase64(movie.img.data.data)}`}/> : null}/>}
                
                {/* Passes data to "show more" pop-up. Display default image if not present in DB */}
                <MovieViewPop movie={movie} updateCart={updateCart} title={movie.title} longDescription={movie.longDescription} genre={movie.genre} price={movie.price}
                img={ movie.img ? <img alt='Movie img' src={`data:image/png;base64,${arrayBufferToBase64(movie.img.data.data)}`} className='MovieViewPicture'/> : <img alt='Movie img' src={DefaultPicture} className='MovieViewPicture'/>} />
                
                {/* Display "add to cart" to all users except admin */}
                {((user === null) || (user != null && user.isAdmin === false)) && <RBS.Button variant='secondary' onClick={() => updateCart(movie)}>Add to cart</RBS.Button>}
            </div>
        </div>
    )
}   

export default Movie