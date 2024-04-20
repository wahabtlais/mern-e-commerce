import authReducer from "./features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userReducer from "./user/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

const store = configureStore({
	reducer: {
		user: userReducer,
	},

	middleware: (getDefaultMiddleWare) =>
		getDefaultMiddleWare({
			serializableCheck: false,
		}),
});

export default store;
