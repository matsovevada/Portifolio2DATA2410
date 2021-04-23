import React, {useState} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function checkLength() {
        return email.length > 0 && password.length > 0;
    }


    return (
        <div className='Login'>
            <Form>
                <Form.Group size='lg' controlId='email'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size='lg' type='submit' disabled={!checkLength()}>Login</Button>
            </Form>
        </div>
    )
}
