import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Navbar, Footer } from "../components";
import { check_authenticated, load_user, refresh } from "../redux/actions/auth";
import { get_items, get_total, get_item_total } from "../redux/actions/cart";

const Layout = ({
	check_authenticated,
	load_user,
	refresh,
	get_item_total,
	get_items,
	get_total,
}) => {
	useEffect(() => {
		refresh();
		check_authenticated();
		load_user();
		get_total();
		get_items();
		get_item_total();
	}, []);

	return (
		<div>
			<Navbar />
			<ToastContainer autoClose={50000} />
			<Outlet />
			<Footer />
		</div>
	);
};

export default connect(null, {
	check_authenticated,
	load_user,
	refresh,
	get_items,
	get_item_total,
	get_total,
})(Layout);
