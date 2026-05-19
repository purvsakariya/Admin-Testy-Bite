import React, { useContext, useEffect, useRef, useState } from "react";
import { API } from '../config/api.js'
import { useNavigate } from "react-router-dom";
import { Context } from "../store/Context.jsx";
import AddItemBar from "./AddItemBar.jsx";
import Button from "./Button.jsx";

function AvailableMeals() {

  const navigate = useNavigate();
  const searchRef = useRef("");
  const [search, setSearch] = useState("");

  const { availableMeals, addMeals, items, removeMeals } = useContext(Context);

  const searchedItems = availableMeals.filter(meal => meal?.name.toLowerCase().includes(search?.toLowerCase()))

  return <>
    <div className="searchSection">
      <input id="search" type="text" ref={searchRef} />
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
    <ul className="meals">
      {Array.isArray(searchedItems) && searchedItems.map(meal => {
        return (
          <li key={meal.id} className="meal-item">
            <img src={meal.image} alt={meal.name} />
            <h3>{meal.name}</h3>
            <p className="meal-item-price">{meal.price}</p>
            <p className="meal-item-description">{meal.description}</p>
            <div className="meal-item-button-section">
              {meal.quantity !== 0 && <button onClick={() => removeMeals(meal.id)} className="button">-</button>}
              {meal.quantity !== 0 && <p>{meal.quantity}</p>}
              <button onClick={() => addMeals(meal)} className="button">{meal.quantity === 0 ? "Add To Card" : "+"}</button>
            </div>
          </li>
        )
      })}
      {!Array.isArray(availableMeals) && <li className="meal-item">No meals available.</li>}
    </ul>
    <div className="addItemCartDiv">
      {items.length !== 0 && <AddItemBar />}
    </div>
  </>
}

export default AvailableMeals;
