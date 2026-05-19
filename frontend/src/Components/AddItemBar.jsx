import React, { useContext } from 'react'
import { Context } from '../store/Context'
import Button from './Button'
import { use } from 'react'
import { UserContext } from '../store/UserProgressCtx'
import { useNavigate } from 'react-router-dom'

function AddItemBar() {
    const {items} = useContext(Context)
    const navigate = useNavigate();
    
    function showCart(){
      navigate('/cart')
    }

  return (
    <div className='addItemCart'>
      <h4>{items.length} items added</h4>
      <p>
      <Button onClick={() => showCart()}> 
        VIEW CART 
      </Button>
      <Button onClick={() => showCart()}> 
        <img src={'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/ChatbotAssets/Checkout_Cart'} alt="Cart Logo" />
      </Button>
      </p>
    </div>
  )
}

export default AddItemBar
