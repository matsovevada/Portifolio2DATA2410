import React, { useState, useEffect } from 'react'
import Header from './components/Header.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import AboutUs from './components/About.js'
import Register from './components/Register.js'
import FormMovie from './components/FormMovie.js'
import Cart from './components/Cart.js'
import Movies from './components/Movies.js'
import Test from './components/Test.js'
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
        const cart = await fetchCart();
        setCart(cart)
    }
    getCart();
}, []);

function updateCart(movie) {

  // only update database if user is logged in
  if (user) {
    async function updateCart() {
      const cart = await addMovieToCart(movie._id);
      setCart(cart)
    }
    updateCart();
  }

  else {
    setCart(...cart, movie)
  }
}

async function addMovieToCart(id) {

  const inputData = {
    "_id": "608fab497c53581e18fed043",
    "movieID": id
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

async function fetchCart() {

   
    let id = "608fab497c53581e18fed043";
    
    const requestOptions = {
      method: 'GET',
    };

    const res = await fetch('http://localhost:8080/user/' + id, requestOptions);
    const data = await res.json()

    return data.shoppingCart;
}

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
      <Route path='/test' component={Test}/>
      <Route
        path='/cart'
        render={(props) => (
          <Cart {...props}  cart={cart}/>
        )}
      />
    </div>
  );
}

export default App;
