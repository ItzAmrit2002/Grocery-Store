import React from "react";
import "./Product.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Product = ({ name, price, rating, image, id }) => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();
	const addToBasket = async () => {
		if (!auth.email) {
			navigate("/login");
		} else {
            console.log(auth.uid)
			await axios
				.post("http://localhost:8000/api/items/addtocart", {
					user: auth.uid,
					name: name,
                    price: price,
                    image: image,
                    rating: rating,
                    status: "cart"
				})
				.then((res) => {
					console.log(res);
					if (res.status === 201) {
						toast.success("Successfully added to cart", {
							position: toast.POSITION.TOP_RIGHT,
						});
						
						// localStorage.setItem('token', res.data.token)
						
						// navigate('/')
					}
				})
				.catch((err) => {
					toast.error(err.response.data, {
						position: toast.POSITION.TOP_RIGHT,
					});
					console.log(err);
				});
		}
	};
	return (
		<div className="product">
			<div className="product__info">
				<p>{name}</p>
				<p className="product__price">
					<small>₹</small>
					<strong>{price}</strong>
				</p>
				<div className="product__rating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>⭐</p>
						))}
				</div>
			</div>
			<img src={image} />

			<button onClick={addToBasket}>
				Add to Cart
				<ToastContainer />
			</button>
		</div>
	);
};

export default Product;
