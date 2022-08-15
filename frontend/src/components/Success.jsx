import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "atomize";
import "./Success.css";
const Success = () => {
	const navigate = useNavigate();
	return (
		<div className="login">
			<div className="login__container">
				<div className="success__header">
					<Icon name="Success" color="green" size="50px" />

					<h1>Your order has been placed successfully!</h1>
				</div>
                

				<p>
					Thank you for placing your order with us. We will deliver your order to you within 2-3 days. You can check the status of your order in your account.
				</p>
				<button
					onClick={() => {
						navigate("/");
					}}
					className="login__registerButton">
					Continue Shopping
				</button>
				<button
					onClick={() => {
						navigate("/orders");
					}}
					className="login__registerButton">
					View Your Orders
				</button>
			</div>
		</div>
	);
};

export default Success;
