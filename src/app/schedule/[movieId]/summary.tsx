"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Typography, Box, Container, Grid, Card, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Summary = () => {
  const selectedTheatre = useSelector(
    (state: RootState) => state.ticket.selectedTheatre
  );
  const selectedClass = useSelector(
    (state: RootState) => state.ticket.selectedClass
  );
  const selectedTiming = useSelector(
    (state: RootState) => state.ticket.selectedTiming
  );

  const router = useRouter();

  const bookSeatHandler = () => {
    console.log("first");
    router.push(`/seats`);
  };

  const showCard = !!selectedTiming;

  return (
    <Box className={`card-fade-in ${showCard ? "show" : ""}`}>
      {selectedTiming ? (
        <Card
          sx={{
            margin: "40px 0",
            border: "1px solid #5A637A",
            padding: "16px",
          }}
        >
          <Typography variant="h5" fontWeight="700" margin="16px 0">
            {selectedTheatre}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            margin="16px 0"
          >
            Kamis, 16 Desember 2021
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            margin="16px 0"
          >
            <Typography variant="h5" fontWeight="500">
              {selectedClass}
            </Typography>
            <Typography variant="h5" fontWeight="500">
              {selectedTiming}
            </Typography>
          </Box>
          <Typography variant="body2" margin="16px 0">
            * Pemilihan kursi dapat dilakukan setelah ini
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1A2C50",
              color: "#FFBE00",
              width: "100%",
              padding: "12px",
              fontSize: "24px",
            }}
            onClick={bookSeatHandler}
          >
            Book Seats
          </Button>
        </Card>
      ) : null}
    </Box>
  );
};

export default Summary;
