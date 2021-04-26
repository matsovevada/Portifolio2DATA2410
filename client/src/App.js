import React from 'react'
import Header from './components/Header.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import AboutUs from './components/About.js'
import Register from './components/Register.js'
import FormMovie from './components/FormMovie.js'
import {Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
      <Route exact path='/' component={Home}/>
      <Route path='/about-us' component={AboutUs}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
      <Route path='/formMovie' component={FormMovie}/>
    </div>
  );
}

export default App;
