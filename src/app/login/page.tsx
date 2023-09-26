"use client"

import React, { useState, useEffect } from "react";
import hall from "../../../public/assets/Picture.png";
import Image from "next/image";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { logIn } from "@/redux/features/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

const Login = () => {
  const [credentials, setCredentials] = useState({
    number: "",
    password: "",
  });
  const [isNumberError, setIsNumberError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem("authStatus");
    if (storedAuthStatus === "true") {
      dispatch(logIn(true));
      router.push("/home");
    }
  }, [dispatch, router]);

  const numberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    const truncatedValue = numericValue.slice(0, 10);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      number: truncatedValue,
    }));
    setIsNumberError(false);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const truncatedValue = e.target.value.slice(0, 10);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      password: truncatedValue,
    }));
    setIsPasswordError(false);
  };

  const loginHandler = () => {
    if (credentials.number === "9574408872" && credentials.password === "Pt123") {
      dispatch(logIn(true));
      localStorage.setItem("authStatus", "true");
      router.push("/");
    } else {
      if (credentials.number !== "9574408872") {
        setIsNumberError(true);
      }
      if (credentials.password !== "Pt123") {
        setIsPasswordError(true);
      }
    }
  }; 

  return (
    <div>
      <Image
        src={hall}
        alt="Theatre hall"
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          zIndex: "-2",
        }}
      />
      <Container
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Box sx={{ backgroundColor: "white", padding: {md: "50px 100px 60px 48px", sm: "48px", xs: "16px"} }}>
          <Typography variant="h3" sx={{ margin: {sm: "16px 0", xs: "8px"} }}>
            TIX ID
          </Typography>
          <TextField
            fullWidth
            id="standard-basic"
            type="tel"
            label="Phone Number"
            variant="standard"
            sx={{ margin: "16px 0" }}
            placeholder="+91 | Enter phone number here"
            value={credentials.number}
            onChange={numberHandler}
            name="number"
            error={isNumberError}
            helperText={isNumberError ? "Incorrect phone number" : ""}
            InputProps={{
              startAdornment:
                credentials.number ? (
                  <InputAdornment position="start">+91 |</InputAdornment>
                ) : undefined,
            }}
          />
          <TextField
            fullWidth
            id="standard-basic"
            type="password"
            label="Password"
            variant="standard"
            sx={{ margin: " 16px 0" }}
            placeholder="Enter password here"
            value={credentials.password}
            onChange={passwordHandler}
            name="password"
            error={isPasswordError}
            helperText={isPasswordError ? "Incorrect password" : ""}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ margin: " 50px 0 30px 0", backgroundColor: "#1A2C50" }}
            onClick={loginHandler}
          >
            Login
          </Button>
          <Typography variant="body2" align="center" margin="10px 0">
            Don&apos;t have an account?
          </Typography>
          <Button fullWidth variant="outlined">
            Create account
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
