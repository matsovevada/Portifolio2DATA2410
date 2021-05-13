import React from 'react'
import LoginGoogle from './LoginGoogle'

//HTML for the login-page
export default function Login() {

    return (
        <div className='Login'>
            <p id='LoginText'>Click to log in with your Google account:</p>
            <LoginGoogle/>
        </div>
    )
}
