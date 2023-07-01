import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
	get_products_by_arrival,
	get_products_by_sold,
} from "../../redux/actions/products";
import { Banner, ProductArrival, ProductSold } from "../../components";

const Home = ({
	get_products_by_arrival,
	get_products_by_sold,
	products_arrival,
	products_sold,
}) => {
	useEffect(() => {
		window.scrollTo(0, 0);
		get_products_by_arrival();
		get_products_by_sold();
	}, []);

	return (
		<div className="text-blue-500">
			<Banner />
			<ProductArrival data={products_arrival} />
			<ProductSold data={products_sold} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	products_arrival: state.Products.products_arrival,
	products_sold: state.Products.products_sold,
});

export default connect(mapStateToProps, {
	get_products_by_arrival,
	get_products_by_sold,
})(Home);
