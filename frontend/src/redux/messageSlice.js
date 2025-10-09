
import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages : [],
    },
    reducers: {
        setMessages : (state,action) => {
            state.messages = action.payload;
        },
         
    }
});
export const {setMessages} = messageSlice.actions;
export const messageReducer = messageSlice.reducer;
export const messageSelector = (state) => state.message;