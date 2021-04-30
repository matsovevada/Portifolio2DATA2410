import React, { useState, useEffect } from 'react'
import Header from './components/Header.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import AboutUs from './components/About.js'
import Register from './components/Register.js'
import FormMovie from './components/FormMovie.js'
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
        const cart = await fetchCart();
        setCart(cart)
    }
    getCart();
}, []);

function updateCart() {

  // only update database if user is logged in
  if (user) {
    async function updateCart() {
      const user = await addMovieToCart();
      setCart(cart)
    }
    updateCart();
  }

  else {
    setCart(...cart, movie)
  }
}

async function addMovieToCart(movie) {

  const data = movie;

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  };

  const res = await fetch('http://localhost:8080/user/shoppingCart', requestOptions);
  const data = await res.json()

  return data
}

async function fetchCart() {

    const requestOptions = {
        method: 'GET',
    };

    const res = await fetch('http://localhost:8080/user/shoppingCart', requestOptions);
    const data = await res.json()

    return data
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
      <Header/>
      <Route exact path='/' component={Home}/>
      <Route path='/about-us' component={AboutUs}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/formMovie' component={FormMovie}/>
      <Movies movies={movies}/>
    </div>
  );
}

export default App;
