import React, { useContext, useEffect, useRef, useState } from 'react'
import { API } from '../config/api.js'
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import searchLogo from '../../public/svg/search.svg'
import closeLogo from '../../public/svg/close.svg'

function UsersList() {
    const navigate = useNavigate();
    const searchRef = useRef("");
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("");

    const searchedUsers = users.filter(user => user?.username.toLowerCase().includes(search?.toLowerCase()))

    useEffect(() => {
        try {
            fetch(API.USERS)
                .then(res => res.json())
                .then(data => {
                    setUsers(data.users)
                    console.log(data)
                })
                .catch(err => { throw new Error(err?.message || "Failed to Fetched Users") })
        }
        catch (error) {
            throw new Error(error?.message || "Failed to Fetched Users");
        }

    }, [])

    function handleDelete(orderId) {
        const result = confirm("Are You Sure of User Deleting!")

        if (!result) {
            return;
        }

        try {
            fetch(API.DELETEUSER, {
                method: "POST",
                body: JSON.stringify({ _id: orderId }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => { throw new Error(err?.message || "Failed to Deleting User") })

            setUsers(prevUsers => prevUsers?.filter(user => user._id !== orderId))
        } catch (error) {
            throw new Error(error?.message || "Failed to Fetched Users");
        }
    }

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
            {searchRef.current.value !== "" ? <ul className='ordersHistory'>
                {searchedUsers?.map((user, index) => <li key={user._id}>
                    <div className='userHistoryNum'>
                        <h1>FullName: {user.username}</h1>
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                        <p>City: {user.city}</p>
                        <p>PinCode: {user.pinCode}</p>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </div>
                </li>)}
            </ul >
                :
                <ul className='ordersHistory'>
                    {users?.map((user) => <li key={user._id}>
                        <div className='userHistoryNum'>
                            <h1>Username: {user.username}</h1>
                            <p>Email: {user.email}</p>
                            <p>CreatedTime: {user.createdAt}</p>
                            <p>UpdatedTime: {user.updatedAt}</p>
                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </div>
                    </li>)}
                </ul>
            }
            {
                users.length === 0 && <div className='ordersHistoryError'>
                    <h2>Please Order Something...</h2>
                    <Button onClick={() => navigate('/meals')}>Home</Button>
                </div>
            }
        </>
    )
}

export default UsersList
