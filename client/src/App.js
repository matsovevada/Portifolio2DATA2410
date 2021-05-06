import React, { useState, useEffect } from 'react'
import Header from './components/Header.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import AboutUs from './components/About.js'
import Register from './components/Register.js'
import FormMovie from './components/FormMovie.js'
import Cart from './components/Cart.js'
import Movies from './components/Movies.js'
import {Route} from 'react-router-dom';

function App() {

// user
const [user, setUser] = useState(true)

// movies
const [movies, setMovies] = useState([])

useEffect(() => {
    async function getMovies() {
        const movies = await fetchMovies();
        setMovies(movies)
    }
    getMovies()
}, [])

async function fetchMovies() {
    const res = await fetch('http://localhost:8080/webshop/movies');
    const data = await res.json()

    return data
}

// shopping cart
const [cart, setCart] = useState([])

useEffect(() => {

    if (!user) return; // only get shopping cart if user is logged in 

    async function getCart() {
        const user = await fetchUser();
        setCart(user.shoppingCart)
    }
    getCart();
}, []);



function updateCart(movie) {
  // only update database if user is logged in
  if (user) {
    async function updateCart() {
      if(checkCount(movie)) {
        let movieInCart = checkCount(movie)
        movieInCart.count = movieInCart.count + 1 
        console.log("MOVIE COUNT")
        console.log(movieInCart.count)
        const cart = await addMovieToCart(movieInCart);
        setCart(cart)   
      }
      else {
        movie.count = 1 
        const cart = await addMovieToCart(movie);
        setCart(cart)   
  
      }   
    }
    updateCart();
    
  }

  else {
    if(checkCount(movie)) {
      cart.movie.count++
    }
    else {
      cart.movie.count = 1 
    }
    setCart(...cart, movie)
  }
}

function checkCount(movie) {
  for (let movieInCart of cart) {
    if(movieInCart._id === movie._id) {
      return movieInCart
    }    
  }
  return null
}

async function addMovieToCart(movie) {

  const inputData = {
    "_id": "608285180168d645858083ed",
    "movieID": movie._id,
    "count": movie.count
  }

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputData)
  };

  const res = await fetch('http://localhost:8080/user/shoppingCart', requestOptions);
  const data = await res.json()

  return data
}

async function fetchUser() {

    let id = "608285180168d645858083ed";
    
    const requestOptions = {
      method: 'GET',
    };

    const res = await fetch('http://localhost:8080/user/' + id, requestOptions);
    const data = await res.json()

    return data;
}

async function deleteCartAndUpdateOrderHistory() {

  let id = "608285180168d645858083ed"

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: id
  };

  const res = await fetch('http://localhost:8080/user/checkout', requestOptions);
  const data = await res.json()

  return data;
}

function checkout() {

    async function checkout() {
      const user = await deleteCartAndUpdateOrderHistory();
      setCart([])
      setOrderHistory(user.orderHistory)
    }
    checkout();
}

// order history
const [orderHistory, setOrderHistory] = useState([])

useEffect(() => {
    async function getOrderHistory() {
        const user = await fetchUser();
        setOrderHistory(user.orderHistory)
    }
    fetchUser()
}, [])


// async function fetchMovies() {

//     const requestOptions = {
//         method: 'GET',
//     };

//     fetch('http://localhost:8080/webshop/movies', requestOptions)
//     .then(async response => {
//         const isJson = response.headers.get('content-type')?.includes('application/json');
//         const data = isJson && await response.json();
        
//         // check for error response
//         if (!response.ok) {
//             // get error message from body or default to response status
//             const error = (data && data.message) || response.status;
//             return Promise.reject(error);
//         }
//        console.log(data)
//         return data
//     })
//     .catch(error => {
//         console.error('There was an error!', error);
//     });
// } 

  return (
    <div>
      <Header cart={cart}/>
      <Route
        exact path='/'
        render={(props) => (
          <Movies {...props} movies={movies} updateCart={updateCart} />
        )}
      />
      <Route path='/about-us' component={AboutUs}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/formMovie' component={FormMovie}/>
      <Route
        path='/cart'
        render={(props) => (
          <Cart {...props}  cart={cart} checkout={checkout}/>
        )}
      />
    </div>
  );
}

export default App;
