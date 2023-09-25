"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Typography, Box, Container, Grid, Card, Button } from "@mui/material";
import Image from "next/image";
import back from "../../../public/assets/Vector 7.png";
import Header from "../components/header";
import Footer from "../components/footer";
import data from "../../../public/json/data.json";
import { useRouter } from "next/navigation";
import {
  setSelectedClass,
  setSelectedMovieId,
  setSelectedTheatre,
  setSelectedTiming,
  setSelectedSeats,
} from "@/redux/features/ticket.slice";
import WestIcon from "@mui/icons-material/West";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const selectedMovieId = useSelector(
    (state: RootState) => state.ticket.selectedMovieId
  );
  const selectedTheatre = useSelector(
    (state: RootState) => state.ticket.selectedTheatre
  );
  const selectedClass = useSelector(
    (state: RootState) => state.ticket.selectedClass
  );
  const selectedTiming = useSelector(
    (state: RootState) => state.ticket.selectedTiming
  );
  const selectedSeats = useSelector(
    (state: RootState) => state.ticket.selectedSeats
  );

  const selectedMovie = data.movies.find(
    (movie) => movie.id === Number(selectedMovieId)
  );
  const selectedSchedule = data.schedule.find(
    (schedule) => schedule.movieId === Number(selectedMovieId)
  );

  const classInfo = selectedSchedule?.venue
    .find((venue) => venue.theatre === selectedTheatre)
    ?.class.find((movieClass) => movieClass.name === selectedClass);

  const price = classInfo?.price || 0;
  const promoVoucher = 20;

  const bookingHandler = () => {
    localStorage.removeItem("selectedMovieId");
    localStorage.removeItem("selectedTheatre");
    localStorage.removeItem("seFlectedClass");
    localStorage.removeItem("selectedTiming");
    localStorage.removeItem("selectedSeats");

    router.push("/success");
  };

  const returnHandler = () => {
    router.push("/seats");
  }

  console.log(
    selectedMovieId,
    selectedTheatre,
    selectedClass,
    selectedTiming,
    selectedSeats
  );

  useEffect(() => {
    const storedMovieId = localStorage.getItem("selectedMovieId");
    const storedTheatre = localStorage.getItem("selectedTheatre");
    const storedClass = localStorage.getItem("selectedClass");
    const storedTiming = localStorage.getItem("selectedTiming");
    const storedSeats = JSON.parse(
      localStorage.getItem("selectedSeats") || "[]"
    );

    dispatch(setSelectedMovieId(storedMovieId || ""));
    dispatch(setSelectedTheatre(storedTheatre || ""));
    dispatch(setSelectedClass(storedClass || ""));
    dispatch(setSelectedTiming(storedTiming || ""));
    dispatch(setSelectedSeats(storedSeats));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container sx={{ height: "100%" }}>
        <Box>
          <Typography
            variant="h6"
            fontWeight="700"
            margin="36px 0"
            // width="100vw"
          >
            Confirm Booking
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={5}>
            <Box width="80%" margin="30px">
              <Typography variant="subtitle2" fontWeight="600">
                Detail Jadwal
              </Typography>
              <Box margin="20px 0">
                <Typography variant="body2" color="text.secondary">
                  Film Name
                </Typography>
                <Typography variant="subtitle2" fontWeight="600">
                  {selectedMovie?.title}
                </Typography>
              </Box>
              <hr />
              <Box margin="20px 0">
                <Typography variant="body2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="subtitle2" fontWeight="600">
                  Wednesday, 11 September 2023
                </Typography>
              </Box>
              <hr />
              <Box display="flex" margin="20px 0">
                <Box marginRight="40px">
                  <Typography variant="body2" color="text.secondary">
                    Seat
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {selectedClass}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Time
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="600">
                    {selectedTiming}
                  </Typography>
                </Box>
              </Box>
              <hr />
              <Box margin="20px 0">
                <Typography variant="body2" color="text.secondary">
                  Ticket ({selectedSeats.length})
                </Typography>
                <Typography variant="subtitle2" fontWeight="600">
                  {selectedSeats.join(", ")}
                </Typography>
              </Box>
              <hr />
                <Button
                  variant="text"
                  startIcon={<WestIcon />}
                  sx={{
                    color: "#5A637A",
                    textTransform: "lowercase",
                    fontSize: "",
                  }}
                  onClick={returnHandler}
                >
                  Return
                </Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} md={5}>
            <Card
              sx={{
                margin: "30px",
                padding: "20px",
                border: "1px solid #C4C4C4",
              }}
            >
              <Typography variant="h5">Confirm Order</Typography>
              <Box margin="20px 0">
                <Typography variant="subtitle2" fontWeight="600">
                  Details
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle2" color="text.secondary">
                    Regular seat
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    &#8377;{price} * {selectedSeats.length}
                  </Typography>
                </Box>
              </Box>
              <hr />
              <Box margin="20px 0">
                <Typography variant="subtitle2" fontWeight="600">
                  Promo & voucher
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle2" color="text.secondary">
                    Promo Tix Id
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    - &#8377;{promoVoucher}
                  </Typography>
                </Box>
              </Box>
              <hr />
              <Box
                display="flex"
                justifyContent="space-between"
                margin="20px 0"
              >
                <Typography variant="subtitle2" fontWeight="600">
                  Total
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  &#8377;{price * selectedSeats.length - promoVoucher}
                </Typography>
              </Box>
              <hr />
              <Box
                display="flex"
                justifyContent="space-between"
                margin="20px 0"
              >
                <Typography variant="subtitle2" fontWeight="600">
                  Payment Mode
                </Typography>
                <Typography variant="subtitle2" color="text.primary">
                  Debit card
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1A2C50",
                  color: "#FFBE00",
                  width: "100%",
                  margin: "20px 0",
                }}
                onClick={bookingHandler}
              >
                Book Ticket
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
