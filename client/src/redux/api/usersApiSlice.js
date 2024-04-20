import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

// Define the user authentication API endpoint
// endpoint --> http://localhost:3000/api/v1/users/auth
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a "login" endpoint, which is a mutation (modifying data)
    login: builder.mutation({
      // Define how to make a request for the "login" endpoint
      query: (data) => ({
        url: `${USERS_URL}/auth`, // The URL for user authentication
        method: "POST",
        body: data, // Body contains the login credentials(username and password) sent by the client
      }),
    }),
  }),
});

export const { useLoginMutation } = userApiSlice;
