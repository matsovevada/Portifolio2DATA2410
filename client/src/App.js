import React, { useState, useEffect } from 'react'
import Header from './components/Header.js'
import Login from './components/Login.js'
import AboutUs from './components/About.js'
import Register from './components/Register.js'
import FormMovie from './components/FormMovie.js'
import Cart from './components/Cart.js'
import Movies from './components/Movies.js'
import Orderhistory from './components/Orderhistory'
import ChangeUserInfo from './components/ChangeUserInfo'
import {Route} from 'react-router-dom';

function App() {

// api base
const base = 'https://localhost:8080'

// user
const [user, setUser] = useState(null)

async function fetchUser() {
    
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const res = await fetch(base + '/user', requestOptions);
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
    const res = await fetch(base + '/webshop/movies');
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

function updateCart(movie) {

  // only update database if user is logged in
  if (user) {
    async function updateCart() {

      // movie exists in user's cart
      if(isMovieInUserCart(movie)) {
        let movieInCart = isMovieInUserCart(movie)
        movieInCart.count = movieInCart.count + 1 
        const cart = await addMovieToCart(movieInCart);
        setCart(cart)   
      }

      // movie does not exist in user's cart
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
        let movieInCart = isMovieInUserCart(movie)
        movieInCart.count = movieInCart.count - 1
        const cart = await removeMovieFromCart(movieInCart);
        setCart(cart)    
    }
    updateCart();
  } 

  else window.location = '/login'

}

// checks if the movie the user is adding to the cart already exists in the cart and returns it if it does
function isMovieInUserCart(movie) {
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
    const res = await fetch(base + '/webshop/movies');
    const data = await res.json()

    return data
  }
} 


//Search db for movie for given string
function search_movie(title) {
  document.getElementById('showFilterText').className = 'setFilterTextHidden'

  async function getMovies_search() {
    const movies = await fetchMovies_search();

    setMovies(movies)
    document.getElementById('showSearchText').className = 'setSearchTextVisible'
    document.getElementById('showSearchText').innerText = 'Search results for: ' +  title
    if(movies.length === 0) {
      document.getElementById('showSearchText').innerText = 'Search results for: ' +  title + '\n\nNo result found. Try a different search term'
  }
}
getMovies_search();

    async function fetchMovies_search() {
    
      const requestOptions = {
        method: 'GET',
        credentials: 'include',
      }

      const res = await fetch(base + '/webshop/movies/' + title, requestOptions);
      const data = await res.json()

      return data
  }
}

//Filter movies for given string
function filter_movies(filter) {
  document.getElementById('showSearchText').className = 'setSearchTextHidden'

  async function getMovies_filter() {
    const movies = await fetchMovies_filter();

    setMovies(movies)
    document.getElementById('showFilterText').className = 'setFilterTextVisible'
    document.getElementById('showFilterText').innerText = 'Showing movies for genre: ' +  filter
  
}
getMovies_filter();

    async function fetchMovies_filter() {

      const requestOptions = {
        method: 'GET',
        credentials: 'include',
      }

      const res = await fetch(base + '/webshop/movies/filterBy/' + filter, requestOptions);
      const data = await res.json()

      return data
  }
}

//Filter movies for given string
function sort_movies(route) {
  document.getElementById('showFilterText').className = 'setFilterTextHidden'
  document.getElementById('showSearchText').className = 'setSearchTextHidden'

  async function getMovies_sort() {
    const movies = await fetchMovies_sort();

    setMovies(movies)

  
}
getMovies_sort();

    async function fetchMovies_sort() {

      const requestOptions = {
        method: 'GET',
        credentials: 'include',
      }

      const res = await fetch(base + '/webshop/movies/sort/' + route, requestOptions);
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

  const res = await fetch(base + '/admin/movie/' + id, requestOptions);
  const data = await res.json()

  if (data) {
    if (data.illegalRequest) return alert("Illegal request: you do not have the permissions for this API call. Only admin users can add movies.")
    else setMovies(movies.filter((movieInArray) => movieInArray._id !== movie._id))
  }
  else window.location = '/login'
   
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

  const res = await fetch(base + '/user/shoppingCart', requestOptions);
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

  const res = await fetch(base + '/user/shoppingCart/remove', requestOptions);
  const data = await res.json()

  return data
}

async function deleteCartAndUpdateOrderHistory() {

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  };

  const res = await fetch(base + '/user/checkout', requestOptions);
  const data = await res.json()

  return data;
}

function checkout() {
    async function checkout() {
      const user = await deleteCartAndUpdateOrderHistory();

      if (user) {
        setCart([])
        setOrderHistory(user.orderHistory)
      }
      else window.location = '/login'
      
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

  return (
    <div>
      <Header cart={cart} user={user} />
      <Route
        exact path='/'
        render={(props) => (
          <Movies {...props} movies={movies} updateCart={updateCart} admin_deleteMovie={admin_deleteMovie} admin_editMovie={admin_editMovie}
           user={user} filter_movies={filter_movies} sort_movies={sort_movies} search_movie={search_movie}/>
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
        path='/orderhistory'
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