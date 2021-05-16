import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Input from './Input.js'

export default function Register() {

    //State for all inputs are used for input validating "on the fly"
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [city, setCity] = useState('')

    const [showErrorFirstname, setShowErrorFirstname] = useState(false)
    const [showErrorLastname, setShowErrorLastname] = useState(false)
    const [showErrorAddress, setShowErrorAddress] = useState(false)
    const [showErrorZipcode, setShowErrorZipcode] = useState(false)
    const [showErrorCity, setShowErrorCity] = useState(false)

    useEffect(() => {
        if (firstname.length < 2) setShowErrorFirstname(true)
        else setShowErrorFirstname(false)

        if (lastname.length < 2) setShowErrorLastname(true)
        else setShowErrorLastname(false)

        if (address.length < 6) setShowErrorAddress(true)
        else setShowErrorAddress(false)

        if (zipcode.length < 4) setShowErrorZipcode(true)
        else setShowErrorZipcode(false)

        if (city.length < 2) setShowErrorCity(true)
        else setShowErrorCity(false)
      }, [firstname.length, lastname.length, address.length, zipcode.length, city.length])

      function checkLength() {
        return firstname.length > 1 
        && lastname.length > 1
        && address.length > 5
        && zipcode.length > 3
        && city.length > 1;
    }
    
    // Gets validated input from the form on submit and passes data to backend to create user. Redirect to main page if succesful
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
                <Input title='First name' value={firstname} type='firstname' set={setFirstname} errorText={'First name must have at least two characters'} setShowError={setShowErrorFirstname} showError={showErrorFirstname}/>
                <Input title='Last name' value={lastname} type='lastname' set={setLastname} errorText={'Last name must have at least two characters'} setShowError={setShowErrorLastname} showError={showErrorLastname}/>
                <Input title='Address' value={address} type='address' set={setAddress} errorText={'Address must have at least six characters'} setShowError={setShowErrorAddress} showError={showErrorAddress}/>
                <Input title='Zipcode' value={zipcode} type='zipcode' set={setZipcode} errorText={'Zipcode name must have at least four characters'} setShowError={setShowErrorZipcode} showError={showErrorZipcode}/>
                <Input title='City' value={city} type='city' set={setCity} errorText={'City must have at least two characters'} setShowError={setShowErrorCity} showError={showErrorCity}/>
                <Button variant='danger' block size='lg' type='submit' disabled={!checkLength()} onClick={regUser}
                >Register</Button>
            </Form>        
        </div>
    )};
