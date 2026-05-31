import React, { useContext, useEffect, useRef, useState } from 'react'
import { API } from '../config/api.js'
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import { Context } from '../store/Context.jsx';
import Loader from './Loader.jsx';

function UsersList() {
    const navigate = useNavigate();
    const searchRef = useRef("");
    const [search, setSearch] = useState("");
    const { users, deleteUser, usersLoading, orders } = useContext(Context);

    if (usersLoading) {
        return <Loader message="Fetching Active Users..." />;
    }

    const searchedUsers = users.filter(user => user?.username.toLowerCase().includes(search?.toLowerCase()))

    return (
        <>
            <div className="searchSection">
                <input id="search" type="text" ref={searchRef} placeholder='Enter Username...' />
                {!search ?
                    <img
                        onClick={() => setSearch(searchRef.current.value)}
                        className="searchLogo"
                        src="https://res.cloudinary.com/dfypghcgt/image/upload/v1779184874/search_j1mzhc.svg"
                        alt="Search Logo" />
                    :
                    <img
                        onClick={() => { setSearch(""); searchRef.current.value = "" }}
                        className="searchLogo"
                        src="https://res.cloudinary.com/dfypghcgt/image/upload/v1779184839/close_sgfb9e.svg"
                        alt="Search Logo" />
                }
            </div>
            {searchedUsers && <ul className='ordersHistory'>
                {searchedUsers?.map((user, index) => {
                    const findUser = orders.filter(order => order.email === user.email);
                    return <li key={user._id}>
                        <div className='userHistoryNum'>
                            <h1>FullName: {user.username}</h1>
                            <p>Email: {user.email}</p>
                            {findUser[0]?.address && <p>Address: {findUser[0].address}</p>}
                            {findUser[0]?.city && <p>City: {findUser[0].city}</p>}
                            {findUser[0]?.pincode && <p>Pincode: {findUser[0].pincode}</p>}
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </div>
                    </li>
                })}
            </ul>}
            {
                users.length === 0 && <div className='ordersHistoryError'>
                    <h2>No users registered yet.</h2>
                    <Button onClick={() => navigate('/')}>Home</Button>
                </div>
            }
        </>
    )
}

export default UsersList
