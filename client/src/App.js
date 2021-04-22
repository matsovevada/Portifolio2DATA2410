import React from 'react'
import Header from './components/Header.js'
import Login from './components/login.js'
import Home from './components/home.js'
import ContactUs from './components/contact.js'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
      <Route path='/' component={Home}/>
      <Route path='/contact-us' component={ContactUs}/>
      <Route path='/login' component={Login}/>
    </div>
  );
}

export default App;
