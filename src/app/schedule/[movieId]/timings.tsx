"use client"

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Typography, Box, Grid, Button, Card, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  setSelectedMovieId,
  setSelectedTheatre,
  setSelectedClass,
  setSelectedTiming,
} from "@/redux/features/ticket.slice";
import Image from "next/image";
import star from "../../../../public/assets/Star.png";
import data from "../../../../public/json/data.json";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
import { addDays, format, isSameDay } from "date-fns";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

SwiperCore.use([Navigation, Pagination]);

const Timings = () => {
  const params = useParams();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const dispatch = useDispatch();
  const today = new Date();
  const slides = [];

  for (let i = 0; i < 20; i++) {
    const date = addDays(today, i);
    const day = format(date, "EEE");
    const formattedDate = format(date, "d MMM");

    slides.push(
      <SwiperSlide key={i}>
        <Card
          sx={{
            aspectRatio: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "0px",
            backgroundColor: isSameDay(date, today) ? "#1A2C50" : "white",
            border: isSameDay(date, today) ? "none" : "1px solid #5A637A",
            height: "80px"
          }}
        >
          <Typography variant="body2" color="#5A637A" fontWeight="600">
            {formattedDate}
          </Typography>
          <Typography variant="body2" sx={{
            color: isSameDay(date, today) ? "white" : "#333333",
            fontWeight: "900",
          }}>{day}</Typography>
        </Card>
      </SwiperSlide>
    );
  }

  const maxSteps = slides.length;
  const maxSlidesPerView = 5;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? maxSteps - 1 : prevActiveStep - 1
    );
  };

  const selectedTheatre = useSelector(
    (state: RootState) => state.ticket.selectedTheatre
  );
  const selectedMovieId = useSelector(
    (state: RootState) => state.ticket.selectedMovieId
  );
  const selectedClass = useSelector(
    (state: RootState) => state.ticket.selectedClass
  );
  const selectedTiming = useSelector(
    (state: RootState) => state.ticket.selectedTiming
  );

  const paramsMovieId = Number(params.movieId);
  const movieId = paramsMovieId % 2 === 0 ? 2 : 1;

  const filteredSchedule = data.schedule.filter(
    (item) => item.movieId === movieId
  );

  const handleTimingClick = (
    buttonIndex: number,
    timing: string,
    theatre: string,
    movieClass: string
  ) => {
    setSelectedButtonIndex(buttonIndex);

    dispatch(setSelectedTheatre(theatre));
    dispatch(setSelectedClass(movieClass));
    dispatch(setSelectedTiming(timing));

    console.log(
      `MovieId: ${selectedMovieId}, Theater: ${selectedTheatre}, Class: ${movieClass}, Timing: ${timing}`
    );
  };

  const isTimeBeforeCurrentTime = (time: string) => {
    const currentTime = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    currentTime.setHours(hours, minutes, 0, 0);
    return currentTime < new Date();
  };

  useEffect(() => {
    const storedMovieId = localStorage.getItem("selectedMovieId");
    const storedTheatre = localStorage.getItem("selectedTheatre");
    const storedClass = localStorage.getItem("selectedClass");
    const storedTiming = localStorage.getItem("selectedTiming");

    dispatch(setSelectedMovieId(storedMovieId || ""));
    dispatch(setSelectedTheatre(storedTheatre || ""));
    dispatch(setSelectedClass(storedClass || ""));
    dispatch(setSelectedTiming(storedTiming || ""));

    let foundButtonIndex = null;

    filteredSchedule.some((item, index) => {
      const venue = item.venue.find((v) => v.theatre === storedTheatre);
      if (venue) {
        const movieClass = venue.class.find((c) => c.name === storedClass);
        if (movieClass) {
          const timingIndex = movieClass.timings.indexOf(storedTiming || "");
          if (timingIndex !== -1) {
            foundButtonIndex = timingIndex;
            return true;
          }
        }
      }
      return false;
    });

    setSelectedButtonIndex(foundButtonIndex);
  }, [dispatch, filteredSchedule]);

  return (
    <>
        {/* <Swiper
        height={100}
        spaceBetween={10}
          slidesPerView={5}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
        >
          {slides}
        </Swiper> */}
        <Box display="flex" justifyContent="center" margin="30px 0" maxWidth="800px">
    <Button
      size="small"
      onClick={handleBack}
      disabled={maxSteps <= maxSlidesPerView || activeStep === 0}
      sx={{ mr: 1 }}
    >
      {theme.direction === 'rtl' ? (
        <KeyboardArrowRight />
      ) : (
        <KeyboardArrowLeft />
      )}
    </Button>
    <Swiper
      navigation={{
        nextEl: '.custom-swiper-button-next',
        prevEl: '.custom-swiper-button-prev',
      }}
      slidesPerView={maxSlidesPerView}
      onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
    >
      {slides}
    </Swiper>
    <Button
      size="small"
      onClick={handleNext}
      disabled={maxSteps <= maxSlidesPerView || activeStep === maxSteps - maxSlidesPerView}
    >
      {theme.direction === 'rtl' ? (
        <KeyboardArrowLeft />
      ) : (
        <KeyboardArrowRight />
      )}
    </Button>
  </Box>
      <Box>
        {filteredSchedule.map((item, index) => (
          <Box key={index}>
            {item.venue.map((venue) => (
              <Box key={venue.theatre}>
                <Box display="flex">
                  <Image src={star} alt="Star" />
                  <Typography
                    variant="h6"
                    sx={{ margin: "0 16px" }}
                    fontWeight="600"
                    textTransform="capitalize"
                  >
                    {venue.theatre}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize", margin: "20px 0" }}
                >
                  JL. MH. TAMHRIN NO.1
                </Typography>
                {venue.class.map((movieClass) => (
                  <Box key={movieClass.name}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textTransform: "capitalize" }}
                      fontWeight="600"
                    >
                      {movieClass.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textTransform: "capitalize" }}
                      fontWeight="600"
                      marginRight="50px"
                    >
                      &#8377;{movieClass.price}.00
                    </Typography>
                    </Box>
                    <Grid
                      container
                      spacing={3}
                      sx={{
                        width: { xs: "100%", sm: "50%" },
                        margin: "16px 0",
                        "& .MuiGrid-item": {
                          padding: "10px 0",
                        },
                      }}
                    >
                      {movieClass.timings.map((timing, timingIndex) => (
                        <Grid item xs={3} key={timingIndex}>
                          <Button
                            variant="contained"
                            sx={{
                              fontWeight: "600",
                              borderRadius: "8px",
                              whiteSpace: "nowrap",
                              backgroundColor:
                                selectedButtonIndex === timingIndex &&
                                venue.theatre === selectedTheatre &&
                                movieClass.name === selectedClass
                                  ? "#1A2C50"
                                  : "white",
                              color:
                                selectedButtonIndex === timingIndex &&
                                venue.theatre === selectedTheatre &&
                                movieClass.name === selectedClass
                                  ? "white"
                                  : "#1A2C50",
                              border:
                                selectedButtonIndex === timingIndex &&
                                venue.theatre === selectedTheatre &&
                                movieClass.name === selectedClass
                                  ? "none"
                                  : "1px solid #1A2C50",
                            }}
                            onClick={() =>
                              handleTimingClick(
                                timingIndex,
                                timing,
                                venue.theatre,
                                movieClass.name
                              )
                            }
                            disabled={isTimeBeforeCurrentTime(timing)}
                          >
                            {timing}
                          </Button>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Timings;
