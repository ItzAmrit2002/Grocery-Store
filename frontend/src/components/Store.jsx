import React, { useEffect, useState } from "react";
import { Input, Icon, Button, Div, Text } from "atomize";
import Product from "./Product";
import { Dropdown, Anchor } from "atomize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Store.css";
import useAuth from "../hooks/useAuth";
const menuList = (
	<Div>
		{[
			"All",
			"Cereals And Breakfast Foods",
			"Frozen Foods",
			"Dairy, Cheeze and Eggs",
		].map((name, index) => (
			<Anchor d="block" p={{ y: "0.25rem" }}>
				{name}
			</Anchor>
		))}
	</Div>
);

const Store = () => {
	const [result, setResult] = useState([]);
	useEffect(() => {
		getData();
	}, []);
	const getData = async () => {
		let res = await axios.get("http://localhost:8000/api/items/getitems");
		console.log(res.data);
		setResult(res.data);
	};
	const { auth } = useAuth();
	useEffect(() => {
		if (auth.email) {
			toast.success(`Welcome to our store, ${auth.name}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	}, []);
	const [isOpen, setIsOpen] = React.useState(false);
	return (
		<div className="store">
			<ToastContainer />
			<div className="text">
				<Text tag="h2" textSize="display1" m={{ b: "0.5rem" }}>
					Products In Our Store
				</Text>
			</div>

			<div className="store__top">
				<div className="store__search">
					<Input
						placeholder="Search any product"
						suffix={
							<Button
								pos="absolute"
								onClick={(e) => console.log(e.target.value)}
								bg="info700"
								hoverBg="info800"
								w="3rem"
								top="0"
								right="0"
								rounded={{ r: "md" }}>
								<Icon
									name="Search"
									size="20px"
									color="white"
									cursor="pointer"
								/>
							</Button>
						}
					/>
				</div>
				<div className="store__menu">
					<Dropdown
						isOpen={isOpen}
						onClick={() => setIsOpen(!isOpen)}
						menu={menuList}>
						Select Category
					</Dropdown>
				</div>
			</div>
			<div className="store__container">
				{result.map((item, index) => (
					
						<Product name={item.name} price={item.price} rating={item.rating} image={item.image} id={item._id}/>
						
					
				))}
				{/* <div className="store__row">
					<Product />
					<Product />
					<Product />
				</div>
				<div className="store__row">
					<Product />
					<Product />
					<Product />
				</div>
				<div className="store__row">
					<Product />
					<Product />
					<Product />
				</div> */}
			</div>
		</div>
	);
};

export default Store;
