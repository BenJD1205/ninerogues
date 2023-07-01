import {
	SIGNUP_SUCCESS,
	SINGUP_FAIL,
	ACTIVATION_FAIL,
	ACTIVATION_SUCCESS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	SET_AUTH_LOADING,
	REMOVE_AUTH_LOADING,
	USER_LOADED_FAIL,
	USER_LOADED_SUCCESS,
	AUTHENTICATED_SUCCESS,
	AUTHENTICATED_FAIL,
	REFRESH_SUCCESS,
	REFRESH_FAIL,
	RESET_PASSWORD_FAIL,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_CONFIRM_FAIL,
	RESET_PASSWORD_CONFIRM_SUCCESS,
	LOGOUT,
} from "../actions/types";

const initialState = {
	access: localStorage.getItem("access"),
	refresh: localStorage.getItem("refresh"),
	isAuthenticated: null,
	user: null,
	loading: false,
};

export default function auth(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_AUTH_LOADING:
			return {
				...state,
				loading: true,
			};
		case REMOVE_AUTH_LOADING:
			return {
				...state,
				loading: false,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("access", payload.access);
			localStorage.setItem("refresh", payload.refresh);
			return {
				...state,
				isAuthenticated: true,
				access: localStorage.getItem("access"),
				refresh: localStorage.getItem("refresh"),
			};
		case USER_LOADED_SUCCESS:
			return {
				...state,
				user: payload,
			};
		case USER_LOADED_FAIL:
			return {
				...state,
				user: null,
			};
		case AUTHENTICATED_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
			};
		case AUTHENTICATED_FAIL:
			localStorage.removeItem("access");
			localStorage.removeItem("refresh");
			return {
				...state,
				isAuthenticated: false,
				access: null,
				refresh: null,
			};
		case REFRESH_SUCCESS:
			localStorage.setItem("access", payload.access);
			return {
				...state,
				access: localStorage.getItem("access"),
			};
		case ACTIVATION_SUCCESS:
		case RESET_PASSWORD_SUCCESS:
		case RESET_PASSWORD_FAIL:
		case RESET_PASSWORD_CONFIRM_SUCCESS:
		case RESET_PASSWORD_CONFIRM_FAIL:
		case ACTIVATION_FAIL:
			return {
				...state,
			};
		case SIGNUP_SUCCESS:
		case SINGUP_FAIL:
		case LOGIN_FAIL:
		case REFRESH_FAIL:
		case LOGOUT:
			localStorage.removeItem("access");
			localStorage.removeItem("refresh");
			return {
				...state,
				access: null,
				refresh: null,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
}
