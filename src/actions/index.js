import api from '../utils/api'

export const registerRequest = (payload) => ({
	type: 'REGISTER_REQUEST',
	payload,
});


export const addPost = (payload) => ({
	type: 'ADD_POST',
	payload,
});

export const updateRequest = (payload) => ({
	type: 'UPDATE_USER',
	payload,
});

export const addCategory = (payload) => ({
	type: 'ADD_CATEGORY',
	payload,
});

export const loginRequest = (payload) => ({
	type: 'LOGIN_REQUEST',
	payload,
});

export const logoutRequest = (payload) => ({
	type: 'LOGOUT_REQUEST',
	payload,
});

export const setError = (payload) => ({
	type: 'SET_ERROR',
	payload,
});

export const registerUser = (payload) => {
	return async (dispatch) => {
		try {
			const data = await api.createUser(payload);
			if (!data.error) {
				await dispatch(registerRequest(data));
			} else {
				dispatch(setError({ error: "Bad Request" }));
			}
		} catch (error) {
			dispatch(setError(error))
		}
	}
};

export const loginUser = (payload) => {
	return async (dispatch) => {
		try {
			const data = await api.singIn(payload);
			if (!data.error) {
				document.cookie = `token=${data.token}`
				document.cookie = `email=${data.user.email}`;
				document.cookie = `name=${data.user.name}`;
				document.cookie = `id=${data.user.id}`;
				await dispatch(loginRequest(data.user));
			} else {
				dispatch(setError({ error: "Bad Request" }));
			}
		} catch (error) {
			dispatch(setError(error))
		}
	};
};

export const userUpdate = (user, token) => {
	return async (dispatch) => {
		try {
			const data = await api.updateUser(user, token);
			if (!data.error) {
				document.cookie = `email=${data.message.email}`;
				document.cookie = `name=${data.message.name}`;
				document.cookie = `id=${data.message.id}`;
				await dispatch(updateRequest(data.message));
			} else {
				dispatch(setError({ error: "Bad Request" }));
			}
		} catch (error) {
			dispatch(setError(error))
		}
	};
};