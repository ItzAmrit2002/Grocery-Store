import React, { useEffect, useState } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { Input, Icon, Button, Div, Text } from "atomize";
import axios from "axios";
import Subtotal from "./Subtotal";
import "./Cart.css";
import useAuth from "../hooks/useAuth";
const Cart = () => {
	const { auth, setAuth } = useAuth();
	useEffect(() => {
		getData();
		
	}, []);
	const [result, setResult] = useState([]);
	const [total, setTotal] = useState(0);
	var price = 0;
	const getData = async () => {
		console.log(auth.uid)
		let res = await axios.post("http://localhost:8000/api/items/getcart", {user: auth.uid});
		console.log(res.data);
		setResult(res.data);
	};


	
	return (
		<div className="checkout">
			<div className="checkout__left">
				

				<div>
                <Text tag="h3" textSize="title" >
						Hello, {auth.name? auth.name : "Guest"}
					</Text>
					<Text tag="h2" textSize="heading" className="checkout__title">
						Your Shopping Cart {auth.uid? "" : " is Empty! Please Login to Continue"}
					</Text>
					{/* {basket.map((item)=> (
                <CheckoutProduct title={item.title} id={item.id} image={item.image} price={item.price} rating={item.rating}/>
            ))} */}
					{result.map((item) => {
						price=price+item.price;
					return(	<CheckoutProduct key={item.id} title={item.name} id={item._id} image={item.image} price={item.price} rating={item.rating} func={getData}/>)

})}
				</div>
			</div>
			<div className="checkout__right">
				<Subtotal totalprice={price}/>
			</div>
		</div>
	);
};

export default Cart;
