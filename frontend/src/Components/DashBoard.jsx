import React, { useContext } from 'react'
import { Context } from '../store/Context'
import { useNavigate } from 'react-router-dom'

function DashBoard() {
  const navigate = useNavigate();
  const {orders} = useContext(Context)
  return (
    <div className='dashBoard'>
    <h1>DashBoard</h1>
    <ul>
      <li onClick={() => navigate("/ordersList")}>
        <h3>Total Order:</h3>
        <h4>{orders?.length}</h4>
      </li>
      <li onClick={() => navigate("/usersList")}>
        <h3>Total Users:</h3>
         <h4>50</h4>
      </li>
      <li onClick={() => navigate("/meals")}>
        <h3>Available Meals:</h3>
         <h4>10</h4>
      </li>
      <li>
        <h3>Total Revenue:</h3>
         <h4>₹12,000</h4>
      </li>
    </ul>
    </div>
  )
}

export default DashBoard
