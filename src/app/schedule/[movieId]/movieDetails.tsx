"use client"

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import residentEvil from "../../../../public/assets/Resident Evil_ Welcome to Raccoon City.png";
import { useRouter ,useParams } from "next/navigation";
import data from "../../../../public/json/data.json";

const MovieDetails = () => {

  const params = useParams();
  console.log("firsd",params.movieId);

  const selectedMovie = data.movies.find((movie) => movie.id === Number(params.movieId));

  console.log("selectedMovie", selectedMovie);

  return (
    <>
      <Card sx={{ width: 400, height: 400, overflow: "hidden" }}>
        <Image
          src={selectedMovie?.imageUrl}
          alt="Resident Evil"
          width={400}
          height={600}
          layout="responsive"
        />
      </Card>
      <Box sx={{ margin: "16px 0" }}>
        <Typography variant="h5" sx={{ margin: "16px 0" }}>
          {selectedMovie?.title}
        </Typography>
        <Grid container>
          <Grid xs={6} md={6} margin="5px 0">
            <Typography variant="body1">
              Genre
            </Typography>
          </Grid>
          <Grid xs={6} md={6} margin="5px 0">
            <Typography variant="body1" color="text.secondary">
              {selectedMovie?.genre.join(", ")}
            </Typography>
          </Grid>
          <Grid xs={6} md={6} margin="5px 0">
            <Typography variant="body1">
              Duration
            </Typography>
          </Grid>
          <Grid xs={6} md={6} margin="5px 0">
            <Typography variant="body1" color="text.secondary">
              2 hours 28 minutes
            </Typography>
          </Grid>
          <Grid xs={6} md={6} margin="5px 0">
            <Typography variant="body1">
              Director
            </Typography>
          </Grid>
          <Grid xs={6} md={6} margin="5px 0">
            <Typography variant="body1" color="text.secondary">
              Jon Watts
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MovieDetails;
