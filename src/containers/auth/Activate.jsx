import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { activate } from "../../redux/actions/auth";

const Activate = ({ activate, loading }) => {
	const params = useParams();

	const [activated, setActivated] = useState(false);

	const activate_account = () => {
		const uid = params.uid;
		const token = params.token;
		activate(uid, token);
		setActivated(true);
	};

	if (activated && !loading) {
		return <Navigate to="/" />;
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				{loading ? (
					<button className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						<Circles type="Oval" color="#fff" width={20} height={20} />
					</button>
				) : (
					<button
						onClick={activate_account}
						className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Activate Account
					</button>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	loading: state.auth.loading,
});

export default connect(mapStateToProps, { activate })(Activate);
