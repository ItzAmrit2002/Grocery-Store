import React, { useEffect } from 'react'
import './Navbar.css'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import StorefrontIcon from '@mui/icons-material/Storefront';
// import { useAnimation, motion } from "framer-motion";
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import { useInView } from "react-intersection-observer";
import {Link} from 'react-scroll'
import { useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../hooks/useAuth';

// const squareVariants = {
//     visible: { opacity: 1, y: 0, transition: {delay:0.2, duration: 1 } },
//     hidden: { opacity: 0, y: "-100%"}
//   };
const Navbar = () => {

    // const controls = useAnimation();
    // const [ref, inView] = useInView();
    // useEffect(() => {
    //   if (inView) {
    //     controls.start("visible");
    //   }
    //   if(!inView)
    //   {
    //     controls.start("hidden");
    //   }
    // }, [controls, inView]);
    const {auth, setAuth} = useAuth()
    const navigate = useNavigate()
  return (
      <nav>
        
    <div className='navbar'

    >
        <span className='navbar__resume'>
            <h4 className='portfolio'>Grocery Store</h4>
        </span>

        <div className='navbar__container'>
            <ul>
                <li onClick={()=> {
                    navigate('/')
                }}>
                <StorefrontIcon />
                    <h4 >Store</h4>
                    {/* <div className='bar'></div> */}
                </li>
                {!auth.email && <li onClick={()=> {
                    navigate('/login')
                }}>
                <LoginIcon />
                <h4 >SignIn</h4>
                    {/* <div className='bar'></div> */}
                </li>}
                {!auth.email && <li onClick={()=> {
                    navigate('/register')
                }}>
                    <HowToRegIcon />
                <h4 >SignUp</h4>
                    {/* <div className='bar'></div> */}
                </li>}
                {auth.email && <li onClick={()=> {
                    navigate('/orders')
                }}>
                    <AccountBoxIcon/>
                <h4 >My Orders</h4>
                    {/* <div className='bar'></div> */}
                </li>}
                {auth.email && <li onClick={()=> {
                    setAuth({})
                    navigate('/login')
                }}>
                    <LogoutIcon/>
                <h4 >Logout</h4>
                    {/* <div className='bar'></div> */}
                </li>}
                
            </ul>
        </div>

        <span onClick={()=> {
            navigate('/cart')
        }}>
            
        <h4 className='c_button'><ShoppingCartIcon/>Cart</h4>
            
        </span>
    </div>
    </nav>
  )
}

export default Navbar