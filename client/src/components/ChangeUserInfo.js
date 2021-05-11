import React, {useState} from 'react'
import Input from './Input'
import Button from 'react-bootstrap/Button'

export default function ChangeUserInfo({user}){
    
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

    function editUser(e){
        e.preventDefault()
        const data = {
            'firstname': firstname,
            'lastname': lastname,
            'address': address,
            'zipcode': zipcode,
            'city': city
        }

        const requestOptions = {
            method: 'PUT',
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

                window.location = '/changeUserInfo'
    
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }

    return (
        <div>
            <h1>Change user info:</h1>
            <Input title={user != null && user.firstname} value={firstname} type='firstname' set={setFirstname} placeholder={'new firstname'}/>
            <Input title={user != null && user.lastname} value={lastname} type='lastname' set={setLastname} placeholder={'new lastname'}/>
            <Input title={user != null && user.address} value={address} type='address' set={setAddress} placeholder={'new address'}/>
            <Input title={user != null && user.zipcode} value={zipcode} type='zipcode' set={setZipcode} placeholder={'new zipcode'}/>
            <Input title={user != null && user.city} value={city} type='city' set={setCity} placeholder={'new city'}/>
            <Button disabled={!checkLength()} onClick={editUser}>Change</Button>
        </div>
    )};
