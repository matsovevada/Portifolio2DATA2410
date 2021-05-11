import React from 'react'
import Form from 'react-bootstrap/Form'
import '../index.css'

const errorLabelStyle = {
    "color": "red",
    "margin-left": "10px"
}

const Input = ({value, title, type, set, placeholder, errorText, setShowError, showError}) => {

    return (
        <>
            <Form.Group size="lg" controlId={type}>
                <Form.Label>{title}</Form.Label>
                {showError && <Form.Label style={errorLabelStyle}>{errorText}</Form.Label>}
                <Form.Control
                    type={type}
                    value={value}
                    onChange = {(e) => {
                        set(e.target.value)
                        setShowError(e.target.value)
                    }}
                    placeholder={placeholder} 
                />
            </Form.Group>
        </>
    )
}

export default Input
