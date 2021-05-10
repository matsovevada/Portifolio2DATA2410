import React, {useState} from 'react'
import LoginGoogle from './LoginGoogle'
import LogoutGoogle from './LogoutGoogle'



export default function Login() {

    return (
        <div className='Login'>
            <LoginGoogle/>
            <LogoutGoogle/>
        </div>
    )
}
