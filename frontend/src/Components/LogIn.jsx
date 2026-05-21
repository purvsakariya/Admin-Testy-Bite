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

        const emailMetched = email === import.meta.env.VITE_EMAIL_NAME
        const passwordMetched = password === import.meta.env.VITE_EMAIL_PASSWORD

        if (!emailMetched) {
            setError("Email InValid");
        } else if(!passwordMetched) {
            setError("Password InValid");
        } else {
            const token = import.meta.env.VITE_ACCESS_TOKEN;
            localStorage.setItem('token', token);
            setSuccess("Login SuccessFully!")
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