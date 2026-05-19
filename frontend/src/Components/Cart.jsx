import React, { useContext } from "react";
import { Context } from "../store/Context";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const { items, addMeals, removeMeals } = useContext(Context);
  
  const cartTotalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  return (
    <div className="cart">
      <div className="modal">
        <h2>Your Cart</h2>
        {items.length === 0 && <h2>Add Some Meals Which You Like To eat!</h2>}
        <ul>
          {items.map((meal) => {
            const totalPrice = Math.round(meal.quantity * meal.price).toFixed(2);
            return (
              <li key={meal.id} className="cart-item">
                <p>
                  {meal.name} - {totalPrice}
                </p>
                <div className="cart-item-actions">
                  <Button onClick={() => removeMeals(meal.id)}>-</Button>
                  <p>{meal.quantity}</p>
                  <Button onClick={() => addMeals(meal)}>+</Button>
                </div>
              </li>
            );
          })}
          {items.length !== 0 && <p className="cart-total">${Math.round(cartTotalPrice).toFixed(2)}</p>}
          <p className="modal-actions">
            <button className="text-button" onClick={() => navigate("/meals")}>
              Close
            </button>
            {items.length !== 0 && <Button className="button" onClick={() => navigate("/checkout")}>
              Go to Checkout
            </Button>}
          </p>
        </ul>
      </div>
    </div>
  );
}

export default Cart;
