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
import Orderhistory from './components/Orderhistory'
import ChangeUserInfo from './components/ChangeUserInfo'
import {Route} from 'react-router-dom';

function App() {

// user
const [user, setUser] = useState(null)

async function fetchUser() {
    
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const res = await fetch('http://localhost:8080/user', requestOptions);
  const data = await res.json()

  return data;
}

useEffect(() => {
  async function getUser() {
      const user = await fetchUser();
      if (user) setUser(user)
      else setUser(null)
  }
  getUser()
}, [])

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
// only get shopping cart if user is logged in 
    async function getCart() {
      const user = await fetchUser();
      if (user) setCart(user.shoppingCart)
      else setCart([])
    }
    getCart();
  }, []);

//useEffect(() => {
  //if (user) { return }

  //async function getCart_nologin() {
    //if(localStorage.getItem('cart') === null) { return setCart([]) }
    //let localstorage_cart = JSON.parse(localStorage.getItem('cart'))
    //let set_localstorage_cart = window.localStorage.setItem('cart', )
    //setCart(localstorage_cart)}
    //getCart_nologin();
  //}, []);

function updateCart(movie) {
  console.log("USER (update cart")
  console.log(user)
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

  else window.location = '/login'

}

function decreaseCount(movie) {
  if (user) {
    async function updateCart() {
        let movieInCart = checkCount(movie)
        movieInCart.count = movieInCart.count - 1
        const cart = await removeMovieFromCart(movieInCart);
        setCart(cart)    
    }
    updateCart();
  } 

  else window.location = '/login'

}

function checkCount(movie) {
  for (let movieInCart of cart) {
    if(movieInCart._id === movie._id) {
      return movieInCart
    }    
  }
  return null
}

function admin_deleteMovie(movie) {
  if(user.isAdmin) {
      admin_deleteMovieFromDB(movie);
      setMovies(movies.filter((movieInArray) => movieInArray._id !== movie._id))
      }
 
}

//Render movies when edit is complete
function admin_editMovie() {
  async function getMovies() {
    const movies = await fetchMovies();
    setMovies(movies)
  }
getMovies();

  async function fetchMovies() {  
    const res = await fetch('http://localhost:8080/webshop/movies');
    const data = await res.json()

    return data
  }
} 

async function admin_deleteMovieFromDB(movie) {

  let id = movie._id

  const requestOptions = {
    method: 'DELETE',
    credentials: 'include',
  };

  const res = await fetch('http://localhost:8080/admin/movie/' + id, requestOptions);
  const data = await res.json()

  return data
}


async function addMovieToCart(movie) {

  const inputData = {
    "movieID": movie._id,
    "count": movie.count
  }

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(inputData)
  };

  const res = await fetch('http://localhost:8080/user/shoppingCart', requestOptions);
  const data = await res.json()

  return data
}

async function removeMovieFromCart(movie) {

  const inputData = {
    "movieID": movie._id,
    "count": movie.count
  }

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(inputData)
  };

  const res = await fetch('http://localhost:8080/user/shoppingCart/remove', requestOptions);
  const data = await res.json()

  return data
}

async function deleteCartAndUpdateOrderHistory() {

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
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
        if (user) setOrderHistory(user.orderHistory)
        else setOrderHistory([])
    }
    getOrderHistory()
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
      <Header cart={cart} user={user}/>
      <Route
        exact path='/'
        render={(props) => (
          <Movies {...props} movies={movies} updateCart={updateCart} admin_deleteMovie={admin_deleteMovie} admin_editMovie={admin_editMovie} user={user}/>
        )}
      />
      <Route path='/about-us' component={AboutUs}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/formMovie' component={FormMovie}/>
      <Route
        exact path='/changeUserInfo'
        render={(props) => (
          <ChangeUserInfo {...props} user={user}/>
        )}
      />
      <Route
        path='/test'
        render={(props) => (
          <Orderhistory {...props}  orders={orderHistory}/>
        )}
      />
      <Route
        path='/cart'
        render={(props) => (
          <Cart {...props}  cart={cart} checkout={checkout} updateCart={updateCart} decreaseCount={decreaseCount} />
        )}
      />
    </div>
  );
}

export default App;
