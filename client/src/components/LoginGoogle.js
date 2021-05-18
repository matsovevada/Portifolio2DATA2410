import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientId = '289860901302-1k9vd8gfqi5ebp27datvvspesg1g27i1.apps.googleusercontent.com'

const LoginGoogle = () => {

    const onSuccess = (res) => {

        // send token to backend
        let token = res.getAuthResponse().id_token;

        const inputData = {
            "token": token,
          }
        
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(inputData)
          };
        
         fetch('https://localhost:8080/user/login', requestOptions)
            .then(res => res.json()
            ).then(data => {
                
                if (data.userInDb) {
                    window.location = '/'
                }
                else {
                    window.location = '/register'
                }

            })
          
    };

    const onFailure = (res) => {
        console.log('Log in failed! response: ', res);
    };

    return (
        <div className='LoginBtnGoogleContainer' >
            <GoogleLogin id='LoginBtnGoogle'
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

export default LoginGoogle
