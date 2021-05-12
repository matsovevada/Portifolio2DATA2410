import React, {useState} from 'react'
import LoginGoogle from './LoginGoogle'

export default function Login() {

    return (
        <div className='Login'>
            <span id='LoginText'>Click to log in with your Google account:</span>
            <LoginGoogle/>
        </div>
    )
}
