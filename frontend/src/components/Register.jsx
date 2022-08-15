import React, { useState } from 'react'
import "./Register.css"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const Register = () => {
  const navigate = useNavigate()
  const register =  (event) => {
    event.preventDefault();
        //const data = new FormData(event.currentTarget);
        // const fname = data.get('fname')
        // const lname = data.get('lname')
        // const email = data.get('email')
        // const password = data.get('password')
        axios.post('http://localhost:8000/api/user/register', {
            name:name,
            email: email,
            password: password})
            .then((res) => {
                console.log(res)
                if(res.status === 201)
                {
                  
                  toast.success("Successfully registered, redirecting to login", {
                    position: toast.POSITION.TOP_RIGHT
                  })
                  setTimeout(() => {
                    navigate('/login')
                  }, 2000);
                   
                }
            })
            .catch(err =>{
              toast.error(err.response.data, {
                position: toast.POSITION.TOP_RIGHT
              })
               console.log(err)
            })
  }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
  return (
    <div className='register'>
    

    <div className='register__container'>
      <ToastContainer/>
        <h1>Sign Up</h1>

        <form>
        <h5>Name</h5>
            <input className="register__input" type="text" value={name} onChange={e => setName(e.target.value)}/>


            <h5>E-mail</h5>
            <input className="register__input" type="text" value={email} onChange={e => setEmail(e.target.value)} />

            <h5>Password</h5>
            <input className="register__input" type="password" value={password} onChange={e => setPassword(e.target.value)}/>

            <button type='submit' className='register__signInButton' onClick={register}>Register Your Account</button>
        </form>
        <p>
            By Registering you agree to Our Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads.
        </p>
        
    </div>
</div>
  )
}

export default Register