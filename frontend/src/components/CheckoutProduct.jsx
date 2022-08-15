import React from 'react'
import './CheckoutProduct.css'
import useAuth from '../hooks/useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CheckoutProduct = ({id, image, title, price, rating, func }) => {
    const navigate = useNavigate()
    const {auth} = useAuth()
    const removeFromCart = async () => {
        await axios.post('http://localhost:8000/api/items/deleteitem', {
            id: id,
            user: auth.uid
        })
        console.log(id)
        func()
        


    }
  return (
    <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image}/>

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className='checkoutProduct__price'>
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className='checkoutProduct__rating'>
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div>
                <button onClick={removeFromCart}>
                    Remove from Cart
                    {/* <ToastContainer/> */}
                    </button>
            </div>
        </div>
  )
}

export default CheckoutProduct