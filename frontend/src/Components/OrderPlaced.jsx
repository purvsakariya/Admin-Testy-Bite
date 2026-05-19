import React, { useContext, useEffect, useState } from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/Context';

function OrderPlaced() {
  const navigate = useNavigate();

  const {items} = useContext(Context)

  const [time, setTime] = useState(10)

  useEffect(() => {

    const interval = setInterval(() => {
      setTime(prevTime => {
        if (prevTime <= 1) {
          return 10;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className='orderPlaced'>
        <main>
          <h1>Your Order Was Placed</h1>
          <h3>Your Order Will be delivered in {time} second{time !== 1 ? 's' : ''}</h3>
          <Button className="text-button" onClick={() => navigate('/meals')}>Close</Button>
        </main>
    </div>
  )
}

export default OrderPlaced
