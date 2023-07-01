import { Fragment, useState, useEffect } from "react";
import { Popover, Transition, Menu } from "@headlessui/react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
	ChartBarIcon,
	CursorClickIcon,
	MenuIcon,
	ShieldCheckIcon,
	ViewGridIcon,
	XIcon,
	ShoppingCartIcon,
} from "@heroicons/react/outline";
import Alert from "../Alert";
import SearchBox from "./SearchBox";
import { logout } from "../../redux/actions/auth";
import { get_categories } from "../../redux/actions/categories";
import { get_search_products } from "../../redux/actions/products";

const solutions = [
	{
		name: "Analytics",
		description:
			"Get a better understanding of where your traffic is coming from.",
		href: "#",
		icon: ChartBarIcon,
	},
	{
		name: "Engagement",
		description: "Speak directly to your customers in a more meaningful way.",
		href: "#",
		icon: CursorClickIcon,
	},
	{
		name: "Security",
		description: "Your customers' data will be safe and secure.",
		href: "#",
		icon: ShieldCheckIcon,
	},
	{
		name: "Integrations",
		description: "Connect with third-party tools that you're already using.",
		href: "#",
		icon: ViewGridIcon,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Navbar({
	isAuthenticated,
	user,
	logout,
	get_categories,
	categories,
	get_search_products,
	total_items,
}) {
	const [redirect, setRedirect] = useState(false);
	const [formData, setFormData] = useState({
		category_id: 0,
		search: "",
	});
	const { category_id, search } = formData;
	const navigate = useNavigate();
	const location = useLocation();

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		get_search_products(search, category_id);
		navigate("/search");
	};

	useEffect(() => {
		get_categories();
	}, []);

	const logoutHandler = () => {
		logout();
		setRedirect(true);
	};

	if (redirect) {
		window.location.reload(false);
		navigate("/");
	}

	const authLinks = (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex justify-center w-full rounded-full text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
					<span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
						<svg
							className="h-full w-full text-gray-300"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
						</svg>
					</span>
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<Link
									to="/"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}
								>
									Account settings
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Link
									to="/"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}
								>
									Support
								</Link>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<Link
									to="/"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}
								>
									License
								</Link>
							)}
						</Menu.Item>
						<form method="POST" action="#">
							<Menu.Item>
								{({ active }) => (
									<button
										onClick={logoutHandler}
										className={classNames(
											active ? "bg-gray-100 text-gray-900" : "text-gray-700",
											"block w-full text-left px-4 py-2 text-sm"
										)}
									>
										Sign out
									</button>
								)}
							</Menu.Item>
						</form>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);

	const guestLinks = (
		<Fragment>
			<Link
				to="/login"
				className="text-base font-medium text-gray-500 hover:text-gray-900"
			>
				Sign in
			</Link>
			<Link
				to="/register"
				className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
			>
				Sign up
			</Link>
		</Fragment>
	);

	return (
		<Fragment>
			<Popover className="relative bg-white">
				<div
					className="absolute inset-0 shadow z-30 pointer-events-none"
					aria-hidden="true"
				/>
				<div className="relative z-20">
					<div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">
						<div>
							<Link to="/" className="flex">
								<span className="sr-only">Workflow</span>
								<img
									className="h-8 w-auto sm:h-10"
									src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
									alt=""
								/>
							</Link>
						</div>
						<div className="-mr-2 -my-2 md:hidden">
							<Link
								to="/cart"
								className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
							>
								<ShoppingCartIcon className="h-6 w-6" />
								<span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">
									{total_items} +
								</span>
							</Link>
							<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
								<span className="sr-only">Open menu</span>
								<MenuIcon className="h-6 w-6" aria-hidden="true" />
							</Popover.Button>
						</div>
						<div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
							<Popover.Group as="nav" className="flex space-x-10">
								<NavLink
									to="/shop"
									className={
										window.location.pathname === "/search"
											? "mt-2 text-indigo-500 text-base font-medium hover:text-gray-900"
											: "mt-2 text-base font-medium text-gray-500 hover:text-gray-900 color"
									}
								>
									Shop
								</NavLink>
								{location.pathname === "/search" ? (
									<></>
								) : (
									<SearchBox
										search={search}
										onChange={onChange}
										onSubmit={onSubmit}
										categories={categories}
									/>
								)}
							</Popover.Group>
							<div className="flex items-center md:ml-12">
								<Link to="/cart">
									<ShoppingCartIcon className="h-8 w-8 text-gray-200 cursor-pointer text-gray-300 mr-4" />
									<span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-1 text-center">
										{total_items} +
									</span>
								</Link>
								{isAuthenticated ? authLinks : guestLinks}
							</div>
						</div>
					</div>
				</div>

				<Transition
					as={Fragment}
					enter="duration-200 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95"
				>
					<Popover.Panel
						focus
						className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
					>
						<div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
							<div className="pt-5 pb-6 px-5 sm:pb-8">
								<div className="flex items-center justify-between">
									<div>
										<img
											className="h-8 w-auto"
											src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
											alt="Workflow"
										/>
									</div>
									<div className="-mr-2">
										<Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
											<span className="sr-only">Close menu</span>
											<XIcon className="h-6 w-6" aria-hidden="true" />
										</Popover.Button>
									</div>
								</div>
								<div className="mt-6 sm:mt-8">
									<nav>
										<div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
											{solutions.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
												>
													<div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
														<item.icon className="h-6 w-6" aria-hidden="true" />
													</div>
													<div className="ml-4 text-base font-medium text-gray-900">
														{item.name}
													</div>
												</a>
											))}
										</div>
										<div className="mt-8 text-base">
											<a
												href="#"
												className="font-medium text-indigo-600 hover:text-indigo-500"
											>
												{" "}
												View all products <span aria-hidden="true">&rarr;</span>
											</a>
										</div>
									</nav>
								</div>
							</div>
							<div className="py-6 px-5">
								<div className="grid grid-cols-2 gap-4">
									<a
										href="#"
										className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Pricing
									</a>

									<a
										href="#"
										className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Docs
									</a>

									<a
										href="#"
										className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Company
									</a>

									<a
										href="#"
										className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Resources
									</a>

									<a
										href="#"
										className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Blog
									</a>

									<a
										href="#"
										className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700"
									>
										Contact Sales
									</a>
								</div>
								<div className="mt-6">
									<Link
										to="/login"
										className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
									>
										Sign up
									</Link>
									<p className="mt-6 text-center text-base font-medium text-gray-500">
										Existing customer?{" "}
										<Link
											to="/register"
											className="text-indigo-600 hover:text-indigo-500"
										>
											Sign in
										</Link>
									</p>
								</div>
							</div>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
			<Alert />
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	user: state.auth.user,
	categories: state.categories.categories,
	total_items: state.carts.total_items,
});

export default connect(mapStateToProps, {
	logout,
	get_categories,
	get_search_products,
})(Navbar);
