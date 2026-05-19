import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {API} from '../config/api.js'
import Cart from './Cart'
import { Context } from "../store/Context";
// import Button from "./Button";

function Header() {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false)
  const { user, setUser } = useContext(Context);
  const token = user?.accessToken;

  function ShowModel() {
    setShowModel(prev => !prev);
  }

  async function handleLogout() {
    const response = await fetch(API.LOGOUT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      }
    });

    const res = await response.json();

    if (response.ok) {
      setShowModel(false)
      setUser(null);
      // localStorage.removeItem('accessToken');
      navigate("/login");
    } else {
      console.error(res?.message || 'Logout failed:');
    }
  }

  return (
    <header id="main-header">
      <div className="title">
        <img src="https://res.cloudinary.com/dfypghcgt/image/upload/v1779007561/logo_wzqpze.jpg" alt="Website Logo" />
        <h1>ReactFood</h1>
      </div>
      {user && <button className="btn" onClick={ShowModel}>{user?.username[0].toUpperCase()}</button>}
      {showModel && <dialog className="userDetails" open>
        <div className="userPersonalDetails">
          <button className="btn" onClick={ShowModel}>{user?.username[0].toUpperCase()}</button>
          <div>
            <p>{user?.username}</p>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="userDetailsBtn">
          <button
            className="text-button"
            onClick={() => { navigate("/meals"); ShowModel() }}>
            Home</button>
          <button
            className="text-button"
            onClick={() => { navigate("/usersList"); ShowModel() }}>
            Users List
          </button>
          <button
            className="text-button"
            onClick={() => { navigate("/ordersList"); ShowModel() }}>
            Orders List
          </button>
          <button
            className="text-button"
            onClick={() => { navigate("/cart"); ShowModel() }}>
            View Cart
          </button>
          <button
            className="text-button"
            onClick={() => { navigate("/changePass"); ShowModel() }}>
            Change Password
          </button>
          <button
            className="text-button"
            onClick={ShowModel}>Close
          </button>
          <button
            style={{backgroundColor:"#6d0b0b"}}
            className="text-button"
            onClick={handleLogout}>Log Out
          </button>
        </div>
      </dialog>}
    </header>
  );
}

export default Header;
