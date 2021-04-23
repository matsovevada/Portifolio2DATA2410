import React from 'react'

const contact = () => {

    const Url='http://localhost:8080/webShop'
    
    const othePram={
        headers:{
            'content-type':'application/json; charset=UTF-8'
        },
        method:'POST'
    }

    fetch(Url, othePram)
    .then(data=>{return data.json()})
    .then(res=>{console.log(res)})
    .catch(error=>console.log(error))

    return (
        <div>
            <h1>Hello Contacts</h1>
        </div>
    )
}

export default contact
