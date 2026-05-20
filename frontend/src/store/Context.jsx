import { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../config/api";

export const Context = createContext({
  availableMeals: null,
  user: null,
  isLoad:0,
  users: null,
  orders: null,
  editMeal: (mealId) => { },
  deleteOrder: () => { },
  deleteUser: () => { },
});

export function ContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoad,setIsLoad] = useState(0)

  function deleteOrder(orderId) {
    try {
      fetch(API.DELETEORDER, {
        method: "POST",
        body: JSON.stringify({ _id: orderId }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err?.message || "Failed to Deleting Order") })

      setOrders(prevUsers => prevUsers.filter(user => user._id !== orderId))

    } catch (error) {
      throw new Error(error?.message || "Failed to Fetched User Orders");
    }
  }

  function deleteUser(userId) {
    const result = confirm("Are You Sure of User Deleting!")

    if (!result) {
      return;
    }

    try {
      fetch(API.DELETEUSER, {
        method: "POST",
        body: JSON.stringify({ _id: userId }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .catch(err => { throw new Error(err?.message || "Failed to Deleting User") })

      setUsers(prevUsers => prevUsers?.filter(user => user._id !== userId))
    } catch (error) {
      throw new Error(error?.message || "Failed to Fetched Users");
    }
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setUser(userObj);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }

    try {
      fetch(API.MEALS)
        .then((res) => res.json())
        .then((data) => {
          setAvailableMeals(data.meals);
        })
        .catch((err) => {
          setAvailableMeals([]);
          throw new Error(error?.message || "Failed to Fetched Available Meals");
        });
    } catch (error) {
      throw new Error(error?.message || "Failed to Fetched Available Meals");
    }

  }, [isLoad]);
  
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
  
    try {
      fetch(API.USERS)
        .then(res => res.json())
        .then(data => setUsers(data.users))
        .catch(err => { throw new Error(err?.message || "Failed to Fetched Users") })
    }
    catch (error) {
      throw new Error(error?.message || "Failed to Fetched Users");
    }

  },[])

  const cartContextValue = {
    availableMeals: availableMeals,
    isLoad,
    setIsLoad,
    orders,
    user,
    users,
    setUser,
    deleteOrder,
    deleteUser
  };

  return <Context.Provider value={cartContextValue}>{children}</Context.Provider>;
}
