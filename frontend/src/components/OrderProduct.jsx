import React from "react";
import "./OrderProduct.css";
import {Text} from 'atomize'
const OrderProduct = ({ image, title, price, rating }) => {
	return (
		<div className="orderProduct">
			<img className="orderProduct__image" src={image} />

			<div className="orderProduct__info">
				<p className="orderProduct__title">{title}</p>
				<p className="orderProduct__price">
					<small>₹</small>
					<strong>{price}</strong>
				</p>
				<div className="orderProduct__rating">
					{Array(rating)
						.fill()
						.map((_, i) => (
							<p>⭐</p>
						))}
				</div>
			</div>
			<div className="product__delivery">
            <Text tag="h2" textSize="title" textColor="success700">
						Arriving withing 2-3 business days
					</Text>
				<p>You will be notified once the product is out for delivery</p>
			</div>
		</div>
	);
};

export default OrderProduct;
