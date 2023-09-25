"use client"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography, Container, Grid, Button, useTheme, Card, CardContent, CardMedia } from "@mui/material";
import Image from "next/image";
import spiderman from "../../../public/assets/Spiderman_ No Way Home.png";
import yowis from "../../../public/assets/Yowis Ben.png";
import data from "../../../public/json/data.json";
import { useRouter } from "next/navigation";
import { setSelectedMovieId } from "@/redux/features/ticket.slice";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const Trending = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = Math.ceil(data.movies.length / 2);

  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  const scheduleHandler = (id: number) => {
    dispatch(setSelectedMovieId(id));
    router.push(`/schedule/${id}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button
          size="small"
          onClick={handleBack}
          disabled={maxSteps === 1}
          sx={{
            mr: -2,
            height: { sm: "40px", xs: "30px" },
            aspectRatio: "1",
            minWidth: "unset",
            borderRadius: "50%",
            color: "black",
            backgroundColor: "white",
            boxShadow: "0px 4px 15px 0px #00000040",
          }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </Button>
        <Grid container spacing={2}>
          {data.movies.slice(activeStep * 2, (activeStep + 1) * 2).map((item) => (
            <Grid item sm={6} xs={12} key={item.id}>
               <Image
                src={item.imageUrl}
                alt={item.title}
                width={400}
                height={600}
                layout="responsive"
                style={{borderRadius: "8px", marginBottom: "16px", cursor: "pointer"}}
                onClick={() => scheduleHandler(item.id)}
              />
                <Typography variant="h5" component="div" align="center" fontWeight="700" margin="16px 0">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {item.description}
                </Typography>
            </Grid>
          ))}
        </Grid>
        <Button
          size="small"
          onClick={handleNext}
          disabled={maxSteps === 1}
          sx={{
            ml: -2,
            height: { sm: "40px", xs: "30px" },
            aspectRatio: "1",
            minWidth: "unset",
            borderRadius: "50%",
            color: "black",
            backgroundColor: "white",
            boxShadow: "0px 4px 15px 0px #00000040",
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
};

export default Trending;
