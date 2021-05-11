import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Input from './Input.js'

export default function Register() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')


    function checkLength() {
        return firstname.length > 2 
        && lastname.length > 2
        && address.length > 5
        && zipcode.length > 3
        && city.length > 2;
    }


    function regUser(e){
        e.preventDefault()
        const data = {
            'firstname': firstname,
            'lastname': lastname,
            'address': address,
            'zipcode': zipcode,
            'city': city,
            'orderhistory': []}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
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

                window.location = '/'
    
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }


    return (
        <div className='Register'>
            <Form>
                <Input title='First name' value={firstname} type='firstname' set={setFirstname}/>
                <Input title='Last name' value={lastname} type='lastname' set={setLastname}/>
                <Input title='Address' value={address} type='address' set={setAddress}/>
                <Input title='Zipcode' value={zipcode} type='zipcode' set={setZipcode}/>
                <Input title='City' value={city} type='city' set={setCity}/>
                <Button variant='danger' block size='lg' type='submit' disabled={!checkLength()} onClick={regUser}
                >Register</Button>
            </Form>        
        </div>
    )};
