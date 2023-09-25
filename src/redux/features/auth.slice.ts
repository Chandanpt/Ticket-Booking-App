import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticated: false,
};

if (typeof window !== "undefined") {
  const storedAuthStatus = localStorage.getItem("authStatus");
  if (storedAuthStatus) {
    initialState.isAuthenticated = JSON.parse(storedAuthStatus);
  }
}

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("authStatus");
      }
    },
    logIn: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("authStatus", JSON.stringify(action.payload));
      }
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
