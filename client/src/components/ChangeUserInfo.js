import React, {useState} from 'react'
import Input from './Input'
import Button from 'react-bootstrap/Button'

export default function ChangeUserInfo(){
    
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')

    function checkLength() {
        return email.length > 5 
        && firstname.length > 2 
        && lastname.length > 2
        && password.length > 6
        && address.length > 5
        && zipcode.length > 3
        && city.length > 2;
    }

    function editUser(e){
        e.preventDefault()
        const data = {
            '_id': '608fab497c53581e18fed043',
            'email': email,
            'password': password,
            'firstname': firstname,
            'lastname': lastname,
            'address': address,
            'zipcode': zipcode,
            'city': city
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:8080/user', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }

    return (
        <div>
            <h1>Change user info:</h1>
            <Input title='New First name' value={firstname} type='firstname' set={setFirstname}/>
            <Input title='New Last name' value={lastname} type='lastname' set={setLastname}/>
            <Input title='New Email' value={email} type='email' set={setEmail}/>
            <Input title='New Password' value={password} type='password' set={setPassword}/>
            <Input title='New Address' value={address} type='address' set={setAddress}/>
            <Input title='New Zipcode' value={zipcode} type='zipcode' set={setZipcode}/>
            <Input title='New City' value={city} type='city' set={setCity}/>
            <Button disabled={!checkLength()} onClick={editUser}>Change</Button>
        </div>
    )};
