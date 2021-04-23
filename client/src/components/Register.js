import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register() {

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

    // function parseReg(firstName, lastName, email, address, zipcode, city, password){
    //     let user={
    //         'email': email,
    //         'password': password,
    //         'firstname': firstName,
    //         'lastname': lastName,
    //         'address': address,
    //         'zipcode': zipcode,
    //         'city': city
    //     }
    //     return user;
    // }

    function regUser(firstName, lastName, email, address, zipcode, city, password){

        let user={
            'email': email,
            'password': password,
            'firstname': firstName,
            'lastname': lastName,
            'address': address,
            'zipcode': zipcode,
            'city': city
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
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
    
                this.setState({ postId: data.id })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    // function regUser(user){
    //     const Url='http://localhost:8080/user'
    
    //     const othePram={
    //         headers:{
    //            'content-type':'application/json; charset=UTF-8'
    //         },
    //         data: JSON.stringify(user),
    //         method:'POST'
    //     }

    //     fetch(Url, othePram).then(data=>{return data.json()}).then(res=>{console.log(res)}).catch(error=>console.log(error))
    // }

    return (
        <div className='Register'>
            <Form>
                <Form.Group size='lg' controlId='firstname'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="lastname">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="lastname"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size='lg' controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        autoFocus
                        type="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="zipcode">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control
                        type="zipcode"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <Button block size='lg' type='submit' disabled={!checkLength()} onClick={regUser(firstname, lastname, email, address, zipcode, city, password)}>Register</Button>
            </Form>        
        </div>
    )
}
