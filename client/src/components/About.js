import React from 'react'

const contact = () => {

    const Url='https://localhost:8080/webShop'
    
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
            <h1 className='AboutTitle'>Portifolio 2 DATA2410</h1>
            <div className='MovieViewBox'>
                <div className='MovieViewInfo'>
                    <h2 className='MovieViewTitle'>NideoVova</h2>
                    <h3 className='MovieViewDesTitle'>Description:</h3>
                    <h3 className='MovieViewDescri'>Founded in 2021, NideoVova has become one of the biggest fake webshops still selling DVDs. The whole idea started from a task the founders got as a school assignment. The rest is history!</h3>
                    <h3 className='MovieViewGenre'>Genre: Company</h3>
                    <h3 className='MovieViewPrice'>Market value: 10b Blemflarcks</h3>
                </div>
            </div>
            <h1 className='AboutTitle'>Employees</h1>
            <div className='MovieViewBox'>
                <div className='MovieViewInfo'>
                    <h2 className='MovieViewTitle'>Zakaria Karlsen Tawfiq</h2>
                    <h3 className='MovieViewDesTitle'>Description:</h3>
                    <h3 className='MovieViewDescri'>Zaka is a great guy!</h3>
                    <h3 className='MovieViewGenre'>Genre: Mystery</h3>
                    <h3 className='MovieViewPrice'>Price: 200,-/h</h3>
                </div>
            </div>
            <div className='MovieViewBox'>
                <div className='MovieViewInfo'>
                    <h2 className='MovieViewTitle'>Peter Stjern Sund</h2>
                    <h3 className='MovieViewDesTitle'>Description:</h3>
                    <h3 className='MovieViewDescri'>Peter is a greater guy than Zaka!</h3>
                    <h3 className='MovieViewGenre'>Genre: Rom-Com</h3>
                    <h3 className='MovieViewPrice'>Price: 200,-/h</h3>
                </div>
            </div>
            <div className='MovieViewBox'>
                <div className='MovieViewInfo'>
                    <h2 className='MovieViewTitle'>Mats Ove Vada</h2>
                    <h3 className='MovieViewDesTitle'>Description:</h3>
                    <h3 className='MovieViewDescri'>--CLASSIFIED--</h3>
                    <h3 className='MovieViewGenre'>Genre: Horror</h3>
                    <h3 className='MovieViewPrice'>Price: --UNKNOWN--</h3>
                </div>
            </div>
        </div>
    )
}

export default contact
