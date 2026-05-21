import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API } from '../config/api.js'
import { Context } from "../store/Context";

function Header() {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false)
  const { user, setUser } = useContext(Context);

  function ShowModel() {
    setShowModel(prev => !prev);
  }

  async function handleLogout() {

    const token = localStorage?.getItem('token');

    try {
      const response = await fetch(API.LOGOUT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
      });

      const res = await response.json();

      if (!response.ok) {
        console.error(res?.message || 'Logout failed on server');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setShowModel(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate("/");
    }
  }

  return (
    <header id="main-header">
      <div className="title">
        <img src="https://res.cloudinary.com/dfypghcgt/image/upload/v1779007561/logo_wzqpze.jpg" alt="Website Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        {user && <><ul>
          <li>
            <NavLink
              to="/dashBoard"
              style={({ isActive }) => ({
                color: isActive ? "#ffab04" : "#f9dea7",
                fontWeight: isActive ? "bold" : "normal"
              })}
              className='NavLink'
            >DashBoard</NavLink>
          </li>
          <li>
            <NavLink
              to="/usersList"
              style={({ isActive }) => ({
                color: isActive ? "#ffab04" : "#f9dea7",
                fontWeight: isActive ? "bold" : "normal"
              })}
              className='NavLink'
            >Users</NavLink>
          </li>
          <li>
            <NavLink
              to="/ordersList"
              style={({ isActive }) => ({
                color: isActive ? "#ffab04" : "#f9dea7",
                fontWeight: isActive ? "bold" : "normal"
              })}
              className='NavLink'
            >Orders</NavLink>
          </li>
          <li>
            <NavLink
              to="/meals"
              style={({ isActive }) => ({
                color: isActive ? "#ffab04" : "#f9dea7",
                fontWeight: isActive ? "bold" : "normal"
              })}
              className='NavLink'
            >Menu</NavLink>
          </li>
        </ul>
          <button className="btn" onClick={ShowModel}>{user?.username?.[0]?.toUpperCase()}</button>
        </>
        }
        {showModel && <dialog className="userDetails" open>
          <div className="userPersonalDetails">
            <button className="btn" onClick={ShowModel}>{user?.username?.[0]?.toUpperCase()}</button>
            <div>
              <p>{user?.username}</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="userDetailsBtn">
            <button
              className="text-button"
              onClick={() => { navigate("/dashBoard"); ShowModel() }}>
              DashBoard</button>
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
              onClick={() => { navigate("/changePass"); ShowModel() }}>
              Change Password
            </button>
            <button
              className="text-button"
              onClick={ShowModel}>Close
            </button>
            <button
              style={{ backgroundColor: "#6d0b0b" }}
              className="text-button"
              onClick={handleLogout}>Log Out
            </button>
          </div>
        </dialog>}
      </nav>
    </header>
  );
}

export default Header;
