import React from 'react'
import Header from './components/Header.js'
import Login from './components/Login.js'
import Home from './components/Home.js'
import ContactUs from './components/Contact.js'
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
      <Route exact path='/' component={Home}/>
      <Route path='/contact-us' component={ContactUs}/>
      <Route path='/login' component={Login}/>
    </div>
  );
}

export default App;
