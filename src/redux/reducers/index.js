import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import categories from "./categories";
import products from "./products";
import carts from "./cart";
import shipping from "./shipping";

export default combineReducers({
	auth,
	alert,
	categories,
	Products: products,
	carts: carts,
	shipping,
});
