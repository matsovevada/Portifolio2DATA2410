import React, {useState} from 'react'
import LoginGoogle from './LoginGoogle'

export default function Login() {

    return (
        <div className='Login'>
            <p id='LoginText'>Click to log in with your Google account:</p>
            <LoginGoogle/>
        </div>
    )
}
