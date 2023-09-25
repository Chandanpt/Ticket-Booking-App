import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./features/auth.slice";
import ticketReducer from "./features/ticket.slice";

export const 
store = configureStore({
    reducer: {
        auth: authreducer,
        ticket: ticketReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;