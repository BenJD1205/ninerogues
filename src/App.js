import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	Errors,
	Home,
	Login,
	SignUp,
	Activate,
	ResetPassword,
	ResetPasswordConfirm,
	Shop,
	ProductDetail,
	Search,
	Cart,
	Checkout,
} from "./containers";
import Layout from "./hocs/Layout";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/cart" element={<Cart />} />
					<Route
						path="/checkout"
						element={
							<PrivateRoute>
								<Checkout />
							</PrivateRoute>
						}
					/>
					{/*Authentication*/}
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<SignUp />} />
					<Route path="/search" element={<Search />} />
					<Route path="/product/:productId" element={<ProductDetail />} />
					<Route path="/activate/:uid/:token" element={<Activate />} />
					<Route path="/reset_password" element={<ResetPassword />} />
					<Route
						exact
						path="/password/reset/confirm/:uid/:token"
						element={<ResetPasswordConfirm />}
					/>
					<Route path="*" element={<Errors />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
