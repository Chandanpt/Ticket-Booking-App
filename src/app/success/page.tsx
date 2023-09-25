import React from "react";
import { Typography, Box, Button, Container } from "@mui/material";
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import success from "../../../public/assets/Group 34.png";

const Success = () => {
  return (
    <>
      <Header />
      <Box height="100%" margin="36px 0" padding="66px 0">
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" fontWeight="700" color="#333333">
            Movie is booked
          </Typography>
          <Image
            src={success}
            alt="Booking successful"
            style={{ margin: "16px 0" }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            margin="16px 0"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            deleniti. A, quasi dignissimos deserunt laborum quidem recusandae
            quibusdam.
          </Typography>
          <Button
            variant="outlined"
            sx={{ color: "#5A637A", border: "1px solid #5A637A" }}
          >
            Download ticket here
          </Button>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Success;
