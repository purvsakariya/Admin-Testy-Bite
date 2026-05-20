import React, { useContext } from 'react'
import { Context } from '../store/Context'

function DashBoard() {
  const {orders} = useContext(Context)
  return (
    <div className='dashBoard'>
    <h1>DashBoard</h1>
    <ul>
      <li>
        <h3>Total Order:</h3>
        <h4>{orders?.length}</h4>
      </li>
      <li>
        <h3>Total Users:</h3>
         <h4>50</h4>
      </li>
      <li>
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
