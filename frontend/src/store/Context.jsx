import { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../config/api";

export const Context = createContext({
  items: [],
  availableMeals: null,
  user: null,
  addMeals: (selectedMeal) => {},
  removeMeals: (id) => {},
  clearCart:() => {},
});

function CartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const exitingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );

    const updatedItems = [...state.items];

    if (exitingItemIndex > -1) {
      const exitingItem = state.items[exitingItemIndex];
      const updatedItem = {
        ...exitingItem,
        quantity: exitingItem.quantity + 1,
      };
      updatedItems[exitingItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const exitingItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const exitingItem = state.items[exitingItemIndex];
    const updatedItems = [...state.items];

    if (exitingItem.quantity === 1) {
      updatedItems.splice(exitingItemIndex, 1);
    } else {
      const updatedItem = {
        ...exitingItem,
        quantity: exitingItem.quantity - 1,
      };
      updatedItems[exitingItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function ContextProvider({ children }) {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [user, setUser] = useState(null);

  const [cart, dispatchCartAction] = useReducer(CartReducer, {
    items: [],
  });

  function addMeals(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
    const index = availableMeals.findIndex(meal => meal.id === item.id)
    availableMeals[index].quantity += 1;
  }

  function removeMeals(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
    const index = availableMeals.findIndex(meal => meal.id === id)
    availableMeals[index].quantity -= 1;
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
    availableMeals.map(meal => {
      meal.quantity = 0;
    })
    
  }

  useEffect(() => {
    fetch(API.MEALS)
      .then((res) => res.json())
      .then((data) => {
        setAvailableMeals(data.meals);
      })
      .catch((err) => {
        console.error("Fetch failed:", err.message);
        setAvailableMeals([]);
      });
  }, []);

  const cartContextValue = {
    items: cart.items,
    availableMeals: availableMeals,
    user,
    setUser,
    addMeals,
    removeMeals,
    clearCart,
  };

  return <Context.Provider value={cartContextValue}>{children}</Context.Provider>;
}
