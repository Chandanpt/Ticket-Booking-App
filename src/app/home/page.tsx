import React from "react";
import Trending from "./trending";
import Advertisements from "./advertisements";
import { Box, Container } from "@mui/material";
import Movies from "./movies";
import Header from "../components/header";
import Footer from "../components/footer";

const Homepage = () => {


  return (
    <>
    <Header />
    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", height: "auto", backgroundColor: "white"}}>
    <Container sx={{margin: "100px 0"}}>
    <Trending />
    <Advertisements />
    <Movies />
    </Container>
    </Box>
    <Footer />
    </>
  );
};

export default Homepage;
