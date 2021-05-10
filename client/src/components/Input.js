import React from 'react'
import Form from 'react-bootstrap/Form'
import '../index.css'

const Input = ({value, title, type, set, defaultValue}) => {

    

    return (
        <>
            <Form.Group size="lg" controlId={type}>
                <Form.Label>{title}</Form.Label>
                <Form.Control
                    type={type}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                    defaultValue={defaultValue} 
                />
            </Form.Group>
        </>
    )
}

export default Input
