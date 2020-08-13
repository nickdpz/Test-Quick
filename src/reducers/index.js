const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_REQUEST':
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT_REQUEST':
			return {
				...state,
				user: action.payload,
			};
		case 'ADD_POST':
			return {
				...state,
				post: action.payload,
			};
		case 'ADD_CATEGORY':
			return {
				...state,
				categories: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;


