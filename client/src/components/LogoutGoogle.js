import React from 'react'
import { GoogleLogout } from 'react-google-login'

const clientId = '289860901302-1k9vd8gfqi5ebp27datvvspesg1g27i1.apps.googleusercontent.com'

const LogoutGoogle = () => {

    const onSuccess = (res) => {
        console.log('Logout successful!');

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          };
        
         fetch('http://localhost:8080/user/logout', requestOptions)
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    )
}

export default LogoutGoogle
