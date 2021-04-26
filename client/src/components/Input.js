import React from 'react'
import Form from 'react-bootstrap/Form'

const Input = ({value, title, type, set}) => {
    return (
        <>
            <Form.Group size="lg" controlId={type}>
                <Form.Label>{title}</Form.Label>
                <Form.Control
                    type={type}
                    value={value}
                    onChange={(e) => set(e.target.value)}
                />
            </Form.Group>
        </>
    )
}

export default Input
