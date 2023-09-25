"use client";

import React, { useState } from "react";
import ad1 from "../../../public/assets/Ads 1.png";
import ad2 from "../../../public/assets/Ads 2.png";
import ad3 from "../../../public/assets/Ads 3.png";
import Image from "next/image";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const images = [
  {
    label: "ad1",
    imgPath: ad1,
  },
  {
    label: "ad2",
    imgPath: ad2,
  },
  {
    label: "ad3",
    imgPath: ad3,
  },
];

function Advertisements() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="center"
        margin="50px 0"
        alignItems="center"
      >
        <Button
          size="small"
          onClick={handleBack}
          disabled={maxSteps === 1}
          sx={{
            mr: -2,
            // border: "1px solid black",
            height: {sm:"40px", xs:  "30px"},
            // width: "40px",
            aspectRatio: "1",
            minWidth: "unset",
            borderRadius: "50%",
            color: "black",
            backgroundColor: "white",
            boxShadow: "0px 4px 15px 0px #00000040"
          }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </Button>
        <Image
          src={images[activeStep].imgPath}
          alt={images[activeStep].label}
          style={{
            display: "block",
            maxWidth: "md",
            overflow: "hidden",
            width: "100%",
            height: "auto",
            minHeight: "80px"
          }}
        />
        <Button size="small" onClick={handleNext} disabled={maxSteps === 1}
        sx={{
          ml: -2,
          // border: "1px solid black",
          height: {sm:"40px", xs:  "30px"},
          aspectRatio: "1",
          minWidth: "unset",
          borderRadius: "50%",
          color: "black",
          backgroundColor: "white",
          boxShadow: "0px 4px 15px 0px #00000040"
        }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </Box>
    </Container>
  );
}

export default Advertisements;
