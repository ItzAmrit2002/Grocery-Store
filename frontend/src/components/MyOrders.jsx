import React, { useEffect, useState } from 'react'
import "./MyOrders.css"
import {Text} from 'atomize'
import axios from 'axios'
import OrderProduct from './OrderProduct'
import useAuth from '../hooks/useAuth'
const MyOrders = () => {

    const {auth} = useAuth()
    const [result, setResult] = useState([]);
    useEffect(() => {
		getData();
		
	}, []);
    const getData = async () => {
		console.log(auth.uid)
		let res = await axios.post("http://localhost:8000/api/items/getorders", {user: auth.uid});
		console.log(res.data);
		setResult(res.data);
	};
  return (
    <div className="myorder">
			
				

				
                
					<Text tag="h2" textSize="heading" className="checkout__title">
						Your Orders {auth.uid? "" : " are Empty! Please Login to Continue"}
					</Text>
					{/* {basket.map((item)=> (
                <CheckoutProduct title={item.title} id={item.id} image={item.image} price={item.price} rating={item.rating}/>
            ))} */}
					{result.map((item) => {
						
					return(	<OrderProduct title={item.name} price={item.price} rating={item.rating} image={item.image}/>)

})} 
                    {/* <OrderProduct title={"Rice"} price={250} rating={5} image={"https://www.bigbasket.com/media/uploads/p/l/40041431_1-amul-taaza-fresh-toned-milk.jpg"}/> */}


				
			
			
		</div>
  )
}

export default MyOrders