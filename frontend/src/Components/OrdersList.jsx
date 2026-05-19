import React, { useContext, useEffect, useRef, useState } from 'react'
import { API } from '../config/api.js'
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';

function OrderHistory() {

    const navigate = useNavigate();
    const searchRef = useRef("");
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState("");

    let searchedUsers = orders.filter(user => user?.fullName.toLowerCase().includes(search?.toLowerCase()))

    useEffect(() => {
        try {
            fetch(API.ORDERS)
                .then(res => res.json())
                .then(data => {
                    setOrders(data.orders)
                })
                .catch(err => { throw new Error(err?.message || "Failed to Fetched User Orders") })
        }
        catch (error) {
            throw new Error(error?.message || "Failed to Fetched User Orders");
        }

    }, [])

    function handleDelete(orderId) {
        const result = confirm("Are You Sure of Order Deleting!")

        if (!result) {
            return;
        }

        try {
            fetch(API.DELETEORDER, {
                method: "POST",
                body: JSON.stringify({ _id: orderId }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => { throw new Error(err?.message || "Failed to Deleting Order") })

            setOrders(prevUsers => prevUsers.filter(user => user._id !== orderId))
        } catch (error) {
            throw new Error(error?.message || "Failed to Fetched User Orders");
        }
    }

    return (
        <>
            <div className="searchSection">
                <input id="search" type="text" ref={searchRef} placeholder='Enter FullName...' />
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
            {searchRef.current !== "" ? <ul className='ordersHistory'>
                {searchedUsers?.map((user, index) => <ul key={user._id}>
                    <div className='userHistoryNum'>
                        <div className='orderHistoryNum'>
                            <h1>FullName: {user.fullName}</h1>
                            <h1>Meals: {searchedUsers[index]?.items?.length}</h1>
                        </div>
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                        <p>City: {user.city}</p>
                        <p>PinCode: {user.pinCode}</p>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </div>
                    <div className='orderHistory2'>
                        {user?.items.map(item => <li key={item._id} className="orderHistory-item">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <div className='orderHistory-item-price'>
                                    <p className="meal-item-price">Price: {item.price}</p>
                                    {item.quantity !== 1 && <p className="meal-item-price">TotalPrice: {item.price * item.quantity}</p>}
                                </div>
                                <p className="meal-item-description">{item.description}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </li>)
                        }
                    </div>
                </ul>)}
            </ul>
                :
                // <ul className='ordersHistory'>
                //     {orders?.map((user, index) => <ul key={user._id}>
                //         <div className='userHistoryNum'>
                //             <div className='orderHistoryNum'>
                //                 <h1>FullName: {user.fullName}</h1>
                //                 <h1>Meals: {searchedUsers[index]?.items?.length}</h1>
                //             </div>
                //             <p>Email: {user.email}</p>
                //             <p>Address: {user.address}</p>
                //             <p>City: {user.city}</p>
                //             <p>PinCode: {user.pinCode}</p>
                //             <button onClick={() => handleDelete(user._id)}>Delete</button>
                //         </div>
                //         <div className='orderHistory2'>
                //             {user?.items.map(item => <li key={item._id} className="orderHistory-item">
                //                 <img src={item.image} alt={item.name} />
                //                 <div>
                //                     <h3>{item.name}</h3>
                //                     <div className='orderHistory-item-price'>
                //                         <p className="meal-item-price">Price: {item.price}</p>
                //                         {item.quantity !== 1 && <p className="meal-item-price">TotalPrice: {item.price * item.quantity}</p>}
                //                     </div>
                //                     <p className="meal-item-description">{item.description}</p>
                //                     <p>Quantity: {item.quantity}</p>
                //                 </div>
                //             </li>)
                //             }
                //         </div>
                //     </ul>)}
                // </ul>
                ""
            }
            {orders.length === 0 && <div className='ordersHistoryError'>
                <h2>Please Order Something...</h2>
                <Button onClick={() => navigate('/meals')}>Home</Button>
            </div>}
        </>
    )
}

export default OrderHistory
