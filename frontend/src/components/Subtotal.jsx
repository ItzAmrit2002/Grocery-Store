import React from 'react'
import CurrencyFormat from 'react-currency-format'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./Subtotal.css"
const Subtotal = ({totalprice}) => {
    const navigate = useNavigate()
    const {auth} = useAuth()
    const buyorder = () => {
        if(totalprice<=0){
            alert("You can't buy an empty cart")
        }
        else{
            axios.post('http://localhost:8000/api/items/buyorder', {
                user: auth.uid,
              })
                .then((res) => {
                  console.log(res)
                  if (res.status === 200) {
                   navigate('/success')
                  }
                }).catch(err => {
                //   toast.error(err.response.data, {
                //     position: toast.POSITION.TOP_RIGHT
                //   })
                  console.log(err)
                }
                )
        }
    }
  return (
    <div className='subtotal'>
    <CurrencyFormat
        renderText={(value) => (
            <>
            <p>
                Subtotal (3 items): <strong>{value}</strong>
            </p>
            <small className='subtotal__gift'>
                <input type="checkbox"/> Check this box for contactless delivery
            </small>
            </>
        )}
        decimalScale={2}
        value={totalprice}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
    />
    
    <button onClick={buyorder}>Place Buy Order</button>
    {/* <ToastContainer /> */}
        </div>
  )
}

export default Subtotal