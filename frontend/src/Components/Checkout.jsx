import React, { useContext } from "react";
import Input from "./Input";
import {API} from '../config/api.js'
import Button from "./Button";
import { Context } from "../store/Context";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  let { items, user , clearCart } = useContext(Context);
  
  const cartTotalPrice = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  async function handleSubmit(e) {
    e.preventDefault()

    const fd = new FormData(e.target)
    const formData = Object.fromEntries(fd.entries());

    const order = {
      fullName: formData.fullName,
      email: user?.email,
      address: formData.address,
      city: formData.city,
      pinCode: formData.pinCode,
      items
    }

    try {
      const res = await fetch(API.PLACE_ORDER, {
        method: "POST",
        body: JSON.stringify({ order }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()
      // console.log(data)
      if (!res.ok) {
        throw new Error(data?.message || 'Failed To Create Order')
      }

      clearCart();
      navigate('/orderplaced')

    } catch (error) {
      // console.error('Order submission error:', error.message)
      throw error
    }
  }

  return (
    <div className="cart">
      <div className="modal">
        <h2>Checkout</h2>
        <p>Total Amount: ${Math.round(cartTotalPrice).toFixed(2)}</p>
        <form className="control" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            id="name"
            name="fullName"
            type="text"
            placeholder="Full Name"
            required
          />
          <Input
            label="E-Mail Address"
            id="email"
            type="email"
            name="email"
            placeholder="E-Mail Address"
            value={user?.email}
            disabled
          />
          <Input label="Address" name="address" id="street" type="text" placeholder="Address" required />
          <div className="control-row">
            <div>
              <Input
                label="Pin Code"
                id="postal-code"
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                min={6}
                required
              />
            </div>
            <div>
              <Input label="City" id="city" name="city" type="text" placeholder="City" required />
            </div>
          </div>
          <p className="modal-actions">
            <button className="text-button" onClick={() => navigate("/meals")}>
              Close
            </button>
            <Button type="submit">Submit Order</Button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
