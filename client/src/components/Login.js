import React, {useState} from 'react'
import LoginGoogle from './LoginGoogle'

export default function Login() {

    return (
        <div className='Login'>
            <h1>Log in with your Google account here</h1>
            <LoginGoogle/>
        </div>
    )
}
