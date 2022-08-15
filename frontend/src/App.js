import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Store from "./components/Store";
import Login from "./components/Login";
import Register from "./components/Register";
import Success from "./components/Success";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Banner />
								<Store />
							</>
						}
					/>
					<Route path="/cart" element={<Cart />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/success" element={<Success />} />
					<Route path="/orders" element={<MyOrders />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
