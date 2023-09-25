"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  selectSeat,
  deselectSeat,
  setSelectedSeats,
} from "@/redux/features/ticket.slice";
import { Typography, Box, Container, Grid, Card, Button } from "@mui/material";
import data from "../../../public/json/data.json";
import Footer from "../components/footer";
import Header from "../components/header";
import { useRouter } from "next/navigation";

interface SelectedSeats {
  [key: string]: boolean;
}

const Seats = () => {
  const bookedSeats = [
    "B2",
    "B3",
    "B4",
    "A7",
    "A8",
    "C14",
    "C15",
    "C16",
    "D14",
    "D15",
    "D16",
    "E17",
    "E15",
    "E16",
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  const selectedSeats = useSelector(
    (state: RootState) => state.ticket.selectedSeats
  );

  const isSeatSelected = (seat: string) => selectedSeats.includes(seat);

  const handleSeatClick = (seat: string) => {
    if (!bookedSeats.includes(seat)) {
      if (isSeatSelected(seat)) {
        dispatch(deselectSeat(seat));
      } else {
        if (selectedSeats.length === 10) {
          return alert("Maximum 10 seats can be selected at a time");
        } else {
          dispatch(selectSeat(seat));
        }
      }
    }
  };

  const selectedMovieId = useSelector(
    (state: RootState) => state.ticket.selectedMovieId
  );

  const selectedTheatre = useSelector(
    (state: RootState) => state.ticket.selectedTheatre
  );

  const selectedClass = useSelector(
    (state: RootState) => state.ticket.selectedClass
  );

  const selectedSchedule = data.schedule.find(
    (schedule) => schedule.movieId === Number(selectedMovieId)
  );

  const classInfo = selectedSchedule?.venue
    .find((venue) => venue.theatre === selectedTheatre)
    ?.class.find((movieClass) => movieClass.name === selectedClass);

  const price = classInfo?.price || 0;

  const checkoutHandler = () => {
    router.push(`/checkout`);
  };

  useEffect(() => {
    const storedSeats = JSON.parse(
      localStorage.getItem("selectedSeats") || "[]"
    );

    dispatch(setSelectedSeats(storedSeats));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Box sx={{ margin: { lg: "40px 60px", md: "40px", xs: "20px" } }}>
        <Typography variant="h5" fontWeight="600">
          Select seat
        </Typography>
        <Typography variant="body2" color="text.secondary" marginTop="8px">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </Box>
      <Container>
        <Box
          display="flex"
          margin="50px 0"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box
            sx={{
              backgroundColor: "#1A2C50",
              width: "16px",
              height: "16px",
              marginRight: "8px",
            }}
          ></Box>
          <Typography variant="body2" color="text.secondary">
            Booked
          </Typography>
          <Box
            sx={{
              backgroundColor: "white",
              width: "16px",
              height: "16px",
              marginLeft: "16px",
              marginRight: "8px",
            }}
          ></Box>
          <Typography variant="body2" color="text.secondary">
            Available
          </Typography>
          <Box
            sx={{
              backgroundColor: "#118EEA",
              width: "16px",
              height: "16px",
              marginLeft: "16px",
              marginRight: "8px",
            }}
          ></Box>
          <Typography variant="body2" color="text.secondary">
            Selected
          </Typography>
        </Box>
        <Box style={{ overflowX: "auto", marginBottom: "20px", width: "100%" }}>
  <div
    style={{
      whiteSpace: "nowrap",
      overflowX: "auto",
      // height: "100px", // Adjust the height as needed
      display: "flex",
      alignItems: "center"
    }}
  >
    {data.seats.map((seat, index) => (
      <React.Fragment key={index}>
        {(index - 10) % 20 === 0 && index !== 0 && (
          <div
            style={{
              width: "10px", // Adjust the gap width as needed
              minWidth: "10px",
            }}
          />
        )}
        <Card
          style={{
            borderRadius: "6px",
            width: "40px", // Adjust the card width as needed
            aspectRatio: "1",
            backgroundColor: isSeatSelected(seat)
              ? "#118EEA"
              : bookedSeats.includes(seat)
              ? "#1A2C50"
              : "white",
            color: isSeatSelected(seat)
              ? "white"
              : bookedSeats.includes(seat)
              ? "white"
              : "#1A2C50",
            cursor: "pointer",
            transition: "background-color 0.09s ease",
            marginRight: "4px", // Adjust the gap between cards as needed
          }}
          onClick={() => handleSeatClick(seat)}
        >
          {seat}
        </Card>
      </React.Fragment>
    ))}
  </div>
</Box>


      </Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#118EEA",
          color: "white",
          marginTop: "64px",
          padding: "16px 0",
          fontSize: "20px",
          fontWeight: "700",
        }}
      >
        Screen this side
      </Box>
      <Container>
        <Grid container spacing={2} sx={{ margin: "50px 0" }}>
          <Grid xs={6} md={3} sx={{ marginTop: "20px" }}>
            <Typography variant="h6" color="text.secondary">
              Total
            </Typography>
            <Typography variant="h5" fontWeight="700">
              &#8377;{price * selectedSeats.length}
            </Typography>
          </Grid>
          <Grid xs={6} md={3} sx={{ marginTop: "20px" }}>
            <Typography variant="h6" color="text.secondary">
              Seat
            </Typography>
            <Typography variant="h5" fontWeight="700">
              {selectedSeats.join(", ")}
            </Typography>
          </Grid>
          <Grid xs={12} md={6} sx={{ marginTop: "20px" }}>
            <Box display="flex" justifyContent="center">
              <Button
                variant="outlined"
                sx={{
                  color: "#5A637A",
                  border: "1px solid #5A637A",
                  fontWeight: "600",
                  marginRight: "16px",
                  width: "200px",
                }}
              >
                Change Date
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1A2C50",
                  color: "#FFBE00",
                  width: "216px",
                }}
                onClick={checkoutHandler}
              >
                Confirm
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Seats;
