import React, { useContext, useEffect, useRef, useState } from "react";
import { API } from '../config/api.js'
import { useNavigate } from "react-router-dom";
import { Context } from "../store/Context.jsx";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Loader from "./Loader.jsx";

function AvailableMeals() {

  const navigate = useNavigate();
  const searchRef = useRef("");
  const [showEditModel, setShowEditModel] = useState(false)
  const [showAddModel, setShowAddModel] = useState(false)
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState({})

  const { availableMeals, mealsLoading, setIsLoad } = useContext(Context);

  const searchedItems = availableMeals.filter(meal => meal?.name.toLowerCase().includes(search?.toLowerCase()))

  function ShowEditModel() {
    setShowEditModel(prev => !prev);
  }

  function ShowAddModel() {
    setShowAddModel(prev => !prev);
  }

  async function handleMealEdit(e) {
    e.preventDefault()

    const fd = new FormData(e.target);
    fd.append("_id", meal._id)

    const response = await fetch(API.EDITMEAL, {
      method: "PUT",
      body: fd
    });

    if (!response.ok) {
      console.log(response.json())
    } else {
      setIsLoad(prev => prev + 1);
    } 

    ShowEditModel();
  }

  async function handleMealAdd(e) {
    e.preventDefault()

    const fd = new FormData(e.target);

    const response = await fetch(API.ADDMEAL, {
      method: "POST",
      body: fd
    });

    const res = await response.json()

    if (!response.ok) {
      console.log(res)
    } else {
      setIsLoad(prev => prev + 1);
    }

    ShowAddModel();
  }

  async function handleDeleteMeal(_id) {

    const response = await fetch(API.DELETEMEAL, {
      method: "POST",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json", 
      },
    });

    const res = await response.json()

    if (!response.ok) {
      console.log(res)
    } else {
      setIsLoad(prev => prev + 1);
    }
  }

  if (mealsLoading) {
    return <Loader message="Fetching Menu Items..." />;
  }

  return <>
    <header className="availableHeader">
      <div className="searchSection">
        <input id="search" type="text" ref={searchRef} placeholder="Enter Meals Name For Search Them..." />
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
      <Button onClick={ShowAddModel}>+Add Meal</Button>
    </header>
    <ul className="meals">
      {Array.isArray(searchedItems) && searchedItems.map(meal => {
        return (
          <>
            <li key={meal._id} className="meal-item">
              <img src={meal.image} alt={meal.name} />
              <h3>{meal.name}</h3>
              <p className="meal-item-price">{meal.price}</p>
              <p className="meal-item-description">{meal.description}</p>
              <div className="meal-item-button-section">
                <button onClick={() => { ShowEditModel(), setMeal(meal) }} className="button">Edit</button>
                <button onClick={() => handleDeleteMeal(meal._id)} style={{ backgroundColor: "red" }} className="button">Delete</button>
              </div>
            </li>
          </>
        )
      })}
    </ul>
    {showEditModel && <dialog className="dialog" open>
      <form onSubmit={handleMealEdit}>
        <p>
          <Input label="Meal name" type="text" name="name" defaultValue={meal?.name} />
        </p>
        <p>
          <Input label="Meal price" type="number" name="price" defaultValue={meal?.price} />
        </p>
        <p>
          <label htmlFor="Meal Description">Meal Description</label>
          <textarea id="Meal Description" type="text" rows={4} defaultValue={meal?.description} name="description" />
        </p>
        <p>
          <Input label="Meal Image" type="file" name="image" />
        </p>
        <div className="modal-actions">
          <button type="button" className="text-button" onClick={ShowEditModel}>close</button>
          <Button type="submit">Edit</Button>
        </div>
      </form>
    </dialog>}
    {showAddModel && <dialog className="dialog" open>
      <form onSubmit={handleMealAdd}>
        <p>
          <Input label="Meal name" type="text" name="name" placeholder="Enter Your Meal Name..." />
        </p>
        <p>
          <Input label="Meal price" type="number" name="price" placeholder="Enter Your Meal Price..." />
        </p>
        <p>
          <label htmlFor="Meal Description">Meal Description</label>
          <textarea id="Meal Description" type="text" rows={4} placeholder="Enter Your Meal Description..." name="description" />
        </p>
        <p>
          <Input label="Meal Image" type="file" name="image" />
        </p>
        <div className="modal-actions">
          <button type="button" className="text-button" onClick={ShowAddModel}>close</button>
          <Button type="submit">Add Meal</Button>
        </div>
      </form>
    </dialog>}
  </>
}

export default AvailableMeals;
