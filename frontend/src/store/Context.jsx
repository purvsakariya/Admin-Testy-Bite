import { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../config/api";

export const Context = createContext({
  availableMeals: null,
  user: null,
  orders: null,
  editMeal: (mealId) => { },
  deleteOrder: () => { },
});

export function ContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    try {
      fetch(API.MEALS)
        .then((res) => res.json())
        .then((data) => {
          setAvailableMeals(data.meals);
        })
        .catch((err) => {
          console.error("Fetch failed:", err.message);
          setAvailableMeals([]);
        });
    } catch (error) {
      throw new Error(error?.message || "Failed to Fetched Available Meals");
    }

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

  }, []);

  const cartContextValue = {
    availableMeals: availableMeals,
    orders,
    user,
    setUser,
    deleteOrder
  };

  return <Context.Provider value={cartContextValue}>{children}</Context.Provider>;
}
