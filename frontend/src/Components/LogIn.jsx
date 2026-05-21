import React, { useContext, useState } from 'react'
import { API } from '../config/api.js'
import Input from './Input';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/Context';

function Login() {

    const { setUser } = useContext(Context)
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const { email, password } = Object.fromEntries(fd.entries())

        const response = await fetch(API.LOGIN, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = await response.json()

        if (!response.ok) {
            setError(res.message);
        } else {
            const token = res.accessToken;
            localStorage.setItem('token', token);       
            localStorage.setItem('user', JSON.stringify(res.user));
            setUser(res.user);
            setSuccess(res.message)
            navigate("/dashBoard")
        }
    }

    return (
        <div className="singin">
            <header>
                <h1>Log In</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <Input
                    label="E-Mail Address"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="E-Mail Address"
                    required
                />
                <Input
                    label="password"
                    id="password"
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    required
                />
                {error && <p className='error'>{error}</p>}
                {success && <p className='success'>{success}</p>}
                <p className='modal-actions'>
                    <Button type="submit">Log In</Button>
                </p>
            </form>
        </div>
    )
}

export default Login