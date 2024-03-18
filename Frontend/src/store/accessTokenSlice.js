import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   token: JSON.parse(localStorage.getItem("Access Token")) || ""
}

const AccessTokenSlice = createSlice({
    name: "accessToken",
    initialState,
    reducers: {
        storeATLS: (state, action) => {
            localStorage.setItem("Access Token", JSON.stringify(action.payload));
            state.token = JSON.parse(localStorage.getItem("Access Token"))
        },
        deleteATLS: (state, action) => {
            localStorage.removeItem("Access Token");
        }
    }
})

export const {storeATLS, deleteATLS} = AccessTokenSlice.actions
export default AccessTokenSlice.reducer
