import React, {useState, useEffect} from 'react'
import Input from './Input'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function ChangeUserInfo({user}){
    
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
      })

    function checkLength() {
        return firstname.length > 1 
        && lastname.length > 1
        && address.length > 5
        && zipcode.length > 3
        && city.length > 1;
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

        function deleteUser(){

            console.log(user._id)
        
            const requestOptions = {
                method: 'DELETE',
                credentials: "include"
            };
            fetch('http://localhost:8080/user/' + user._id, requestOptions)
        
            .catch(error => {
                console.error('There was an error!', error);
            });

            window.location = '/'
        }

    return (
        <div className='ChangeUserInfo'>
            <Form>
                <h1>Change user info:</h1>
                <Input title={user != null && user.firstname} value={firstname} type='firstname' set={setFirstname} placeholder={'new firstname'} errorText={'First name must have at least two characters'} setShowError={setShowErrorFirstname} showError={showErrorFirstname}/>
                <Input title={user != null && user.lastname} value={lastname} type='lastname' set={setLastname} placeholder={'new lastname'} errorText={'Last name must have at least two characters'} setShowError={setShowErrorLastname} showError={showErrorLastname}/>
                <Input title={user != null && user.address} value={address} type='address' set={setAddress} placeholder={'new address'} errorText={'Address must have at least six characters'} setShowError={setShowErrorAddress} showError={showErrorAddress}/>
                <Input title={user != null && user.zipcode} value={zipcode} type='zipcode' set={setZipcode} placeholder={'new zipcode'} errorText={'Zipcode name must have at least four characters'} setShowError={setShowErrorZipcode} showError={showErrorZipcode}/>
                <Input title={user != null && user.city} value={city} type='city' set={setCity} placeholder={'new city'} errorText={'City must have at least two characters'} setShowError={setShowErrorCity} showError={showErrorCity}/>
                <Button variant='secondary' disabled={!checkLength()} onClick={editUser}>Change</Button>
            </Form>
                <Button variant='danger' onClick={deleteUser}>Delete user</Button>
        </div>
    )};
