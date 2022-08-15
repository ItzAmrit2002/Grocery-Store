import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import useAuth from '../hooks/useAuth';
const Login = () => {
  const {setAuth} = useAuth()
  const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signIn = (event) => {
      event.preventDefault();

      axios.post('http://localhost:8000/api/user/login', {
        email: email,
        password: password
      })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            toast.success("Successfully logged in, redirecting to our store", {
              position: toast.POSITION.TOP_RIGHT
            })
            const name = res.data.name
            const email = res.data.email
            const uid = res.data._id
            console.log(uid)
            setAuth({name, email, uid})
            // localStorage.setItem('token', res.data.token)
            setTimeout(() => {
              navigate('/')
            },2000)
            // navigate('/')
          }
        }).catch(err => {
          toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT
          })
          console.log(err)
        }
        )
    }
  
  return (
    <div className='login'>
    <ToastContainer/>

    <div className='login__container'>
        <h1>Sign In</h1>

        <form>
            <h5>E-mail</h5>
            <input className="login__input" type="text" value={email} onChange={e => setEmail(e.target.value)} />

            <h5>Password</h5>
            <input className="login__input" type="password" value={password} onChange={e => setPassword(e.target.value)}/>

            <button type="submit" className='login__signInButton' onClick={signIn}>Sign In</button>
        </form>
        <p>
            By signing-in you agree to Our Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads.
        </p>
        <button onClick={()=> {navigate("/register")}} className='login__registerButton'>Create your Account</button>
    </div>
</div>
  )
}

export default Login