import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { API } from '../config/api.js'
import { Context } from "../store/Context";

function Header() {
  const navigate = useNavigate();
  const [showModel, setShowModel] = useState(false)

  const token = localStorage?.getItem('token');
  
  function ShowModel() {
    setShowModel(prev => !prev);
  }

  async function handleLogout() {

    const token = localStorage?.getItem('token');

    setShowModel(false);
    localStorage.removeItem('token');
    navigate("/");

  }

  return (
    <header id="main-header">
      <div className="title">
        <img src="https://res.cloudinary.com/dfypghcgt/image/upload/v1779007561/logo_wzqpze.jpg" alt="Website Logo" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        {token && <><ul>
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
          <button className="btn" onClick={ShowModel}>P</button>
        </>
        }
        {showModel && <dialog className="userDetails" open>
          <div className="userPersonalDetails">
            <button className="btn" onClick={ShowModel}>P</button>
            <div>
              <p>Purv Sakariya</p>
              <p>purv@gmail.com</p>
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
