import React, { useContext, useState } from 'react'
import {API} from '../config/api.js'
import Input from './Input';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/Context';

function ChangePass() {

    const { user } = useContext(Context)
    const navigate = useNavigate();

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const { oldPassword, newPassword, confPassword } = Object.fromEntries(fd.entries())

        const response = await fetch(API.CHANGE_PASS, {
            method: "POST",
            body: JSON.stringify({ oldPassword, newPassword, confPassword, email: user.email }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = await response.json()

        if (!response.ok) {
            setError(res.message);
        } else {
            setSuccess(res.message);
            setTimeout(() => {
                navigate("/meals")
            }, 2000)
        }
    }

    function handleSingin() {
        navigate("/")
    }

    return (
        <div className="singin">
            <header>
                <h1>Change Password</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <Input
                    label="oldPassword"
                    id="oldPassword"
                    type="text"
                    placeholder="Enter Your oldPassword"
                    name="oldPassword"
                    required
                />
                <Input
                    label="newPassword"
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    placeholder="Enter Your newPassword"
                    required
                />
                <Input
                    label="conform Password"
                    id="confPassword"
                    type="password"
                    name="confPassword"
                    placeholder="Enter Your newPassword"
                    required
                />
                {error && <p className='error'>{error}</p>}
                {success && <p className='success'>{success}</p>}
                <p className='modal-actions'>
                    <button type="button" className="text-button" onClick={() => navigate('/meals')}>Home</button>
                    <Button type="submit">Change Password</Button>
                </p>
            </form>
        </div>
    )
}

export default ChangePass