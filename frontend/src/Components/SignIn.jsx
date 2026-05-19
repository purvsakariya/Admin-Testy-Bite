import React, { useContext, useState } from 'react'
import Input from './Input.jsx';
import Button from './Button.jsx';
import {API} from '../config/api.js'
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/Context.jsx';

function SingIn() {

  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { setUser } = useContext(Context)
  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(fd.entries())

    const response = await fetch(API.SIGNIN, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const res = await response.json()

    if (!response.ok) {
      setError(res.message);
    } else {
      // localStorage.setItem('accessToken', res.accessToken);
      setUser({ ...res.user, accessToken: res.accessToken });
      setSuccess(res.message)
      setTimeout(()=>{
        navigate("/meals")
      },2000)
    }

    
  }

  function handleLogin() {
    navigate("/login")
  }

  return (
    <div className="singin">
      <h1>Sing In</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="username"
          id="username"
          name="username"
          type="text"
          placeholder="Enter Your Username"
          required
        />
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
          <button type='button' className="text-button" onClick={handleLogin}>Log In</button>
          <Button type="submit">Sign In</Button>
        </p>
      </form>
    </div>
  )
}

export default SingIn