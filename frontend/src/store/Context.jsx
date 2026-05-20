import { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../config/api";

export const Context = createContext({
  availableMeals: null,
  mealsLoading: true,
  user: null,
  isLoad:0,
  users: null,
  usersLoading: true,
  orders: null,
  ordersLoading: true,
  editMeal: (mealId) => { },
  deleteOrder: () => { },
  deleteUser: () => { },
});

export function ContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [mealsLoading, setMealsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
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

    setMealsLoading(true);
    try {
      fetch(API.MEALS)
        .then((res) => res.json())
        .then((data) => {
          setAvailableMeals(data.meals);
          setMealsLoading(false);
        })
        .catch((err) => {
          setAvailableMeals([]);
          setMealsLoading(false);
          throw new Error(err?.message || "Failed to Fetched Available Meals");
        });
    } catch (error) {
      setMealsLoading(false);
      throw new Error(error?.message || "Failed to Fetched Available Meals");
    }

  }, [isLoad]);
  
  useEffect(() => {

    setOrdersLoading(true);
    try {
      fetch(API.ORDERS)
        .then(res => res.json())
        .then(data => {
          setOrders(data.orders)
          setOrdersLoading(false);
        })
        .catch(err => { 
          setOrdersLoading(false);
          throw new Error(err?.message || "Failed to Fetched User Orders") 
        })
    }
    catch (error) {
      setOrdersLoading(false);
      throw new Error(error?.message || "Failed to Fetched User Orders");
    }
  
    setUsersLoading(true);
    try {
      fetch(API.USERS)
        .then(res => res.json())
        .then(data => {
          setUsers(data.users)
          setUsersLoading(false);
        })
        .catch(err => { 
          setUsersLoading(false);
          throw new Error(err?.message || "Failed to Fetched Users") 
        })
    }
    catch (error) {
      setUsersLoading(false);
      throw new Error(error?.message || "Failed to Fetched Users");
    }

  },[])

  const cartContextValue = {
    availableMeals: availableMeals,
    mealsLoading,
    isLoad,
    setIsLoad,
    orders,
    ordersLoading,
    user,
    users,
    usersLoading,
    setUser,
    deleteOrder,
    deleteUser
  };

  return <Context.Provider value={cartContextValue}>{children}</Context.Provider>;
}
