import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button.jsx';
import Loader from './Loader.jsx';
import { Context } from '../store/Context.jsx';

function OrderHistory() {
    const navigate = useNavigate();
    const searchRef = useRef("");
    const [search, setSearch] = useState("");
    const { orders, ordersLoading, deleteOrder } = useContext(Context);

    if (ordersLoading) {
        return <Loader message="Fetching User Orders..." />;
    }

    const searchedUsers = orders.filter(user => user?.fullName.toLowerCase().includes(search?.toLowerCase()));

    function handleDelete(orderId) {
        const result = confirm("Are You Sure of Order Deleting!");
        if (!result) {
            return;
        }
        deleteOrder(orderId);
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
            {searchedUsers && searchedUsers.length > 0 && <ul className='ordersHistory'>
                {searchedUsers?.map((user, index) => <ul key={user._id}>
                    <div className='userHistoryNum'>
                        <div className='orderHistoryNum'>
                            <h1>FullName: {user.fullName}</h1>
                            <h1>Meals: {user?.items?.length}</h1>
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
                                    <p className="meal-item-price">Price: ₹{item.price}</p>
                                    {item.quantity !== 1 && <p className="meal-item-price">TotalPrice: ₹{item.price * item.quantity}</p>}
                                </div>
                                <p className="meal-item-description">{item.description}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </li>)
                        }
                    </div>
                </ul>)}
            </ul>}
            {orders.length === 0 && <div className='ordersHistoryError'>
                <h2>No orders placed yet.</h2>
                <Button onClick={() => navigate('/')}>Home</Button>
            </div>}
        </>
    );
}

export default OrderHistory;
