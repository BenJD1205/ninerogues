import React from "react";
import { connect } from "react-redux";
import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({
// 	component: Component,
// 	auth: { isAuthenticated, loading },
// 	...rest
// }) => {
// 	console.log(Component);
// 	return isAuthenticated ? (
// 		<Route {...rest} element={<Component />} />
// 	) : (
// 		<Navigate to="/login" replace />
// 	);
// };

const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
	return isAuthenticated ? children : <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
